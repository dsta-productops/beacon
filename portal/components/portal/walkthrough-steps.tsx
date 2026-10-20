"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { ChevronDown, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Collapsible walkthrough layout: phases are plain headings that group steps,
 * and each step opens and closes independently.
 *
 * The server renders every block's content and passes it in as `content`;
 * this component only owns open/closed state.
 */

export type WalkthroughBlock =
  | { kind: "plain"; id: string; content: ReactNode }
  | {
      kind: "step";
      id: string;
      title: string;
      phase: string;
      tool?: string;
      defaultOpen?: boolean;
      content: ReactNode;
    };

interface Phase {
  name: string;
  steps: Extract<WalkthroughBlock, { kind: "step" }>[];
}

type Segment = { kind: "plain"; block: Extract<WalkthroughBlock, { kind: "plain" }> } | { kind: "phase"; phase: Phase };

function toSegments(blocks: WalkthroughBlock[]): Segment[] {
  const segments: Segment[] = [];
  for (const block of blocks) {
    if (block.kind === "plain") {
      segments.push({ kind: "plain", block });
      continue;
    }
    const last = segments[segments.length - 1];
    if (last?.kind === "phase" && last.phase.name === block.phase) {
      last.phase.steps.push(block);
    } else {
      segments.push({ kind: "phase", phase: { name: block.phase, steps: [block] } });
    }
  }
  return segments;
}

export function WalkthroughSteps({
  blocks,
  phaseSummaries = {},
}: {
  blocks: WalkthroughBlock[];
  phaseSummaries?: Record<string, string>;
}) {
  const segments = useMemo(() => toSegments(blocks), [blocks]);
  const steps = useMemo(
    () => blocks.filter((b): b is Extract<WalkthroughBlock, { kind: "step" }> => b.kind === "step"),
    [blocks],
  );

  const [openSteps, setOpenSteps] = useState<Set<string>>(
    new Set(steps.filter((s) => s.defaultOpen).map((s) => s.id)),
  );

  const reveal = useCallback(
    (id: string) => {
      const step = steps.find((s) => s.id === id);
      if (!step) return false;
      setOpenSteps((s) => new Set(s).add(id));
      return true;
    },
    [steps],
  );

  // Deep links and "On this page" clicks open the step they point at.
  useEffect(() => {
    const open = () => {
      const id = window.location.hash.slice(1);
      if (id && reveal(id)) {
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [reveal]);

  const toggleStep = (id: string, open: boolean) =>
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (open) next.add(id);
      else next.delete(id);
      return next;
    });

  const allOpen = steps.length > 0 && steps.every((s) => openSteps.has(s.id));
  const expandAll = () => {
    setOpenSteps(new Set(allOpen ? [] : steps.map((s) => s.id)));
  };

  const firstPhaseIndex = segments.findIndex((s) => s.kind === "phase");

  return (
    <div className="flex flex-col gap-8">
      {segments.map((segment, i) =>
        segment.kind === "plain" ? (
          <div key={segment.block.id}>{segment.block.content}</div>
        ) : (
          <div key={segment.phase.name} className="flex flex-col gap-4">
            {i === firstPhaseIndex && (
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={expandAll}>
                  {allOpen ? "Collapse all" : "Expand all"}
                </Button>
              </div>
            )}
            <PhaseGroup
              phase={segment.phase}
              summary={phaseSummaries[segment.phase.name]}
              openSteps={openSteps}
              onStepOpenChange={toggleStep}
            />
          </div>
        ),
      )}
    </div>
  );
}

function PhaseGroup({
  phase,
  summary,
  openSteps,
  onStepOpenChange,
}: {
  phase: Phase;
  summary?: string;
  openSteps: Set<string>;
  onStepOpenChange: (id: string, open: boolean) => void;
}) {
  return (
    <section aria-labelledby={`phase-${phase.name}`}>
      <h2 id={`phase-${phase.name}`} className="m-0 border-b border-border pb-3">
        <span className="block text-2xl font-semibold tracking-tight text-fg">{phase.name}</span>
        {summary && <span className="mt-1 block text-sm font-normal text-fg-muted">{summary}</span>}
      </h2>
      <div className="flex flex-col gap-3 pt-4">
        {phase.steps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            open={openSteps.has(step.id)}
            onOpenChange={(o) => onStepOpenChange(step.id, o)}
          />
        ))}
      </div>
    </section>
  );
}

function StepCard({
  step,
  open,
  onOpenChange,
}: {
  step: Extract<WalkthroughBlock, { kind: "step" }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const match = /^(\d+)\.\s*(.*)$/.exec(step.title);
  const number = match?.[1];
  const title = match?.[2] ?? step.title;
  return (
    <section id={step.id} className="scroll-mt-20 rounded-lg border border-border bg-surface">
      <Collapsible.Root open={open} onOpenChange={onOpenChange}>
        <h3 className="m-0">
          <Collapsible.Trigger className="group flex w-full cursor-pointer items-center gap-3 rounded-lg p-4 text-left">
            {!number && (
              <ListChecks aria-hidden="true" className="size-7 shrink-0 rounded-full bg-bg-muted p-1.5 text-fg" />
            )}
            {number && (
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-muted text-sm font-semibold text-fg"
              >
                {number}
              </span>
            )}
            <span className="flex-1 text-base font-semibold text-fg group-hover:text-accent">
              {number && <span className="sr-only">Step {number}: </span>}
              {title}
            </span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-fg-muted transition-transform -rotate-90 group-data-[panel-open]:rotate-0"
            />
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Panel hiddenUntilFound>
          <div className="border-t border-border px-4 pt-4 pb-2 sm:px-6">{step.content}</div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </section>
  );
}

/** Closed-by-default extra detail inside a step ("Learn more", "Stuck?"). */
export function Disclosure({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Collapsible.Root className="my-3 rounded-lg border border-border">
      <Collapsible.Trigger
        className={cn(
          "group flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm font-medium text-fg-muted",
          "hover:text-fg",
        )}
      >
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform -rotate-90 group-data-[panel-open]:rotate-0"
        />
        {title}
      </Collapsible.Trigger>
      <Collapsible.Panel hiddenUntilFound>
        <div className="border-t border-border px-3 pt-3 text-sm [&_li]:text-sm [&_p]:text-sm">{children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
