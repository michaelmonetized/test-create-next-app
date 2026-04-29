/**
 * Components Marketing Live Chat Panel public module surface.
 */
"use client";

import { useLiveChatPanelState } from "@/components/marketing/live-chat-panel-state";
import {
  LiveChatComposer,
  LiveChatContent,
  LiveChatHeader,
  LiveChatMessages,
  LiveChatTrigger,
} from "@/components/marketing/live-chat-panel-ui";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Renders the floating accessibility assistant chat panel. */
export default function LiveChat({
  className,
  apiConfigured = true,
}: {
  className?: string;
  apiConfigured?: boolean;
}) {
  const chat = useLiveChatPanelState({ apiConfigured });

  return (
    <div className={cn("fixed right-6 bottom-6 z-50", className)}>
      <Sheet>
        <LiveChatTrigger />
        <LiveChatContent>
          <LiveChatHeader apiConfigured={apiConfigured} />
          <LiveChatMessages
            messages={chat.messages}
            busy={chat.busy}
            endRef={chat.messagesEndRef}
            onRetry={(message) => void chat.handleRetry(message)}
          />
          <LiveChatComposer
            apiConfigured={apiConfigured}
            busy={chat.busy}
            canSend={chat.canSend}
            inputValue={chat.inputValue}
            error={chat.error}
            onInputChange={chat.setInputValue}
            onSubmit={chat.handleSubmit}
            onStop={chat.stop}
          />
        </LiveChatContent>
      </Sheet>
    </div>
  );
}
