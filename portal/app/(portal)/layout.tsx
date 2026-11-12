import { EnterpriseAppShell } from "@/components/templates/enterprise/app-shell";
import { Brand } from "@/components/portal/brand";
import { Footer } from "@/components/portal/footer";
import { MobileNav } from "@/components/portal/mobile-nav";
import { PrimaryNav } from "@/components/portal/primary-nav";
import { PortalTopBar } from "@/components/portal/top-bar";
import { AskBeacon } from "@/components/portal/ask-beacon";
import { ThemeToggle } from "@/components/portal/theme-toggle";
import type { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <EnterpriseAppShell
      topBar={
        <PortalTopBar
          brand={<Brand />}
          nav={<PrimaryNav />}
          mobileNav={<MobileNav />}
          actions={
            <>
              {/* order-first puts the button before the nav links (and first on mobile) */}
              <AskBeacon className="order-first" />
              <ThemeToggle />
            </>
          }
        />
      }
      footer={<Footer />}
    >
      {children}
    </EnterpriseAppShell>
  );
}
