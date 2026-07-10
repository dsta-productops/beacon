import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Stack } from "@/components/ui/stack";
import { Frame } from "@/components/ui/frame";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  FlaskConical,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

const phaseShortcuts = [
  {
    href: "/flywheel/research",
    icon: Compass,
    name: "Research",
    blurb: "Define the right problem.",
  },
  {
    href: "/flywheel/design",
    icon: PenTool,
    name: "Design",
    blurb: "Build a testable artefact.",
  },
  {
    href: "/flywheel/test",
    icon: FlaskConical,
    name: "Test",
    blurb: "Validate against real use.",
  },
];

interface Bundle {
  href: string;
  icon: typeof Compass;
  title: string;
  blurb: string;
}

const bundles: Bundle[] = [
  {
    href: "/pipeline",
    icon: Compass,
    title: "Pipeline",
    blurb:
      "What ProductOps is, how it sits alongside DevSecOps and MLOps, and the design principles that shape every iteration.",
  },
  {
    href: "/product-roles",
    icon: Users,
    title: "Product Roles",
    blurb:
      "The tripartite product structure — Ops PM, UX PM, Tech PM. Complementary ownership of mission outcomes, user experience, and technical delivery.",
  },
  {
    href: "/quality-model",
    icon: ShieldCheck,
    title: "Quality Model",
    blurb:
      "How functional code meets the same quality bar as NFR code. Four layers of assurance across ProductOps and DevSecOps, plus a starter CLAUDE.md.",
  },
  {
    href: "/flywheel",
    icon: RefreshCw,
    title: "Flywheel",
    blurb:
      "The three phases — Research, Design, Test — and how the outer and inner loops connect.",
  },
  {
    href: "/tools",
    icon: Wrench,
    title: "Tools",
    blurb:
      "Find the right tool for each phase, with the prompts that pair with it.",
  },
  {
    href: "/journeys",
    icon: Sparkles,
    title: "Journeys",
    blurb:
      "Scenario-based walkthroughs that compose tools and prompts end-to-end — for new projects, user research, hand-offs, and more.",
  },
];

export default function Home() {
  return (
    <Frame maxWidth="xl" padding="lg">
      <Stack gap="12" className="py-8">
        <Stack gap="4" className="max-w-2xl">
          <Heading as="h1" size="4xl">
            Your ProductOps Co-pilot.
          </Heading>
          <Text size="lg" variant="muted">
            One place to learn how the DSTA ProductOps Pipeline works, find the tools and guidance you
            need for each phase, and get AI-ready prompts you can paste
            straight into your work.
          </Text>
        </Stack>

        <Card className="border-l-4 border-l-accent p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <Stack gap="2" className="min-w-0 flex-1">
              <Text
                size="xs"
                weight="medium"
                className="uppercase tracking-wide text-accent"
              >
                About this portal
              </Text>
              <Text>
                AI is reshaping how product teams deliver — how UX, ops, and engineering hand work back and forth, how quickly a testable artefact can exist, what a &ldquo;prototype&rdquo; is worth carrying forward. This portal captures the product structures, processes, and tools we&rsquo;re piloting for that shift. Expect it to evolve as we learn and adapt to the pace of AI. If a workflow here matches yours: try it. If it doesn&rsquo;t: tell us at{" "}
                <a
                  href="mailto:DESIGNINNO@dsta.gov.sg"
                  className="font-medium text-accent hover:text-accent-strong"
                >
                  DESIGNINNO@dsta.gov.sg
                </a>
                {" "}— that shapes the next iteration.
              </Text>
            </Stack>
          </div>
        </Card>

        <Card className="border-accent p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg">
              <RefreshCw className="h-5 w-5" />
            </div>
            <Stack gap="4" className="min-w-0 flex-1">
              <Stack gap="2">
                <Text
                  size="xs"
                  weight="medium"
                  className="uppercase tracking-wide text-accent"
                >
                  Start here
                </Text>
                <Heading as="h2" size="lg">
                  Open the Flywheel
                </Heading>
                <Text variant="muted">
                  The Flywheel is the operational core. Pick the phase that
                  matches what your team is working on right now.
                </Text>
              </Stack>

              <div className="grid gap-3 sm:grid-cols-3">
                {phaseShortcuts.map(
                  ({ href, icon: PhaseIcon, name, blurb }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group block rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent hover:bg-bg-subtle"
                    >
                      <Stack gap="2">
                        <div className="flex items-center justify-between">
                          <PhaseIcon className="h-5 w-5 text-accent" />
                          <ArrowRight className="h-4 w-4 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>
                        <Heading as="h3" size="md">
                          {name}
                        </Heading>
                        <Text size="sm" variant="muted">
                          {blurb}
                        </Text>
                      </Stack>
                    </Link>
                  ),
                )}
              </div>

              <Link
                href="/flywheel"
                className="group inline-flex items-center gap-1 self-start text-sm font-medium text-accent hover:text-accent-strong"
              >
                See the full Flywheel overview
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Stack>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map(({ href, icon: Icon, title, blurb }) => (
            <Link key={href} href={href} className="group block">
              <Card className="h-full p-6 transition-colors hover:border-border-strong">
                <Stack gap="3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-accent" />
                    <Heading as="h2" size="lg">
                      {title}
                    </Heading>
                  </div>
                  <Text variant="muted">{blurb}</Text>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Stack>
              </Card>
            </Link>
          ))}
        </div>

      </Stack>
    </Frame>
  );
}
