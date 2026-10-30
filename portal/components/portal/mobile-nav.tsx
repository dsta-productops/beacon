"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { isNavItemActive, primaryNavGroups } from "./primary-nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-fg-muted transition-colors",
          "hover:border-border-strong hover:text-fg",
          "focus:outline-none focus-visible:outline-none",
        )}
      >
        <Menu className="h-5 w-5" />
      </button>
      <SheetContent
        side="left"
        className="sm:max-w-xs"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Primary"
          className="mt-6 flex flex-col gap-1 px-4 pb-6"
        >
          {primaryNavGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-1 pb-3">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                {group.label}
              </p>
              {group.items.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-bg-muted text-fg"
                        : "text-fg-muted hover:bg-bg-muted/60 hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
