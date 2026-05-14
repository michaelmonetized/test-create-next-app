/**
 * Components Marketing Live Chat Panel State public module surface.
 */
"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import * as React from "react";
import {
  getMessageText,
  retryAssistantMessage,
  retryUserMessage,
} from "@/components/marketing/live-chat-message";
import {
  loadAccessibilityChatFromStorage,
  saveAccessibilityChatToStorage,
} from "@/lib/accessibility-chat-storage";

const CHAT_ID = "layout-accessibility-chat";

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome-accessibility",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi - I'm your accessibility guide for this proof-of-concept. Ask about WCAG-minded patterns, keyboard and focus, semantic HTML, ARIA, contrast and color tokens, reduced motion, or how Tailwind, shadcn-style UI, and Catppuccin-inspired theming show up here. What would you like to explore?",
      },
    ],
  },
];

/** Manages transport, persistence, retry, and submit state for the accessibility chat. */
export function useLiveChatPanelState({
  apiConfigured,
}: {
  apiConfigured: boolean;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [storageReady, setStorageReady] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const transport = React.useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const {
    messages,
    sendMessage,
    setMessages,
    regenerate,
    status,
    error,
    stop,
  } = useChat({
    id: CHAT_ID,
    transport,
    messages: INITIAL_MESSAGES,
  });

  React.useEffect(() => {
    const stored = loadAccessibilityChatFromStorage();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
    setStorageReady(true);
  }, [setMessages]);

  React.useEffect(() => {
    if (!storageReady) return;
    const t = window.setTimeout(() => {
      saveAccessibilityChatToStorage(messages);
    }, 300);
    return () => window.clearTimeout(t);
  }, [messages, storageReady]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const busy = status === "submitted" || status === "streaming";
  const handleRetry = useLiveChatRetry({
    messages,
    regenerate,
    sendMessage,
    setMessages,
  });
  const handleSubmit = useLiveChatSubmit({
    apiConfigured,
    busy,
    inputValue,
    sendMessage,
    setInputValue,
  });
  const canSend = apiConfigured && !busy && inputValue.trim().length > 0;

  return {
    busy,
    canSend,
    error,
    handleRetry,
    handleSubmit,
    inputValue,
    messages,
    messagesEndRef,
    setInputValue,
    stop,
  };
}

function useLiveChatRetry({
  messages,
  regenerate,
  sendMessage,
  setMessages,
}: Pick<
  ReturnType<typeof useChat>,
  "messages" | "regenerate" | "sendMessage" | "setMessages"
>) {
  return React.useCallback(
    async (message: UIMessage) => {
      if (message.role === "assistant") {
        await retryAssistantMessage(message.id, regenerate);
        return;
      }

      const idx = messages.findIndex((m) => m.id === message.id);
      if (idx < 0) return;
      const text = getMessageText(message);
      if (!text.trim()) return;

      const prior = messages.slice(0, idx);
      setMessages(prior);
      await retryUserMessage(text, messages, sendMessage, setMessages);
    },
    [messages, regenerate, sendMessage, setMessages],
  );
}

function useLiveChatSubmit({
  apiConfigured,
  busy,
  inputValue,
  sendMessage,
  setInputValue,
}: {
  apiConfigured: boolean;
  busy: boolean;
  inputValue: string;
  sendMessage: ReturnType<typeof useChat>["sendMessage"];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const text = inputValue.trim();
      if (!text || !apiConfigured || busy) return;
      setInputValue("");
      try {
        await sendMessage({ text });
      } catch {
        setInputValue(text);
      }
    },
    [apiConfigured, busy, inputValue, sendMessage, setInputValue],
  );
}
