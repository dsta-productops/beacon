"use client";

import { cn } from "@/lib/utils";
import { NavigationMenu as BaseNav } from "@base-ui-components/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

// PRIZM 4.0 Navigation Menu, adapted to Base UI 1.0.0-rc.0 anatomy:
// each item's Content renders into one shared Popup/Viewport owned by the Root,
// so only the open item's panel is shown.
export function NavigationMenu({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNav.Root>) {
  return (
    <BaseNav.Root className={cn("relative", className)} {...props}>
      {children}
      <BaseNav.Portal>
        <BaseNav.Positioner
          sideOffset={8}
          align="start"
          collisionPadding={16}
          className="z-50 transition-[top,left,right,bottom] duration-150 ease-out"
        >
          <BaseNav.Popup
            className={cn(
              "relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden",
              "rounded-md border border-border bg-surface-elevated shadow-md",
              "transition-[opacity,transform,width,height] duration-150",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            )}
          >
            <BaseNav.Viewport className="relative h-full w-full overflow-hidden" />
          </BaseNav.Popup>
        </BaseNav.Positioner>
      </BaseNav.Portal>
    </BaseNav.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNav.List>) {
  return (
    <BaseNav.List
      className={cn("flex flex-row items-center gap-1 list-none m-0 p-0", className)}
      {...props}
    />
  );
}

export const NavigationMenuItem = BaseNav.Item;
export const NavigationMenuLink = BaseNav.Link;

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNav.Trigger>) {
  return (
    <BaseNav.Trigger
      className={cn(
        "group inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 text-sm transition-colors",
        "text-fg-muted hover:text-fg",
        "focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-accent",
        "data-[popup-open]:text-fg",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-data-[popup-open]:rotate-180"
        aria-hidden
      />
    </BaseNav.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNav.Content>) {
  return (
    <BaseNav.Content
      className={cn(
        "h-full transition-opacity duration-150",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuIndicator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof BaseNav.Icon>) {
  return (
    <BaseNav.Icon className={cn("flex h-1.5 w-1.5 rounded-full bg-accent", className)} {...props} />
  );
}
