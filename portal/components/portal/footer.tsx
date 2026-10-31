import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { ArrowUpRight } from "lucide-react";

// Layout and styling follow the CLARA site's footer, so the two read as one family.
const footerLinks = [
  { label: "Spectrum", href: "https://spectrum-dsta.vercel.app/" },
  { label: "CLARA", href: "https://dsta-productops.github.io/clara/" },
  { label: "PRIZM", href: "https://github.com/prizm-design/prizm" },
  { label: "PULSE", href: "https://pulse-reportcards.vercel.app" },
];

export function Footer() {
  return (
    <footer className="bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto]">
          <div className="max-w-md space-y-3">
            <Text weight="semibold" className="text-fg">
              BEACON
            </Text>
            <Text size="sm" variant="muted" className="leading-relaxed">
              Your guide to product work at DSTA &mdash; how research, design and
              measurement fit together, and which tool to use at each step.
            </Text>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col justify-between gap-4 text-xs md:flex-row">
          <Text size="xs" variant="subtle">
            Developed by DSTA.
          </Text>
          <Text size="xs" variant="subtle">
            Designed with the PRIZM design system &middot; Enterprise light.
          </Text>
        </div>
      </div>
    </footer>
  );
}
