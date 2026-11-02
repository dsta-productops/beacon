import type { ReactNode } from "react";
import { EnterpriseAppShellTopBar } from "@/components/templates/enterprise/app-shell";

/**
 * The site top bar: an opaque bar that follows the site's light/dark mode (the
 * hero runs up behind it, but the bar itself is solid so its text stays legible).
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
  return (
    <EnterpriseAppShellTopBar
      brand={brand}
      nav={nav}
      mobileNav={mobileNav}
      actions={actions}
    />
  );
}
