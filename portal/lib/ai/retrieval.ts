import { getCorpus } from "./corpus";

/**
 * Lightweight keyword retrieval (BM25) over the portal corpus.
 *
 * Why: free LLM tiers cap tokens per minute (Groq: 8K), so we cannot send
 * the whole corpus with every request. Instead we send a short catalogue
 * plus the few chunks most relevant to the question.
 *
 * No embeddings, no extra services — everything runs in-process.
 */

export interface Chunk {
  /** Slug path, e.g. "/tools/dash" */
  path: string;
  title: string;
  text: string;
  /** Lowercased term -> frequency, including header terms */
  tf: Map<string, number>;
  len: number;
}

interface Index {
  chunks: Chunk[];
  df: Map<string, number>;
  avgLen: number;
  catalogue: string;
}

const MAX_CHUNK_CHARS = 1400;

const STOPWORDS = new Set(
  "a an and are as at be by can do does for from has have how i in is it its me my of on or our so that the their there this to us was we what when where which who why will with you your about into than then them they these those if not no yes any all".split(
    " ",
  ),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t));
}

function splitItem(item: string): Chunk[] {
  const lines = item.split("\n");
  const path = lines[0].replace(/^###\s*/, "").trim();
  const title =
    item.match(/^(?:Title|Name): (.+)$/m)?.[1]?.trim() ?? path;
  const header = `[${title}](${path})`;

  const paragraphs = item
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: Chunk[] = [];
  let buf = "";
  const flush = () => {
    if (!buf.trim()) return;
    const text = `${header}\n${buf.trim()}`;
    const tf = new Map<string, number>();
    const toks = tokenize(`${path} ${title} ${buf}`);
    for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
    chunks.push({ path, title, text, tf, len: toks.length });
    buf = "";
  };
  for (const raw of paragraphs) {
    // The first paragraph starts with the "### /path" line; drop it.
    const p = raw.startsWith("### ") ? raw.split("\n").slice(1).join("\n") : raw;
    if (!p.trim()) continue;
    // Hard-split paragraphs that are themselves too long.
    for (let i = 0; i < p.length; i += MAX_CHUNK_CHARS) {
      const piece = p.slice(i, i + MAX_CHUNK_CHARS);
      if (buf.length + piece.length > MAX_CHUNK_CHARS) flush();
      buf += (buf ? "\n\n" : "") + piece;
    }
  }
  flush();
  return chunks;
}

async function buildIndex(): Promise<Index> {
  const corpus = await getCorpus();
  const items = corpus
    .split(/^(?=### )/m)
    // Remove "## Section" / "# Title" lines that trail the previous item.
    .map((s) => s.replace(/^#{1,2} .*$/gm, "").trim())
    .filter((s) => s.startsWith("### "));

  const chunks = items.flatMap(splitItem);

  const df = new Map<string, number>();
  for (const c of chunks)
    for (const t of c.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);

  const seen = new Set<string>();
  const catalogue = chunks
    .filter((c) => (seen.has(c.path) ? false : (seen.add(c.path), true)))
    .map((c) => `- [${c.title}](${c.path})`)
    .join("\n");

  return {
    chunks,
    df,
    avgLen: chunks.reduce((n, c) => n + c.len, 0) / Math.max(chunks.length, 1),
    catalogue,
  };
}

let indexPromise: Promise<Index> | undefined;
function getIndex(): Promise<Index> {
  // Rebuild every call in dev so content edits show up immediately.
  if (process.env.NODE_ENV !== "production") return buildIndex();
  return (indexPromise ??= buildIndex());
}

export async function getCatalogue(): Promise<string> {
  return (await getIndex()).catalogue;
}

/** Top-scoring chunks for a query, capped at `maxChars` total. */
export async function retrieve(
  query: string,
  maxChars = 10_000,
): Promise<Chunk[]> {
  const { chunks, df, avgLen } = await getIndex();
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return [];

  const k1 = 1.2;
  const b = 0.75;
  const N = chunks.length;

  const scored = chunks
    .map((c) => {
      let score = 0;
      for (const t of terms) {
        const f = c.tf.get(t);
        if (!f) continue;
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * c.len) / avgLen));
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b2) => b2.score - a.score);

  const out: Chunk[] = [];
  let used = 0;
  for (const { c } of scored) {
    if (used + c.text.length > maxChars) continue;
    out.push(c);
    used += c.text.length;
    if (out.length >= 8) break;
  }
  return out;
}
