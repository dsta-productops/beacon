import { Card } from "@/components/ui/card";
import { Frame } from "@/components/ui/frame";
import { Heading } from "@/components/ui/heading";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { PageHeader } from "@/components/portal/page-header";
import { DomainTabs } from "@/components/portal/domain-tabs";
import Link from "next/link";
import { ArrowRight, Compass, PenTool, FlaskConical } from "lucide-react";

const phases = [
  {
    href: "/flywheel/research",
    icon: Compass,
    title: "Research",
    blurb:
      "Understand your users, operators and their needs. Decide which problem to solve, and what success looks like, before you start designing solutions.",
  },
  {
    href: "/flywheel/design",
    icon: PenTool,
    title: "Design",
    blurb:
      "Turn the needs you have confirmed into things you can test, such as interactive prototypes, virtual prototypes and storyboards of what a capability will do.",
  },
  {
    href: "/flywheel/measure",
    icon: FlaskConical,
    title: "Measure",
    blurb:
      "Try what you built with real users or operators, record their feedback in DASH, and use it to improve the next round of Design.",
  },
];

export const metadata = {
  title: "Flywheel · BEACON",
};

export default function FlywheelPage() {
  return (
    <Frame maxWidth="lg" padding="lg">
      <Stack gap="8" className="py-8">
        <PageHeader
          eyebrow="Foundation"
          title="The product flywheel"
          lede="Product work runs as a cycle of three phases: Research, Design and Measure. You do Research thoroughly at the start. Then you repeat Design and Measure quickly. Pick a phase to explore."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {phases.map(({ href, icon: Icon, title, blurb }) => (
            <Link key={href} href={href} className="group block">
              <Card className="h-full p-6 transition-colors hover:border-border-strong">
                <Stack gap="3">
                  <Icon className="h-6 w-6 text-accent" />
                  <Heading as="h2" size="lg">
                    {title}
                  </Heading>
                  <Text size="sm" variant="muted">
                    {blurb}
                  </Text>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent">
                    Enter phase
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Stack>
              </Card>
            </Link>
          ))}
        </div>

        <Stack gap="4" className="pt-8">
          <Stack gap="2">
            <Heading as="h2" size="2xl">
              Where the flywheel comes from
            </Heading>
            <Text variant="muted">
              The flywheel adapts the four stages of design innovation (Discover, Define, Develop and Deliver) into a tighter loop for defence programmes. Discover and Define together become Research, which is about understanding the problem. Develop becomes the repeating Design and Measure loop, which is about building and testing a solution. Deliver becomes the close-out at the end of each cycle, where the team makes its decisions and prepares the next loop.
            </Text>
          </Stack>

          <div className="grid gap-3 sm:grid-cols-4">
            {fourDs.map(({ d, name, mapsTo, blurb }) => (
              <div
                key={d}
                className="rounded-md border border-border bg-surface-subtle p-4"
              >
                <Text size="xs" variant="muted" className="uppercase tracking-wide">
                  {d}
                </Text>
                <Text size="sm" className="font-semibold mt-1">
                  {name}
                </Text>
                <Text size="xs" variant="muted" className="mt-2 uppercase tracking-wide">
                  Becomes
                </Text>
                <Text size="sm" className="mt-1">
                  {mapsTo}
                </Text>
                <Text size="sm" variant="muted" className="mt-2">
                  {blurb}
                </Text>
              </div>
            ))}
          </div>
        </Stack>

        <Stack gap="4" className="pt-8">
          <Stack gap="2">
            <Heading as="h2" size="2xl">
              What a typical cycle looks like
            </Heading>
            <Text variant="muted">
              Here is how the flywheel fits into a typical 4-month block of work, split into eight 2-week sprints. Digital programmes call this block a planning interval. Engineering programmes call it design innovation. The shape is the same for both: Research at the start, fast loops in the middle and a close-out at the end. Only the content of each part differs. Four months is typical. The real length varies by programme, and the proportions matter more than the exact numbers.
            </Text>
          </Stack>

          <DomainTabs
            digital={<CadenceCard cadence={cadences.digital} />}
            engineering={<CadenceCard cadence={cadences.engineering} />}
          />
        </Stack>

      </Stack>
    </Frame>
  );
}

