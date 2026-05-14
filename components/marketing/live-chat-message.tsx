/**
 * Components Marketing Live Chat Message public module surface.
 */
"use client";

import { ArrowClockwiseIcon, CopySimpleIcon } from "@phosphor-icons/react";
import type { UIMessage } from "ai";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Concatenates text parts from an AI SDK UI message for display and retry actions. */
export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text",
    )
    .map((part) => part.text)
    .join("");
}

async function copyMessageText(text: string) {
  if (!text.trim()) {
    toast.error("Nothing to copy yet.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch {
    toast.error("Could not copy");
  }
}

function MessageAvatar({ isAssistant }: { isAssistant: boolean }) {
  return (
    <Avatar size="sm">
      <AvatarFallback
        className={cn(
          "text-[10px] font-bold",
          isAssistant
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
        aria-hidden
      >
        {isAssistant ? "A11y" : "You"}
      </AvatarFallback>
    </Avatar>
  );
}

function MessageContent({
  content,
  busy,
  isAssistant,
  isStreaming,
}: {
  content: string;
  busy: boolean;
  isAssistant: boolean;
  isStreaming: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-[min(100%,18rem)] rounded-none px-3 py-2 text-xs leading-relaxed",
        isAssistant
          ? "bg-muted text-foreground"
          : "bg-primary text-primary-foreground",
      )}
    >
      <p className="whitespace-pre-wrap wrap-break-word">{content}</p>
      {busy ? <TypingDots /> : null}
      {isStreaming ? (
        <p className="whitespace-pre-wrap wrap-break-word">
          <span className="sr-only">Assistant is still typing.</span>
        </p>
      ) : null}
    </div>
  );
}

function TypingDots() {
  return (
    <p className="whitespace-pre-wrap wrap-break-word">
      <span className="flex gap-2">
        <span className="block animate-bounce">&bull;</span>
        <span className="block animate-bounce delay-75">&bull;</span>
        <span className="block animate-bounce delay-150">&bull;</span>
      </span>
    </p>
  );
}

function MessageActions({
  content,
  isAssistant,
  canRetry,
  onRetry,
}: {
  content: string;
  isAssistant: boolean;
  canRetry: boolean;
  onRetry: () => void | Promise<void>;
}) {
  return (
    <div
      className={cn(
        "flex gap-1",
        isAssistant ? "ml-8" : "mr-8 flex-row-reverse",
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        aria-label={
          isAssistant ? "Copy assistant message" : "Copy your message"
        }
        disabled={!content.trim()}
        onClick={() => void copyMessageText(content)}
      >
        <CopySimpleIcon className="size-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        aria-label={
          isAssistant ? "Regenerate assistant reply" : "Resend this message"
        }
        disabled={!canRetry}
        onClick={() => void onRetry()}
      >
        <ArrowClockwiseIcon className="size-4" aria-hidden />
      </Button>
    </div>
  );
}

/** Displays one user or assistant chat message with copy and retry controls. */
export function MessageBubble({
  message,
  busy,
  onRetry,
}: {
  message: UIMessage;
  busy: boolean;
  onRetry: () => void | Promise<void>;
}) {
  const isAssistant = message.role === "assistant";
  const content = getMessageText(message);
  const isStreaming =
    isAssistant &&
    message.parts.some((p) => p.type === "text" && p.state === "streaming");
  const canRetry = !busy && !isStreaming && content.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isAssistant ? "items-start" : "items-end",
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2",
          isAssistant ? "flex-row" : "flex-row-reverse",
        )}
      >
        <MessageAvatar isAssistant={isAssistant} />
        <MessageContent
          content={content}
          busy={busy}
          isAssistant={isAssistant}
          isStreaming={isStreaming}
        />
      </div>

      <MessageActions
        content={content}
        isAssistant={isAssistant}
        canRetry={canRetry}
        onRetry={onRetry}
      />
    </div>
  );
}

/** Regenerates an assistant response and reports retry failures to the user. */
export async function retryAssistantMessage(
  messageId: string,
  regenerate: (options?: { messageId?: string }) => Promise<void>,
) {
  try {
    await regenerate({ messageId });
  } catch {
    toast.error("Could not regenerate reply");
  }
}

/** Replays a user message after restoring the conversation to its prior state on failure. */
export async function retryUserMessage(
  text: string,
  previousMessages: UIMessage[],
  sendMessage: (message: { text: string }) => Promise<void>,
  setMessages: (messages: UIMessage[]) => void,
) {
  try {
    await sendMessage({ text });
  } catch {
    setMessages(previousMessages);
    toast.error("Could not resend message");
  }
}
