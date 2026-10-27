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
import { BookOpen, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { readEntry } from "@/lib/content";
import type { ToolSlug } from "@/lib/contacts";
import { AccessContact } from "@/components/portal/access-contact";
import { PageHeader } from "@/components/portal/page-header";
import {
  ProjectChoiceProvider,
  ProjectSwitch,
  PromptBlock,
} from "@/components/portal/project-choice";
import { EnterprisePageToc } from "@/components/templates/enterprise/page-toc";
import { PROJECT_MARKUP, remarkProject, type Project } from "@/lib/remark-project";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Disclosure, TutorialSteps, type TutorialBlock } from "@/components/portal/tutorial-steps";
import { Code, CodeBlock } from "@/components/ui/code";
import { Frame } from "@/components/ui/frame";
import { Kbd } from "@/components/ui/kbd";
import { Link } from "@/components/ui/link";
import { Prose } from "@/components/ui/prose";
import { Stack } from "@/components/ui/stack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Step-by-step tutorial pages (`content/pages/tutorial*.mdx`).
 *
 * The MDX body is markdown plus a few directives (remark-directive syntax):
 *
 *   ## Title                         a `::step` line directly under an H2 starts
 *   ::step{id="x" phase="" tool=""}  a numbered section; phase and tool are optional
 *
 *   :::note{title="..."}             callouts (info / success / warning); a
 *   :::check / :::watch              missing title falls back to the default
 *   :::example                       quiet "Example:" line pointing at a finished page
 *
 *   :::details{title="Stuck?"}      closed-by-default extra detail inside a step
 *
 *   :::::tabs                        tab group; nest `::::tab{value label}`
 *   ::::tab{value="a" label="A"}     inside it (outer fences need more colons)
 *
 *   :::demo                          demo-project content, written as if the whole tutorial uses
 *                                    the demo; plain text for demo readers, hidden otherwise
 *   :demo[text]                      the same, for a sentence inside a step
 *   ::::when{project="own"}          content for one project only (own or demo)
 *   ::projectswitch                  the "own project or demo project" choice that drives all of these
 *
 *   ```prompt                        a copyable prompt block; PROGRAMME in it becomes SKYPROTECT
 *                                    for readers on the demo project
 *   ::screenshot{hint="..."}         placeholder until a real screenshot exists; add src="/x.png"
 *                                    and alt="..." (optional caption="...") to show the image
 *   ::access{tool="clara"}           "Stuck? Contact ..." line
 *   :kbd[Enter]                      keyboard key
 *   :file[name.md]{href="/x.md"}     download link
 *
 * Plain fenced code (no language) renders as a CodeBlock.
 */

interface TutorialFrontmatter {
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
function remarkTutorial() {
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
        case "example":
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
          data.hProperties = { hint: attrs.hint, src: attrs.src, alt: attrs.alt, caption: attrs.caption };
          break;
        case "access":
          data.hName = "access";
          data.hProperties = { tool: attrs.tool };
          break;
        case "kbd":
          data.hName = "kbd";
          break;
        case "projectswitch":
          data.hName = "projectswitch";
          break;
        case "file":
          data.hName = "a";
          data.hProperties = { href: attrs.href, download: true };
          break;
        default:
          throw new Error(`Unknown tutorial directive "${d.name}"`);
      }
    });
  };
}

/**
 * Spacing for tutorial text, scoped here so the shared `Prose` stays as it is.
 * Three gaps: tight (8px) for something that belongs to the line above, normal (16px)
 * for a new thought in the same step, loose (24px, 40px for sub-section titles) for a new block.
 */
const TUTORIAL_PROSE = [
  // sub-section titles: tight gap below; every one after the first also gets a divider and a big gap above
  "[&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-lg",
  "[&_h4~h4]:mt-10 [&_h4~h4]:border-t [&_h4~h4]:border-border [&_h4~h4]:pt-6",
  // the first and last block of a step add no margin of their own, so the card padding sets the edges
  "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
  // numbered steps are single actions, so give each room; bullets are short and related
  "[&_ol]:mb-6 [&_ol]:space-y-3",
  "[&_ul]:space-y-1.5",
  // nested lists hang off their item instead of adding a block gap
  "[&_li_ol]:mt-2 [&_li_ol]:mb-0 [&_li_ul]:mt-2 [&_li_ul]:mb-0",
].join(" ");

const CALLOUTS = {
  check: { variant: "success", Icon: CheckCircle2, title: "You should see" },
  watch: { variant: "warning", Icon: TriangleAlert, title: "If it does not look right" },
  note: { variant: "info", Icon: Info, title: "" },
  example: { variant: "info", Icon: BookOpen, title: "Example" },
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
  // The expected result is a tinted panel with a small label above the text, so it reads as a
  // checkpoint at the end of the step. The finished example is a quieter chip beneath it.
  if (kind === "check") {
    return (
      <div
        role="note"
        className="mt-6 mb-3 rounded-lg border border-[oklch(62.7%_0.194_149.21_/_0.30)] bg-[oklch(72.3%_0.219_149.58_/_0.10)] px-4 py-3"
      >
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-success">
          <Icon aria-hidden="true" className="size-4 shrink-0" />
          {title ?? defaultTitle}
        </div>
        <div className="text-base leading-7 text-fg [&_p]:mb-0">{unwrapParagraphs(children)}</div>
      </div>
    );
  }
  if (kind === "example") {
    return (
      <div
        role="note"
        className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-bg-subtle px-3 py-2 text-sm text-fg-muted"
      >
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span className="font-medium">{title ?? defaultTitle}:</span>
        <span className="[&_p]:mb-0">{unwrapParagraphs(children)}</span>
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

function TutorialTabs({ children }: { children?: ReactNode }) {
  const tabs = Children.toArray(children)
    .filter((c): c is ReactElement<TabProps> => isValidElement(c))
    .map((c) => c.props);
  return (
    <Tabs defaultValue={tabs[0]?.value} className="mt-4 mb-6">
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.value} value={t.value}>
          <Prose className={TUTORIAL_PROSE}>{t.children}</Prose>
        </TabsContent>
      ))}
    </Tabs>
  );
}

// `::screenshot{caption="..."}` shows a blank captioned area until the image exists; without a
// caption or `src` it renders nothing. Then add `src`
// (a path under /public) and `alt`; the caption stays. `hint` is an optional note on what to capture.
function Screenshot({
  src,
  alt,
  caption,
  hint,
}: {
  hint?: string;
  src?: string;
  alt?: string;
  caption?: string;
}) {
  if (!src && !caption) return null;
  return (
    <figure className="my-6 w-full">
      {src ? (
        // Every capture sits in the same 16:9 frame so the steps look alike whatever the source size.
        // eslint-disable-next-line @next/next/no-img-element -- static captures from /public, sizes vary
        <img
          src={src}
          alt={alt ?? caption ?? ""}
          loading="lazy"
          className="aspect-video w-full rounded-lg border border-border bg-bg-muted object-contain"
        />
      ) : (
        <div
          role="img"
          aria-label={alt ?? caption ?? hint ?? "Screenshot to come"}
          className="aspect-video w-full rounded-lg border border-border bg-bg-muted"
        />
      )}
      {caption ? (
        <figcaption className="mt-2 text-center text-sm leading-6 text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
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
  tabs: TutorialTabs,
  tab: () => null,
  screenshot: Screenshot,
  access: ({ tool }: { tool: ToolSlug }) => <AccessContact tool={tool} />,
  kbd: Kbd,
  projectswitch: ProjectSwitch,
} as unknown as Components;

function TutorialMarkdown({ children, project }: { children: string; project: Project }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, () => remarkProject(project), remarkTutorial]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

/**
 * Markdown in the tutorial's prose style. When the text differs by project, it is rendered
 * once for each and `data-project` on the page wrapper picks which one shows; otherwise once.
 */
function ProjectProse({
  children,
  heading,
  className,
}: {
  children: string;
  heading?: string;
  className?: string;
}) {
  const render = (project: Project) => (
    <Prose className={cn(TUTORIAL_PROSE, className)}>
      {heading ? <h2>{heading}</h2> : null}
      <TutorialMarkdown project={project}>{children}</TutorialMarkdown>
    </Prose>
  );
  if (!PROJECT_MARKUP.test(children)) return render("own");
  return (
    <>
      <div className="[[data-project=demo]_&]:hidden">{render("own")}</div>
      <div className="hidden [[data-project=demo]_&]:block">{render("demo")}</div>
    </>
  );
}

const SHARED_PHASE_SUMMARIES = {
  Research: "Find out who the work is for, and what problem you are solving.",
  Design: "Turn the requirements into a prototype.",
  Test: "Check the prototype works for real people.",
};

const PHASE_SUMMARIES: Record<"tutorial" | "tutorial-gitlab", Record<string, string>> = {
  tutorial: {
    Setup: "Set up the prerequisites.",
    ...SHARED_PHASE_SUMMARIES,
  },
  "tutorial-gitlab": {
    Setup: "Check the prerequisites, install your tools and CLARA, then load the SKYPROTECT demo project.",
    ...SHARED_PHASE_SUMMARIES,
  },
};

export async function TutorialPage({
  slug,
}: {
  slug: "tutorial" | "tutorial-gitlab";
}) {
  const entry = await readEntry<TutorialFrontmatter>("pages", slug);
  if (!entry) notFound();

  const { title, eyebrow, lede } = entry.frontmatter;
  const { intro, sections } = parseBody(entry.body);

  const blocks: TutorialBlock[] = sections.map((s) =>
    s.phase
      ? {
          kind: "step",
          id: s.id,
          title: s.title,
          phase: s.phase,
          tool: s.tool,
          defaultOpen: s.open,
          content: <ProjectProse>{s.body}</ProjectProse>,
        }
      : {
          kind: "plain",
          id: s.id,
          content: (
            <section id={s.id} className="scroll-mt-20">
              <ProjectProse heading={s.title}>{s.body}</ProjectProse>
            </section>
          ),
        },
  );

  return (
    <ProjectChoiceProvider>
      <Frame maxWidth="xl" padding="lg">
        <div className="py-8 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          <Stack gap="8" className="min-w-0">
            <Stack gap="3">
              <PageHeader eyebrow={eyebrow ?? "Tutorial"} title={title} lede={lede} />
            </Stack>

            <ProjectProse className="max-w-3xl">{intro}</ProjectProse>

            <div className="max-w-3xl">
              <TutorialSteps blocks={blocks} phaseSummaries={PHASE_SUMMARIES[slug]} />
            </div>
          </Stack>
          <EnterprisePageToc
            items={sections.map((s) => ({
              id: s.id,
              label: s.title,
              group: s.phase,
            }))}
          />
        </div>
      </Frame>
    </ProjectChoiceProvider>
  );
}
