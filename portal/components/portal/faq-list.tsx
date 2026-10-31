"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

/** FAQ groups of closed-by-default questions. A `#question-id` link opens and scrolls to that question. */
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !groups.some((g) => g.items.some((item) => item.id === id))) return;
      setOpen((prev) => new Set(prev).add(id));
      setTarget(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [groups]);

  // Scroll once the linked question has opened, so the page lands on its answer.
  useEffect(() => {
    if (!target) return;
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ block: "start" });
      setTarget(null);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [target]);

  const toggle = (id: string, isOpen: boolean) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={group.id}>
          <h2 id={group.id} className="mb-3 text-xl font-semibold text-fg">
            {group.title}
          </h2>
          <div className="flex flex-col gap-2">
            {group.items.map((item) => (
              <Collapsible.Root
                key={item.id}
                id={item.id}
                open={open.has(item.id)}
                onOpenChange={(isOpen) => toggle(item.id, isOpen)}
                className="scroll-mt-24 rounded-lg border border-border bg-surface"
              >
                <Collapsible.Trigger
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left font-medium text-fg",
                    "hover:bg-bg-muted/60",
                  )}
                >
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-fg-muted transition-transform -rotate-90 group-data-[panel-open]:rotate-0"
                  />
                  {item.question}
                </Collapsible.Trigger>
                <Collapsible.Panel hiddenUntilFound>
                  <div className="border-t border-border px-4 py-3 sm:pl-11">{item.answer}</div>
                </Collapsible.Panel>
              </Collapsible.Root>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
