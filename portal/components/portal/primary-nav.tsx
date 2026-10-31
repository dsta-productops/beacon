"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  description: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const primaryNavGroups: NavGroup[] = [
  {
    label: "Learn",
    items: [
      {
        href: "/pipeline",
        label: "Pipeline",
        description: "The three layers of operations, and where ProductOps fits.",
      },
      {
        href: "/flywheel",
        label: "Flywheel",
        description: "Research, Design and Measure, phase by phase.",
      },
      {
        href: "/product-roles",
        label: "Product Roles",
        description: "How product, design and engineering work together.",
      },
      {
        href: "/quality-model",
        label: "Quality Model",
        description: "The quality bar every product's code must meet.",
      },
    ],
  },
  {
    label: "Toolkit",
    items: [
      {
        href: "/tools",
        label: "Tools",
        description: "Every tool in the pipeline, and how to get access.",
      },
      {
        href: "/prompts",
        label: "Prompts",
        description: "Copy-and-paste prompts for every phase.",
      },
    ],
  },
  {
    label: "Get started",
    items: [
      {
        href: "/tutorial",
        label: "Tutorial on Confluence",
        description: "Your first project, with a Confluence knowledge base.",
      },
      {
        href: "/tutorial-gitlab",
        label: "Tutorial on GitLab",
        description: "Your first project, with a GitLab wiki.",
      },
      {
        href: "/journeys",
        label: "Journeys",
        description: "Step-by-step flows for common situations.",
      },
    ],
  },
];

/** Top-level links that sit after the dropdowns, outside any group. */
export const primaryNavLinks: NavItem[] = [
  {
    href: "/faq",
    label: "FAQ",
    description: "Answers to common questions about BEACON and its tools.",
  },
];

export const primaryNavItems: NavItem[] = [
  ...primaryNavGroups.flatMap((g) => g.items),
  ...primaryNavLinks,
];

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavGroupItem({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const groupActive = group.items.some((item) => isNavItemActive(pathname, item.href));

  return (
    <NavigationMenuItem value={group.label}>
      <NavigationMenuTrigger className={cn(groupActive && "bg-bg-muted text-fg")}>
        {group.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-80 p-1.5">
        <ul className="flex flex-col">
          {group.items.map((item) => {
            const active = isNavItemActive(pathname, item.href);
            return (
              <li key={item.href}>
                <NavigationMenuLink
                  render={<Link href={item.href} />}
                  active={active}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors",
                    "hover:bg-bg-muted focus-visible:bg-bg-muted focus-visible:outline-none",
                    active && "bg-bg-muted",
                  )}
                >
                  <span className="text-sm font-medium text-fg">{item.label}</span>
                  <span className="text-xs text-fg-muted">{item.description}</span>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function PrimaryNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Close the open dropdown once a link has taken the user to a new page.
  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  return (
    <NavigationMenu value={openGroup} onValueChange={(value) => setOpenGroup(value as string | null)}>
      <NavigationMenuList>
        {primaryNavGroups.map((group) => (
          <NavGroupItem key={group.label} group={group} />
        ))}
        {primaryNavLinks.map((item) => {
          const active = isNavItemActive(pathname, item.href);
          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                render={<Link href={item.href} />}
                active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-fg-muted hover:bg-bg-muted hover:text-fg",
                  "focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-accent",
                  active && "bg-bg-muted text-fg",
                )}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
