import { readEntry } from "@/lib/content";
import { Markdown } from "@/components/portal/markdown";
import { CopyButton } from "@/components/portal/copy-button";
import { CLAUDE_MD_STARTER } from "@/lib/claude-md-starter";
import { Frame } from "@/components/ui/frame";
import { Stack } from "@/components/ui/stack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { PageHeader } from "@/components/portal/page-header";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Quality Model · ProductOps Co-pilot",
};

interface PageFrontmatter {
  title: string;
  eyebrow?: string;
  lede?: string;
}

export default async function QualityModelPage() {
  const entry = await readEntry<PageFrontmatter>("pages", "quality-model");
  if (!entry) notFound();

  const { title, eyebrow, lede } = entry.frontmatter;

  // Split the MDX body around the CLAUDE.md starter callout so we can inject
  // the copyable card between the intro paragraph and the "Where to go next"
  // section without smuggling React into MDX.
  const marker = "## Where to go next";
  const [before, after] = entry.body.split(marker);

  return (
    <Frame maxWidth="lg" padding="lg">
      <Stack gap="8" className="py-8">
        <PageHeader eyebrow={eyebrow ?? "Foundation"} title={title} lede={lede} />
        <Markdown>{before}</Markdown>

        <Card className="p-5">
          <Stack gap="3">
            <div className="flex items-start justify-between gap-4">
              <Stack gap="1" className="min-w-0">
                <Text
                  size="sm"
                  variant="muted"
                  weight="medium"
                  className="uppercase tracking-wide"
                >
                  Drop into a project
                </Text>
                <Text size="sm" variant="muted">
                  Save as <code className="font-mono text-xs">CLAUDE.md</code>{" "}
                  at the repo root. Replace the placeholder patterns with the
                  real ones from the project, then have the tech lead endorse
                  the file before it&apos;s enabled.
                </Text>
              </Stack>
              <div className="shrink-0">
                <CopyButton text={CLAUDE_MD_STARTER} label="Copy CLAUDE.md" />
              </div>
            </div>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-bg-subtle p-4 font-mono text-sm text-fg">
              {CLAUDE_MD_STARTER}
            </pre>
          </Stack>
        </Card>

        {after && <Markdown>{`${marker}${after}`}</Markdown>}
      </Stack>
    </Frame>
  );
}