function DualTrackDiagram() {
  const pis = ["PI N-1", "PI N", "PI N+1", "PI N+2"];
  const productOps = ["design W", "design X", "design Y", "design Z"];
  // Each DevSecOps PI does two things: build the previously-validated capability,
  // and run upstream tech assessment on the one currently being designed.
  const devSecOps = [
    { build: null, assess: "assess W" },
    { build: "build W", assess: "assess X" },
    { build: "build X", assess: "assess Y" },
    { build: "build Y", assess: "assess Z" },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[520px] grid-cols-[auto_repeat(4,minmax(0,1fr))] items-start gap-2 text-sm">
        <div />
        {pis.map((pi) => (
          <div
            key={pi}
            className="text-center text-xs uppercase tracking-wide text-fg-muted"
          >
            {pi}
          </div>
        ))}

        <div className="flex items-center pr-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">
          ProductOps
        </div>
        {productOps.map((cell, i) => (
          <div
            key={i}
            className="relative rounded-md border border-accent/40 bg-accent/5 px-3 py-1.5 text-center text-fg"
          >
            {cell}
            {devSecOps[i + 1]?.build ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-2 -right-1 text-base leading-none text-accent"
              >
                ↘
              </span>
            ) : null}
          </div>
        ))}

        <div className="flex items-center pr-2 text-xs font-semibold uppercase tracking-wide text-fg-muted">
          DevSecOps
        </div>
        {devSecOps.map(({ build, assess }, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="rounded-md border border-dashed border-accent/40 bg-accent/[0.03] px-3 py-1.5 text-center text-xs text-fg-muted">
              {assess}
              <span aria-hidden="true" className="ml-1 text-accent">↑</span>
            </div>
            {build ? (
              <div className="rounded-md border border-border bg-surface-subtle px-3 py-1.5 text-center text-fg">
                {build}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border/60 px-3 py-1.5 text-center text-xs text-fg-muted">
                —
              </div>
            )}
          </div>
        ))}
      </div>
      <Text size="xs" variant="muted" className="mt-3">
        <span className="text-accent">↘</span> handover at the sprint 8 close-out · <span className="text-accent">↑</span> early technical checks by engineers, run alongside the design side's current loop
      </Text>
    </div>
  );
}

const fourDs = [
  {
    d: "D1",
    name: "Discover",
    mapsTo: "Research",
    blurb:
      "Observe users in the field and in exercises, interview them, and study the surrounding environment. Find the real problem, not the one you assumed.",
  },
  {
    d: "D2",
    name: "Define",
    mapsTo: "Research",
    blurb:
      "State the problem, its scope and what success looks like. Set the hypotheses (the testable assumptions) that the rest of the loop will test.",
  },
  {
    d: "D3",
    name: "Develop",
    mapsTo: "Design ↔ Measure",
    blurb:
      "Build a prototype, put it in front of operators, learn from them and adjust. This is the fast, repeating inner loop of the flywheel.",
  },
  {
    d: "D4",
    name: "Deliver",
    mapsTo: "Close-out",
    blurb:
      "Ship the work, hand it over, or decide to stop. Write down what you learned and use it to start the next loop.",
  },
];

type CadenceRow = {
  when: string;
  what: string;
  detail: string;
};

type CadenceAside = {
  summary: string;
  paragraphs: string[];
  bullets?: string[];
  implication?: string;
};

type Cadence = {
  kind: string;
  title: string;
  subtitle: string;
  rows: CadenceRow[];
  footnote?: string;
  aside?: CadenceAside;
};

