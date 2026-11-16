import { llmModel, isLLMConfigured } from "@/lib/ai/provider";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 2000;
// Reasoning tokens count against this budget too, so keep headroom: at 600,
// longer answers were cut off mid-sentence (finishReason "length").
const MAX_OUTPUT_TOKENS = 1500;
// Only the most recent turns go to the model: keeps requests inside
// free-tier tokens-per-minute limits.
const HISTORY_MESSAGES = 6;
const RATE_LIMIT = 20; // requests per window per IP
const RATE_WINDOW_MS = 60_000;

// In-memory limiter: fine for a single instance; use a shared store if scaled out.
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function json(body: unknown, status: number, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function messageText(m: UIMessage): string {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ");
}

function messageLength(m: UIMessage): number {
  return m.parts.reduce(
    (n, p) => n + (p.type === "text" ? p.text.length : 0),
    0,
  );
}

export async function POST(req: Request) {
  if (!isLLMConfigured()) {
    return json(
      {
        error:
          "LLM is not configured. Set LLM_API_KEY (and optionally LLM_BASE_URL / LLM_MODEL) in .env.local.",
      },
      503,
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) {
    return json({ error: "Too many requests. Please wait a moment." }, 429, {
      "retry-after": "60",
    });
  }

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.some((m) => !m || !Array.isArray(m.parts))
  ) {
    return json({ error: "Invalid messages." }, 400);
  }
  if (messages.length > MAX_MESSAGES) {
    return json({ error: "Conversation too long. Start a new one." }, 400);
  }
  // Only cap user input: assistant replies in the history can legitimately
  // exceed this (up to MAX_OUTPUT_TOKENS) and would otherwise break follow-ups.
  if (
    messages.some(
      (m) => m.role === "user" && messageLength(m) > MAX_CHARS_PER_MESSAGE,
    )
  ) {
    return json({ error: "Message too long." }, 400);
  }

  const recent = messages.slice(-HISTORY_MESSAGES);
  // Retrieval query: the latest question plus the one before it, so
  // follow-ups like "and the second one?" still find the right passages.
  const userTexts = recent.filter((m) => m.role === "user").map(messageText);
  const query = userTexts.slice(-2).join(" ");

  const result = streamText({
    model: llmModel,
    system: await buildSystemPrompt(query),
    messages: await convertToModelMessages(recent),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    // Reasoning models (e.g. gpt-oss) spend output tokens thinking. Set
    // LLM_REASONING_EFFORT=low to keep answers fast and cheap; leave unset
    // for models that don't support it.
    ...(process.env.LLM_REASONING_EFFORT && {
      providerOptions: {
        openaiCompatible: {
          reasoningEffort: process.env.LLM_REASONING_EFFORT,
        },
      },
    }),
  });

  return result.toUIMessageStreamResponse({ sendReasoning: false });
}
