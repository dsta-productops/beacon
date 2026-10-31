import {
  EnterpriseAppShell,
  EnterpriseAppShellTopBar,
} from "@/components/templates/enterprise/app-shell";
import { Brand } from "@/components/portal/brand";
import { Footer } from "@/components/portal/footer";
import { MobileNav } from "@/components/portal/mobile-nav";
import { PrimaryNav } from "@/components/portal/primary-nav";
import type { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <EnterpriseAppShell
      topBar={
        <EnterpriseAppShellTopBar
          brand={<Brand />}
          nav={<PrimaryNav />}
          mobileNav={<MobileNav />}
        />
      }
      footer={<Footer />}
    >
      {children}
    </EnterpriseAppShell>
  );
}