function CadenceCard({ cadence }: { cadence: Cadence }) {
  const { kind, title, subtitle, rows, footnote, aside } = cadence;
  return (
    <Card className="p-6">
      <Stack gap="4">
        <Stack gap="1">
          <Text size="xs" variant="muted" className="uppercase tracking-wide">
            {kind}
          </Text>
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text size="sm" variant="muted">
            {subtitle}
          </Text>
        </Stack>
        <div className="grid gap-3 sm:grid-cols-3">
          {rows.map(({ when, what, detail }) => (
            <div
              key={when}
              className="rounded-md border border-border bg-surface-subtle p-4"
            >
              <Text size="xs" variant="muted" className="uppercase tracking-wide">
                {when}
              </Text>
              <Text size="sm" className="font-semibold mt-1">
                {what}
              </Text>
              <Text size="sm" variant="muted" className="mt-1">
                {detail}
              </Text>
            </div>
          ))}
        </div>
        {aside ? (
          <details className="group rounded-md border border-border bg-surface-subtle p-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-accent marker:hidden flex items-center gap-1">
              <span>{aside.summary}</span>
              <span className="transition-transform group-open:rotate-90" aria-hidden="true">›</span>
            </summary>
            <Stack gap="3" className="mt-3">
              <DualTrackDiagram />
              {aside.paragraphs.map((p) => (
                <Text key={p} size="sm" variant="muted">
                  {p}
                </Text>
              ))}
              {aside.bullets ? (
                <ul className="list-disc pl-5 space-y-1">
                  {aside.bullets.map((b) => (
                    <li key={b}>
                      <Text size="sm" variant="muted">
                        {b}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : null}
              {aside.implication ? (
                <Text size="sm" className="font-medium">
                  {aside.implication}
                </Text>
              ) : null}
            </Stack>
          </details>
        ) : null}
        {footnote ? (
          <Text size="sm" variant="muted">
            {footnote}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}

const cadences: Record<"digital" | "engineering", Cadence> = {
  digital: {
    kind: "Digital programme",
    title: "Planning Interval (PI)",
    subtitle: "4 months · 8 sprints of 2 weeks",
    rows: [
      {
        when: "Sprints 1–2",
        what: "Research",
        detail:
          "Observe users in the field and in exercises, frame the problem and map the opportunities. The hypotheses to test, and access to users, are already lined up from the close-out of the previous PI.",
      },
      {
        when: "Sprints 3–7",
        what: "Rapid prototyping + user feedback",
        detail:
          "Each sprint is one tight Design and Measure loop: build a prototype, put it in front of operators, learn from them and adjust. Most of the flywheel's turning happens here.",
      },
      {
        when: "Sprint 8",
        what: "Close-out + prep for next PI",
        detail:
          "Decide whether to ship, stop or change direction. Review what went well and badly, and write it up. Set the hypotheses to test in the next PI and line up access to users for its Research.",
      },
    ],
    footnote:
      "A team starting out with no earlier PI uses part of sprint 1 for kick-off work, such as setting the hypotheses to test and arranging access to users.",
    aside: {
      summary: "How this lines up with the engineering side's PI",
      paragraphs: [
        "In this diagram, N is the current PI, N-1 is the one before it, and W, X, Y and Z are capabilities being designed or built, one after another.",
        "Every Design and Measure loop produces working code that engineers can start from. So the engineering side (DevSecOps) does not have to wait for the close-out to get involved. While the design side (ProductOps) is still designing, engineers check early whether the capability is feasible, fits with other systems, is secure, and avoids building up technical shortcuts that cost more later. Risk is reduced all the time, not only at the handover.",
        "The two PIs run side by side as a dual-track model, with the design side always one PI ahead. In PI N, the design side designs and validates capability X. At the same time, engineers build capability W, which the design side validated in PI N-1, and check X in the background. At the sprint 8 close-out, the validated X passes to engineers in PI N+1, where the early checks have already reduced the risk of building it.",
      ],
      bullets: [
        "PI N, design side: research, prototype and validate capability X, and produce working code in each loop.",
        "PI N, engineering side: build capability W (validated in PI N-1) and run early checks on X.",
        "Sprint 8 close-out: the validated X, with draft requirements, passes to the engineering side for PI N+1.",
      ],
      implication:
        "Note: what the design side hands over is working code to start building from, not static designs. The working prototypes from the Design and Measure loop become the starting point for the build PI, alongside the validated requirements.",
    },
  },
  engineering: {
    kind: "Engineering programme",
    title: "Design Innovation",
    subtitle: "4 months · 8 sprints of 2 weeks",
    rows: [
      {
        when: "Sprints 1–2",
        what: "Research",
        detail:
          "Work out the concept of use, which is how the system will be used. Study operator workflows, scenarios and current pain points. Involve units and exercises early.",
      },
      {
        when: "Sprints 3–7",
        what: "Rapid conceptualisation + operator feedback",
        detail:
          "Draw concept sketches and mock-ups, and walk through them with operators. Refine the concept of use each sprint.",
      },
      {
        when: "Sprint 8",
        what: "Concept document + draft requirements",
        detail:
          "Bring the concept of use together in one document, draft the requirements, and hand over to the acquisition and build track.",
      },
    ],
    footnote:
      "After design innovation, engineering programmes move into an acquisition and build phase. That phase is mostly procurement and process, and does not follow the flywheel, so it is not covered here.",
  },
};
