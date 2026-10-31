"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { DARK_CLASS, THEME_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Switches the whole site between PRIZM Enterprise light and dark, and remembers the choice. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // The pre-paint script has already applied the theme; read it back.
  useEffect(() => {
    setDark(document.documentElement.classList.contains(DARK_CLASS));
  }, []);

  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, next);
    root.setAttribute("data-mode", next ? "dark" : "light");
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the switch still works for this visit.
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-fg-muted transition-colors",
        "hover:text-fg focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-accent",
      )}
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
