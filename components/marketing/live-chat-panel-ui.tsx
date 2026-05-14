/**
 * Components Marketing Live Chat Panel Ui public module surface.
 */
"use client";

import type { UIMessage } from "ai";
import type * as React from "react";
import { MessageBubble } from "@/components/marketing/live-chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** Renders the floating button that opens the accessibility chat sheet. */
export function LiveChatTrigger() {
  return (
    <SheetTrigger asChild>
      <Button
        type="button"
        size="icon-lg"
        className="size-12 rounded-full shadow-lg"
        aria-label="Open accessibility assistant chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </Button>
    </SheetTrigger>
  );
}

/** Renders the chat sheet heading and offline configuration notice. */
export function LiveChatHeader({ apiConfigured }: { apiConfigured: boolean }) {
  return (
    <SheetHeader className="border-b">
      <SheetTitle className="flex items-center gap-2">
        <span
          className="inline-block size-2 rounded-full bg-emerald-500"
          aria-hidden
        />
        Accessibility assistant
      </SheetTitle>
      <SheetDescription>
        Powered by OpenRouter. Ask about WCAG, ADA-minded engineering, and this
        app&apos;s accessibility-oriented patterns. History is saved on this
        device.
      </SheetDescription>
      {!apiConfigured ? (
        <p className="text-xs text-destructive" role="status">
          Chat is offline: set{" "}
          <span className="font-mono">OPENROUTER_API_KEY</span> (and optionally{" "}
          <span className="font-mono">OPENROUTER_MODEL</span>) in{" "}
          <span className="font-mono">.env.local</span>, then restart dev.
        </p>
      ) : null}
    </SheetHeader>
  );
}

/** Renders the scrollable chat transcript with retry wiring for each message. */
export function LiveChatMessages({
  messages,
  busy,
  endRef,
  onRetry,
}: {
  messages: UIMessage[];
  busy: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
  onRetry: (message: UIMessage) => void;
}) {
  return (
    <div
      role="log"
      aria-label="Chat messages"
      aria-relevant="additions"
      className="flex flex-1 flex-col gap-3 overflow-y-auto p-4"
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          busy={busy}
          onRetry={() => onRetry(message)}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}

/** Renders the chat input form, stop control, and transport error message. */
export function LiveChatComposer({
  apiConfigured,
  busy,
  canSend,
  inputValue,
  error,
  onInputChange,
  onSubmit,
  onStop,
}: {
  apiConfigured: boolean;
  busy: boolean;
  canSend: boolean;
  inputValue: string;
  error?: Error;
  onInputChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
}) {
  return (
    <>
      {error ? (
        <p className="px-4 text-xs text-destructive" role="alert">
          {error.message}
        </p>
      ) : null}

      <div className="border-t p-4">
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              name="accessibility-chat-message"
              placeholder={
                apiConfigured
                  ? "Ask about accessibility and this PoC…"
                  : "Configure OpenRouter to enable chat"
              }
              value={inputValue}
              onChange={(event) => onInputChange(event.target.value)}
              className="flex-1"
              disabled={!apiConfigured || busy}
              autoComplete="off"
              aria-label="Message to accessibility assistant"
            />
            {busy ? (
              <Button
                type="button"
                variant="outline"
                onClick={onStop}
                aria-label="Stop generating"
              >
                Stop
              </Button>
            ) : null}
            <Button type="submit" disabled={!canSend} aria-busy={busy}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

/** Wraps chat panel content in the shared right-side sheet layout. */
export function LiveChatContent({ children }: { children: React.ReactNode }) {
  return (
    <SheetContent
      side="right"
      showCloseButton
      className="flex flex-col sm:max-w-[24rem]"
    >
      {children}
    </SheetContent>
  );
}
