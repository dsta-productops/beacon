"use client";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Plus, Sparkles, Square, X } from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const transport = new DefaultChatTransport({ api: "/api/ai" });

const MIN_WIDTH = 400;

const SUGGESTIONS = [
  "Which tool should I use for user interviews?",
  "What are the phases of the flywheel?",
  "What is the quality model?",
];

/**
 * AskBeacon — the top-bar button plus a centered chat dialog.
 * ⌘K / Ctrl+K toggles the drawer.
 *
 * Wires to /api/ai which streams from the provider-agnostic LLM layer
 * (Groq on internet, on-prem on airgap).
 */
export function AskBeacon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Custom width from dragging the side edges (null = default 700px).
  const [width, setWidth] = useState<number | null>(null);
  const [resizing, setResizing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, setMessages, status, error, stop } = useChat({
    transport,
  });

  const isPending = status === "streaming" || status === "submitted";

  const send = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || isPending) return;
      sendMessage({ text: t });
      setInput("");
    },
    [isPending, sendMessage],
  );

  const handleNewConversation = useCallback(() => {
    if (isPending) stop();
    setMessages([]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [isPending, stop, setMessages]);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus the input each time the drawer opens
  useEffect(() => {
    if (!open) return;
    setWidth(null);
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [open]);

  // Grow the textarea with its content (up to ~5 lines)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  // Enter sends, Shift+Enter adds a new line
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  // Drag a side edge to resize. The modal is centred, so each pixel dragged
  // changes the width by two: the edge stays under the cursor.
  const startResize =
    (side: "left" | "right") => (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = popupRef.current;
      if (!el) return;
      e.preventDefault();
      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);
      const startX = e.clientX;
      const startWidth = el.offsetWidth;
      const dir = side === "right" ? 1 : -1;
      setResizing(true);
      const onMove = (ev: PointerEvent) => {
        const max = window.innerWidth - 32;
        const next = startWidth + 2 * dir * (ev.clientX - startX);
        setWidth(Math.round(Math.min(max, Math.max(MIN_WIDTH, next))));
      };
      const onUp = () => {
        setResizing(false);
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onUp);
      };
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
      target.addEventListener("pointercancel", onUp);
    };

  const canSend = input.trim().length > 0 && !isPending;

  return (
    <>
      {/* Trigger button in the top bar */}
      <Button
        variant="subtle"
        className={className}
        onClick={() => setOpen(true)}
        title="Ask BEACON (⌘K)"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        Ask BEACON
      </Button>

      <BaseDialog.Root open={open} onOpenChange={setOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop
            className={cn(
              "fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm",
              "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
              "transition-opacity duration-200",
            )}
          />
          <BaseDialog.Popup
            ref={popupRef}
            aria-describedby={undefined}
            style={width ? { width, maxWidth: "none" } : undefined}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 flex h-[min(960px,calc(100vh-2rem))] w-[calc(100%-2rem)] max-w-[700px] -translate-x-1/2 -translate-y-1/2 flex-col",
              "overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-lg",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              resizing ? "transition-none" : "transition-all duration-200",
            )}
          >
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                onPointerDown={startResize(side)}
                aria-hidden
                className={cn(
                  "absolute inset-y-0 z-10 hidden w-1.5 cursor-col-resize touch-none sm:block",
                  "hover:bg-accent/30 active:bg-accent/40",
                  side === "left" ? "left-0" : "right-0",
                )}
              />
            ))}
            <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                <BaseDialog.Title className="text-base font-semibold text-fg">
                  BEACON
                </BaseDialog.Title>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleNewConversation}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-fg-muted hover:bg-bg-muted hover:text-fg"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    New chat
                  </button>
                )}
                <BaseDialog.Close
                  aria-label="Close"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-muted hover:bg-bg-muted hover:text-fg"
                >
                  <X className="h-4 w-4" />
                </BaseDialog.Close>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <EmptyState onPick={send} />
              ) : (
                <ChatBody messages={messages} status={status} error={error} />
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-border p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-border bg-bg px-3 py-2 focus-within:border-accent">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Message BEACON…"
                  aria-label="Message BEACON"
                  className="max-h-[120px] flex-1 resize-none bg-transparent py-1 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
                />
                {isPending ? (
                  <button
                    type="button"
                    onClick={stop}
                    aria-label="Stop"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-muted text-fg hover:bg-bg-subtle"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canSend}
                    aria-label="Send"
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      canSend
                        ? "bg-accent text-accent-fg hover:bg-accent-hover"
                        : "bg-bg-muted text-fg-subtle",
                    )}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Text size="xs" variant="subtle" className="mt-2 text-center">
                Answers come from this portal only.
              </Text>
            </form>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
}

