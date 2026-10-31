"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { EnterpriseAppShellTopBar } from "@/components/templates/enterprise/app-shell";
import { cn } from "@/lib/utils";

// A page opts in by giving its dark, full-bleed first section this id.
const DARK_HERO_ID = "hero";

/**
 * The site top bar, in liquid glass. Over a dark hero it takes PRIZM's Enterprise
 * dark theme (and the dark glass tint), so the hero runs up behind it; past the
 * hero it is the light glass bar.
 */
export function PortalTopBar({
  brand,
  nav,
  mobileNav,
  actions,
}: {
  brand: ReactNode;
  nav: ReactNode;
  mobileNav: ReactNode;
  actions?: ReactNode;
}) {
  const pathname = usePathname();
  // The home page opens on its hero, so start dark there to avoid a light flash on load.
  const [dark, setDark] = useState(pathname === "/");

  useEffect(() => {
    const hero = document.getElementById(DARK_HERO_ID);
    if (!hero) {
      setDark(false);
      return;
    }
    const update = () => setDark(hero.getBoundingClientRect().bottom > 56);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <EnterpriseAppShellTopBar
      brand={brand}
      nav={nav}
      mobileNav={mobileNav}
      actions={actions}
      className={cn(
        "transition-colors duration-200",
        dark && "theme-enterprise-dark",
      )}
    />
  );
}
