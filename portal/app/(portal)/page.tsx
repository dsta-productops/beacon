import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BeaconHeroArt } from "@/components/portal/beacon-hero-art";
import { ArrowRight, ChevronRight } from "lucide-react";

interface Tool {
  href?: string;
  name: string;
  blurb: string;
}

interface Stage {
  name: string;
  tools: Tool[];
}

const stages: Stage[] = [
  {
    name: "Research",
    tools: [
      {
        href: "/tools/clara",
        name: "CLARA",
        blurb:
          "Gathers your rough research notes into structured documents, such as personas, journeys and a PRD, and files them in your knowledge base.",
      },
      {
        href: "/tools/insight",
        name: "INSIGHT",
        blurb:
          "Run your interview with a helper beside you. INSIGHT suggests what to ask next, keeps a summary of the conversation, and writes the transcript for you.",
      }
    ],
  },
  {
    name: "Design",
    tools: [
      {
        href: "/tools/prizm",
        name: "PRIZM",
        blurb:
          "DSTA's design system: ready-made screens, components and colours. Your prototype follows DSTA standards without extra styling work.",
      },
    ],
  },
  {
    name: "Measure",
    tools: [
      {
        href: "/tools/pulse",
        name: "PULSE",
        blurb:
          "Gives every product the same one-page report card, so products can be compared. Every figure is labelled as measured or an estimate.",
      },
      {
        href: "/tools/dash",
        name: "DASH",
        blurb:
          "Shows whether your design is better. You survey users on how things work today, then test your prototype and compare the two. DASH AI suggests what to improve.",
      }
    ],
  },
];

// Section layout and type scale follow the CLARA site, so the two read as one family.
const CONTAINER = "mx-auto max-w-6xl px-6 sm:px-8";
const EYEBROW = "uppercase tracking-[0.18em] text-accent";

export default function Home() {
  return (
    <>
      {/* Fills the first screen, running up behind the top bar (h-14), which turns dark over it. */}
      <section
        id="hero"
        className="theme-enterprise-dark relative -mt-14 flex min-h-svh items-center overflow-hidden bg-bg pt-14 text-fg"
      >
        <BeaconHeroArt className="absolute inset-0 h-full w-full opacity-40 lg:opacity-100" />
        {/* Mutes the illustration's colours overall. */}
        <div aria-hidden="true" className="absolute inset-0 bg-bg/40" />
        {/* Deepens the field behind the text, fading out at the beacon. */}
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-bg/75 to-transparent" />
        <div className={`${CONTAINER} relative w-full py-24 sm:py-32`}>
          <div className="max-w-xl space-y-8">
            <Text size="sm" variant="muted" weight="medium" className={EYEBROW}>
              Product work at DSTA
            </Text>

            <Heading as="h1" size="4xl" className="text-balance sm:text-5xl lg:text-6xl">
              Your guide to product work at DSTA.
            </Heading>

            <Text size="lg" variant="muted" className="max-w-2xl text-balance leading-relaxed">
              Beacon shows you how product work goes from research, to design, to
              measurement, and which tool to use at each step.
            </Text>

            <div className="flex flex-wrap gap-2 pt-2">
              {stages.map(({ name }) => (
                <Badge key={name} variant="outline">
                  {name}
                </Badge>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/tutorial" className="inline-flex">
                <Button variant="solid" size="lg">
                  Begin your tutorial
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="bg-bg-subtle">
        <div className={`${CONTAINER} py-20 sm:py-24 lg:py-28`}>
          <div className="max-w-2xl space-y-4">
            <Text size="sm" variant="muted" weight="medium" className={EYEBROW}>
              The pipeline
            </Text>
            <Heading as="h2" size="3xl" className="text-balance">
              Tools for each stage
            </Heading>
            <Text size="md" variant="muted" className="leading-relaxed">
              Product work moves through three stages. In Research, you find out
              who your users are and what problem to solve. In Design, you turn
              that into a prototype people can try. In Measure, you test it with
              real users and show whether it is better. Each stage has its own
              tools, and what you learn feeds the next round.
            </Text>
            <Link
              href="/flywheel"
              className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
            >
              Explore the flywheel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          <ol className="m-0 mt-12 hidden list-none grid-cols-3 gap-6 p-0 lg:grid">
            {stages.map(({ name }, index) => (
              <li key={name} className="flex items-center">
                <span aria-hidden="true" className="-ml-3 mr-1 flex flex-1 items-center">
                  {index > 0 && (
                    <>
                      <span className="h-px flex-1 bg-border-strong" />
                      <ChevronRight className="-ml-1.5 h-4 w-4 text-fg-muted" />
                    </>
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <Badge variant="solid">{index + 1}</Badge>
                  <Heading as="h3" size="md">
                    {name}
                  </Heading>
                </span>
                <span
                  aria-hidden="true"
                  className={`-mr-3 ml-3 h-px flex-1 ${index < stages.length - 1 ? "bg-border-strong" : ""}`}
                />
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-x-6 gap-y-8 lg:mt-6 lg:grid-cols-3">
            {stages.map(({ name, tools }, index) => (
              <div key={name} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 lg:hidden">
                  <Badge variant="solid">{index + 1}</Badge>
                  <Heading as="h3" size="md">
                    {name}
                  </Heading>
                </div>
                {tools.map((tool) => {
                  const tile = (
                    <Card
                      className={
                        tool.href
                          ? "h-full transition-colors group-hover:border-accent"
                          : "h-full"
                      }
                    >
                      <CardHeader>
                        <CardTitle className="text-base transition-colors group-hover:text-accent">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Text size="sm" variant="muted" className="leading-relaxed">
                          {tool.blurb}
                        </Text>
                      </CardContent>
                    </Card>
                  );
                  return tool.href ? (
                    <Link key={`${name}-${tool.name}`} href={tool.href} className="group block">
                      {tile}
                    </Link>
                  ) : (
                    <div key={`${name}-${tool.name}`}>{tile}</div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The hero's dot grid again, in pale grey on the light page. */}
      <section className="bg-bg bg-[radial-gradient(circle,var(--color-border)_1.3px,transparent_1.6px)] bg-[length:24px_24px]">
        <div className={`${CONTAINER} py-20 sm:py-24`}>
          <div className="max-w-2xl space-y-4">
            <Text size="sm" variant="muted" weight="medium" className={EYEBROW}>
              Go deeper
            </Text>
            <Heading as="h2" size="3xl" className="text-balance">
              Understand the thinking behind it
            </Heading>
            <Text size="md" variant="muted" className="leading-relaxed">
              See how research, design and measurement fit together, and why each
              step feeds the next.
            </Text>
            <div className="pt-4">
              <Link href="/pipeline" className="inline-flex">
                <Button variant="outline" size="lg">
                  Read about the pipeline
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