function Avatar() {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg">
      <Sparkles className="h-3.5 w-3.5" aria-hidden />
    </span>
  );
}

function EmptyState({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5 py-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar />
        <Text size="sm" variant="muted">
          Hi! I can answer questions about the ProductOps pipeline, tools,
          prompts and journeys.
        </Text>
      </div>
      <div className="flex flex-col gap-2">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-left text-sm text-fg-muted transition-colors hover:border-border-strong hover:bg-bg-muted hover:text-fg"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ChatBodyProps {
  messages: ReturnType<typeof useChat>["messages"];
  status: ReturnType<typeof useChat>["status"];
  error: Error | undefined;
}

/** Nearest ancestor that actually scrolls (the dialog body). */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let n = el?.parentElement ?? null; n; n = n.parentElement) {
    const oy = getComputedStyle(n).overflowY;
    if (oy === "auto" || oy === "scroll") return n;
  }
  return null;
}

function Dots() {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 rounded-full bg-fg-subtle motion-safe:animate-bounce motion-reduce:animate-pulse"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

function ChatBody({ messages, status, error }: ChatBodyProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const last = messages[messages.length - 1];

  // "Thinking": request sent but no answer text has arrived yet.
  const awaitingText =
    status === "submitted" ||
    (status === "streaming" &&
      last?.role === "assistant" &&
      !last.parts.some((p) => p.type === "text" && p.text.length > 0));

  // A new message (the user's send, or the reply starting) or the thinking
  // indicator appearing always scrolls to the bottom.
  const count = messages.length;
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [count, awaitingText]);

  // While the reply streams in, keep following it — unless the user has
  // scrolled up to read something earlier.
  useEffect(() => {
    if (status !== "streaming") return;
    const sp = scrollParent(endRef.current);
    if (!sp) return;
    const nearBottom = sp.scrollHeight - sp.scrollTop - sp.clientHeight < 120;
    if (nearBottom) sp.scrollTop = sp.scrollHeight;
  }, [messages, status]);

  return (
    <div className="space-y-5">
      {messages.map((m) => {
        const text = m.parts
          .map((p) => (p.type === "text" ? p.text : ""))
          .join("");
        if (m.role === "assistant" && !text) return null; // shown as "thinking"
        return m.role === "user" ? (
          <div key={m.id} className="flex justify-end">
            <div className="ml-10 whitespace-pre-wrap rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm text-accent-fg">
              {text}
            </div>
          </div>
        ) : (
          <div key={m.id} className="flex gap-2.5">
            <Avatar />
            <div className="min-w-0 flex-1 text-sm text-fg">
              <Markdown>{text}</Markdown>
              {status === "streaming" && m === last && (
                <div role="status" className="mt-2 flex h-4 items-center gap-1">
                  <span className="sr-only">BEACON is still writing…</span>
                  <Dots />
                </div>
              )}
            </div>
          </div>
        );
      })}
      {awaitingText && (
        <div role="status" className="flex gap-2.5">
          <Avatar />
          <span className="sr-only">BEACON is thinking…</span>
          <div className="flex h-6 items-center gap-1">
            <Dots />
          </div>
        </div>
      )}
      {error && (
        <Text size="xs" className="text-danger">
          {error.message}
        </Text>
      )}
      <div ref={endRef} aria-hidden />
    </div>
  );
}
