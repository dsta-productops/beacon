"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2 } from "lucide-react";
import { CopyButton } from "@/components/portal/copy-button";
import { CodeBlock } from "@/components/ui/code";
import type { Project } from "@/lib/remark-project";
import { STORAGE_KEY } from "@/lib/project-storage";
import { cn } from "@/lib/utils";

/**
 * Which project the reader is following: their own, or the SKYPROTECT demo.
 *
 * The page starts on "demo". Once the reader picks their own project, that is remembered in this browser.
 * The demo is written as if the whole tutorial uses it, so its content shows without a label.
 *
 * Project-specific text is resolved on the server (see `lib/remark-project.ts`), once per project.
 * Both versions are in the page, and the `data-project` attribute on `<html>` decides which one
 * shows. A small script in the root layout sets it before first paint, so the "demo" version shows from the first paint.
 */
export type { Project };

interface ProjectChoice {
  project: Project;
  setProject: (project: Project) => void;
}

const ProjectChoiceContext = createContext<ProjectChoice>({
  project: "demo",
  setProject: () => {},
});

export function useProjectChoice() {
  return useContext(ProjectChoiceContext);
}

export function ProjectChoiceProvider({ children }: { children: ReactNode }) {
  const [project, setProjectState] = useState<Project>("demo");

  // Read the saved choice after hydration so the server and first client render match.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "own" || saved === "demo") {
        setProjectState(saved);
        document.documentElement.setAttribute("data-project", saved);
      }
    } catch {
      // Storage can be blocked; the page then works without remembering.
    }
  }, []);

  const setProject = useCallback((next: Project) => {
    setProjectState(next);
    document.documentElement.setAttribute("data-project", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }, []);

  const value = useMemo(() => ({ project, setProject }), [project, setProject]);
  return (
    <ProjectChoiceContext.Provider value={value}>
      {children}
    </ProjectChoiceContext.Provider>
  );
}

const OPTIONS: { value: Project; label: string; title: string; description: string }[] = [
  {
    value: "demo",
    label: "Option A",
    title: "The demo project",
    description: "Practise with SKYPROTECT, a made-up drone-defence programme. Step 5 sets it up.",
  },
  {
    value: "own",
    label: "Option B",
    title: "My own project",
    description: "Follow the tutorial with a programme of your own.",
  },
];

const STATUS: Record<Project, string> = {
  own: "",
  demo: "",
};

/** `::projectswitch` — two selectable cards that choose between your own project and the demo. */
export function ProjectSwitch() {
  const { project, setProject } = useProjectChoice();
  const name = useId();
  return (
    <div className="my-4">
      <div role="radiogroup" aria-label="Choose a project" className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = project === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                selected
                  ? "border-accent bg-surface ring-1 ring-accent"
                  : "border-border bg-bg-subtle hover:border-fg-muted",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => setProject(option.value)}
                className="sr-only"
              />
              <span className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
                {option.label}
              </span>
              <span className="flex items-center justify-between gap-2 text-base font-semibold text-fg">
                {option.title}
                {selected ? (
                  <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-accent" />
                ) : null}
              </span>
              <span className="text-sm leading-6 text-fg-muted">{option.description}</span>
            </label>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 mb-0 text-sm text-fg-muted">
        {STATUS[project]}
      </p>
    </div>
  );
}

/** A copyable prompt. The server has already put the demo's programme name into it. */
export function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="relative mt-2 [&_pre]:mb-0">
      <CodeBlock className="mb-0 whitespace-pre-wrap pr-24">{prompt}</CodeBlock>
      <div className="absolute top-2 right-2">
        <CopyButton text={prompt} label="Copy" />
      </div>
    </div>
  );
}
