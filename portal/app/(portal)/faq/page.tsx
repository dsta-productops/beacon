import { readEntry } from "@/lib/content";
import { Markdown } from "@/components/portal/markdown";
import { FaqList, type FaqGroup } from "@/components/portal/faq-list";
import { Frame } from "@/components/ui/frame";
import { Stack } from "@/components/ui/stack";
import { PageHeader } from "@/components/portal/page-header";
import { notFound } from "next/navigation";

export const metadata = {
  title: "FAQ · BEACON",
};

interface PageFrontmatter {
  title: string;
  eyebrow?: string;
  lede?: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** `## Group` starts a group and `### Question {#id}` a question; the text under it is the answer. */
function parseFaq(body: string): FaqGroup[] {
  const groups: FaqGroup[] = [];
  let answer: string[] = [];
  let current: { id: string; question: string } | null = null;

  const flush = () => {
    if (current && groups.length) {
      groups[groups.length - 1].items.push({
        ...current,
        answer: <Markdown>{answer.join("\n").trim()}</Markdown>,
      });
    }
    current = null;
    answer = [];
  };

  for (const line of body.split("\n")) {
    const group = line.match(/^## (.+)$/);
    const question = line.match(/^### (.+?)(?:\s*\{#([\w-]+)\})?$/);
    if (group) {
      flush();
      groups.push({ id: slugify(group[1]), title: group[1], items: [] });
    } else if (question) {
      flush();
      current = { id: question[2] ?? slugify(question[1]), question: question[1] };
    } else if (current) {
      answer.push(line);
    }
  }
  flush();
  return groups;
}

export default async function FaqPage() {
  const entry = await readEntry<PageFrontmatter>("pages", "faq");
  if (!entry) notFound();

  const { title, eyebrow, lede } = entry.frontmatter;

  return (
    <Frame maxWidth="lg" padding="lg">
      <Stack gap="8" className="py-8">
        <PageHeader eyebrow={eyebrow ?? "Help"} title={title} lede={lede} />
        <FaqList groups={parseFaq(entry.body)} />
      </Stack>
    </Frame>
  );
}
