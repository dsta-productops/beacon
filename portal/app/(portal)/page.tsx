import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Stack } from "@/components/ui/stack";
import { Frame } from "@/components/ui/frame";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";

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
    name: "Test",
    tools: [
      {
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

export default function Home() {
  return (
    <Frame maxWidth="xl" padding="lg">
      <Stack gap="12" className="py-8">
        <Stack gap="4" className="max-w-2xl">
          <Heading as="h1" size="4xl">
            Your guide to product work at DSTA.
          </Heading>
          <Text size="lg" variant="muted">
            Beacon shows you how product work goes from research, to design, to
            testing, and which tool to use at each step.
          </Text>
        </Stack>

        <Card className="border-accent p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg">
              <BookOpen className="h-5 w-5" />
            </div>
            <Stack gap="4" className="min-w-0 flex-1">
              <Stack gap="2">
                <Heading as="h2" size="lg">
                  Your first project
                </Heading>
                <Text variant="muted">
                  Take a project from raw interview notes to a prototype that
                  real users can test. You don&apos;t need a
                  background in product management or design.
                </Text>
              </Stack>
              <Link
                href="/tutorial"
                className="group inline-flex items-center gap-1 self-start text-sm font-medium text-accent hover:text-accent-strong"
              >
                Start here on Confluence
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Stack>
          </div>
        </Card>

        <Stack gap="6">
          <Stack gap="2">
            <Heading as="h2" size="xl">
              Tools for each stage
            </Heading>
            <Text variant="muted">
              Find out what users need, build a prototype, then test it.
            </Text>
          </Stack>
          <ol className="m-0 hidden list-none grid-cols-3 gap-4 p-0 lg:grid">
            {stages.map(({ name }, index) => (
              <li key={name} className="flex items-center">
                <span
                  aria-hidden="true"
                  className="-ml-2 mr-1 flex flex-1 items-center"
                >
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
                  className={`-mr-2 ml-3 h-px flex-1 ${index < stages.length - 1 ? "bg-border-strong" : ""}`}
                />
              </li>
            ))}
          </ol>
          <div className="grid gap-x-4 gap-y-8 lg:grid-cols-3">
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
                          ? "h-full p-5 transition-colors group-hover:border-accent"
                          : "h-full p-5"
                      }
                    >
                      <Stack gap="2">
                        <span className="text-base font-semibold text-fg transition-colors group-hover:text-accent">
                          {tool.name}
                        </span>
                        <Text size="sm" variant="muted">
                          {tool.blurb}
                        </Text>
                      </Stack>
                    </Card>
                  );
                  return tool.href ? (
                    <Link
                      key={`${name}-${tool.name}`}
                      href={tool.href}
                      className="group block"
                    >
                      {tile}
                    </Link>
                  ) : (
                    <div key={`${name}-${tool.name}`}>{tile}</div>
                  );
                })}
              </div>
            ))}
          </div>
        </Stack>

        <Text variant="muted">
          Want to understand the thinking behind it?{" "}
          <Link
            href="/pipeline"
            className="font-medium text-accent hover:text-accent-strong"
          >
            Read how research, design and test fit together.
          </Link>
        </Text>
      </Stack>
    </Frame>
  );
}
