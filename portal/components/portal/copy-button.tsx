"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  /** Square icon-only button: the icon swaps to a tick once copied. */
  iconOnly?: boolean;
}

export function CopyButton({ text, label = "Copy prompt", iconOnly = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (iconOnly) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : label}
        title={copied ? "Copied" : label}
        className="h-8 w-8"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
    >
      {/* Both labels share one grid cell, so the button keeps the wider label's width and never reflows its neighbours. */}
      <span className="grid">
        <span
          className={`col-start-1 row-start-1 inline-flex items-center gap-2 ${copied ? "invisible" : ""}`}
        >
          <Copy className="h-4 w-4" />
          {label}
        </span>
        <span
          aria-hidden={!copied}
          className={`col-start-1 row-start-1 inline-flex items-center gap-2 ${copied ? "" : "invisible"}`}
        >
          <Check className="h-4 w-4" />
          Copied
        </span>
      </span>
    </Button>
  );
}
