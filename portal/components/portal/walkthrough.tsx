import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Directives } from "mdast-util-directive";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { readEntry } from "@/lib/content";
import type { ToolSlug } from "@/lib/contacts";
import { AccessContact } from "@/components/portal/access-contact";
import { CopyButton } from "@/components/portal/copy-button";
import { PageHeader } from "@/components/portal/page-header";
import { EnterprisePageToc } from "@/components/templates/enterprise/page-toc";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Disclosure, WalkthroughSteps, type WalkthroughBlock } from "@/components/portal/walkthrough-steps";
import { Code, CodeBlock } from "@/components/ui/code";
import { Frame } from "@/components/ui/frame";
import { Kbd } from "@/components/ui/kbd";
import { Link } from "@/components/ui/link";
import { Prose } from "@/components/ui/prose";
import { Stack } from "@/components/ui/stack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Step-by-step tutorial pages (`content/pages/walkthrough*.mdx`).
 *
 * The MDX body is markdown plus a few directives (remark-directive syntax):
 *
 *   ## Title                         a `::step` line directly under an H2 starts
 *   ::step{id="x" phase="" tool=""}  a numbered section; phase and tool are optional
 *
 *   :::note{title="..."}             callouts (info / success / warning); a
 *   :::check / :::watch              missing title falls back to the default
 *
 *   :::details{title="Stuck?"}      closed-by-default extra detail inside a step
 *
 *   :::::tabs                        tab group; nest `::::tab{value label}`
 *   ::::tab{value="a" label="A"}     inside it (outer fences need more colons)
 *
 *   ```prompt                        a copyable prompt block
 *   ::screenshot{hint="..."}         placeholder until a real screenshot exists
 *   ::access{tool="clara"}           "Stuck? Contact ..." line
 *   :kbd[Enter]                      keyboard key
 *   :file[name.md]{href="/x.md"}     download link
 *
 * Plain fenced code (no language) renders as a CodeBlock.
 */

interface WalkthroughFrontmatter {
  title: string;
  eyebrow?: string;
  lede?: string;
}

interface Section {
  id: string;
  title: string;
  phase?: string;
  tool?: string;
  open?: boolean;
  body: string;
}

function parseBody(body: string): { intro: string; sections: Section[] } {
  const tree = unified().use(remarkParse).use(remarkDirective).parse(body) as Root;
  const nodes = tree.children;
  const starts: { index: number; id: string; phase?: string; tool?: string; open?: boolean }[] = [];

  nodes.forEach((node, i) => {
    const next = nodes[i + 1];
    if (
      node.type === "heading" &&
      node.depth === 2 &&
      next?.type === "leafDirective" &&
      next.name === "step"
    ) {
      starts.push({
        index: i,
        id: next.attributes?.id ?? "",
        phase: next.attributes?.phase ?? undefined,
        tool: next.attributes?.tool ?? undefined,
        open: next.attributes?.open === "true",
      });
    }
  });

  const offset = (i: number, edge: "start" | "end") =>
    nodes[i].position![edge].offset!;

  const intro = body.slice(0, starts.length ? offset(starts[0].index, "start") : undefined);
  const sections = starts.map((s, n) => {
    const heading = nodes[s.index];
    const directive = nodes[s.index + 1];
    const end = starts[n + 1] ? offset(starts[n + 1].index, "start") : body.length;
    return {
      id: s.id,
      phase: s.phase,
      tool: s.tool,
      open: s.open,
      title: body.slice(offset(s.index, "start"), heading.position!.end.offset!).replace(/^#+\s*/, ""),
      body: body.slice(directive.position!.end.offset!, end),
    };
  });
  return { intro, sections };
}

/** Maps directives onto custom element names that `components` below render. */
function remarkWalkthrough() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type !== "containerDirective" &&
        node.type !== "leafDirective" &&
        node.type !== "textDirective"
      ) {
        return;
      }
      const d = node as Directives;
      const attrs = d.attributes ?? {};
      const data = (d.data ??= {});
      switch (d.name) {
        case "note":
        case "check":
        case "watch":
          data.hName = "callout";
          data.hProperties = { kind: d.name, title: attrs.title ?? undefined };
          break;
        case "details":
          data.hName = "disclosure";
          data.hProperties = { title: attrs.title ?? "Learn more" };
          break;
        case "tabs":
          data.hName = "tabs";
          break;
        case "tab":
          data.hName = "tab";
          data.hProperties = { value: attrs.value, label: attrs.label };
          break;
        case "screenshot":
          data.hName = "screenshot";
          data.hProperties = { hint: attrs.hint };
          break;
        case "access":
          data.hName = "access";
          data.hProperties = { tool: attrs.tool };
          break;
        case "kbd":
          data.hName = "kbd";
          break;
        case "file":
          data.hName = "a";
          data.hProperties = { href: attrs.href, download: true };
          break;
        default:
          throw new Error(`Unknown walkthrough directive "${d.name}"`);
      }
    });
  };
}

function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="relative mt-2 mb-4">
      <CodeBlock className="mb-0 whitespace-pre-wrap pr-24">{prompt}</CodeBlock>
      <div className="absolute top-2 right-2">
        <CopyButton text={prompt} label="Copy" />
      </div>
    </div>
  );
}

const CALLOUTS = {
  check: { variant: "success", Icon: CheckCircle2, title: "You should see" },
  watch: { variant: "warning", Icon: TriangleAlert, title: "If it does not look right" },
  note: { variant: "info", Icon: Info, title: "" },
} as const;

// Directive bodies parse as paragraphs; callouts want bare inline text.
function unwrapParagraphs(children: ReactNode) {
  return Children.toArray(children).map((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === "p"
      ? child.props.children
      : child,
  );
}

function Callout({
  kind,
  title,
  children,
}: {
  kind: keyof typeof CALLOUTS;
  title?: string;
  children?: ReactNode;
}) {
  const { variant, Icon, title: defaultTitle } = CALLOUTS[kind];
  // The expected result is a quiet line, not a box, so it does not compete with the steps.
  if (kind === "check") {
    return (
      <div role="note" className="my-4 flex gap-3 border-l-2 border-success py-1 pl-4">
        <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-success" />
        <div className="text-base leading-7 [&_p]:mb-0">
          <span className="font-semibold">{title ?? defaultTitle}: </span>
          {unwrapParagraphs(children)}
        </div>
      </div>
    );
  }
  return (
    <Alert variant={variant} role="note" className="mb-4">
      <Icon aria-hidden="true" />
      <AlertTitle>{title ?? defaultTitle}</AlertTitle>
      <AlertDescription>{unwrapParagraphs(children)}</AlertDescription>
    </Alert>
  );
}

interface TabProps {
  value: string;
  label: string;
  children?: ReactNode;
}

function WalkthroughTabs({ children }: { children?: ReactNode }) {
  const tabs = Children.toArray(children)
    .filter((c): c is ReactElement<TabProps> => isValidElement(c))
    .map((c) => c.props);
  return (
    <Tabs defaultValue={tabs[0]?.value}>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value}>
          <Prose>{t.children}</Prose>
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Screenshots are not captured yet, so `::screenshot{hint}` renders nothing and the hint stays in
// the MDX as a to-do. Swap for an image (with alt text) when ready.
function Screenshot(_props: { hint: string }) {
  return null;
}

function Pre({ children }: { children?: ReactNode }) {
  const code = Children.only(children) as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;
  const language = /language-(\w+)/.exec(code.props.className ?? "")?.[1];
  const text = String(code.props.children ?? "").replace(/\n$/, "");
  if (language === "prompt") return <PromptBlock prompt={text} />;
  return <CodeBlock className="mt-2 mb-0">{text}</CodeBlock>;
}

function Anchor({
  href = "",
  children,
  node: _node,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { node?: unknown }) {
  if (href.startsWith("/") && !rest.download) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

const components = {
  a: Anchor,
  pre: Pre,
  code: Code,
  callout: Callout,
  disclosure: Disclosure,
  tabs: WalkthroughTabs,
  tab: () => null,
  screenshot: Screenshot,
  access: ({ tool }: { tool: ToolSlug }) => <AccessContact tool={tool} />,
  kbd: Kbd,
} as unknown as Components;

function WalkthroughMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkWalkthrough]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

const SHARED_PHASE_SUMMARIES = {
  Research: "Find out who the work is for, and what problem you are solving.",
  Design: "Turn the requirements into a prototype.",
  Test: "Check the prototype works for real people.",
};

const PHASE_SUMMARIES: Record<"walkthrough" | "walkthrough-gitlab", Record<string, string>> = {
  walkthrough: {
    Setup: "Check the prerequisites, then load the SKYPROTECT demo project.",
    ...SHARED_PHASE_SUMMARIES,
  },
  "walkthrough-gitlab": {
    Setup: "Check the prerequisites, install your tools and CLARA, then load the SKYPROTECT demo project.",
    ...SHARED_PHASE_SUMMARIES,
  },
};

export async function WalkthroughPage({
  slug,
}: {
  slug: "walkthrough" | "walkthrough-gitlab";
}) {
  const entry = await readEntry<WalkthroughFrontmatter>("pages", slug);
  if (!entry) notFound();

  const { title, eyebrow, lede } = entry.frontmatter;
  const { intro, sections } = parseBody(entry.body);

  const blocks: WalkthroughBlock[] = sections.map((s) =>
    s.phase
      ? {
          kind: "step",
          id: s.id,
          title: s.title,
          phase: s.phase,
          tool: s.tool,
          defaultOpen: s.open,
          content: (
            <Prose>
              <WalkthroughMarkdown>{s.body}</WalkthroughMarkdown>
            </Prose>
          ),
        }
      : {
          kind: "plain",
          id: s.id,
          content: (
            <section id={s.id} className="scroll-mt-20">
              <Prose>
                <h2>{s.title}</h2>
                <WalkthroughMarkdown>{s.body}</WalkthroughMarkdown>
              </Prose>
            </section>
          ),
        },
  );

  return (
    <Frame maxWidth="xl" padding="lg">
      <div className="py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <Stack gap="8" className="min-w-0">
          <Stack gap="3">
            <PageHeader eyebrow={eyebrow ?? "Tutorial"} title={title} lede={lede} />
          </Stack>

          <Prose className="max-w-3xl">
            <WalkthroughMarkdown>{intro}</WalkthroughMarkdown>
          </Prose>

          <div className="max-w-3xl">
            <WalkthroughSteps blocks={blocks} phaseSummaries={PHASE_SUMMARIES[slug]} />
          </div>
        </Stack>
        <EnterprisePageToc
          items={sections.map((s) => ({ id: s.id, label: s.title.replace(/^(\d+)\.\s*/, "Step $1: ") }))}
        />
      </div>
    </Frame>
  );
}
