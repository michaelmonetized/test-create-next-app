/**
 * Lib Accessibility Chat Storage public module surface.
 */
import type { UIMessage } from "ai";

const ACCESSIBILITY_CHAT_STORAGE_KEY = "accessibility-chat:layout-accessibility-chat";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function parseTextParts(parts: unknown): UIMessage["parts"] | null {
  if (!Array.isArray(parts)) return null;
  const out = parts.flatMap(parseTextPart);
  return out.length ? out : null;
}

function isStoredTextPart(part: unknown): part is { text: string; state?: unknown; type: "text" } {
  return isRecord(part) && part.type === "text" && typeof part.text === "string";
}

function parseTextPart(part: unknown): UIMessage["parts"] {
  if (!isStoredTextPart(part)) return [];
  const textPart: { type: "text"; text: string; state?: "streaming" | "done" } = {
    type: "text",
    text: part.text,
  };
  if (part.state === "streaming" || part.state === "done") {
    textPart.state = part.state;
  }
  return [textPart];
}

/** Normalize messages for persistence (no in-flight streaming state). */
function stripStreamingForStorage(messages: UIMessage[]): UIMessage[] {
  return messages.map((m) => ({
    ...m,
    parts: m.parts.map((p) => {
      if (p.type === "text" && p.state === "streaming") {
        return { type: "text" as const, text: p.text, state: "done" as const };
      }
      return p;
    }),
  }));
}

function parseStoredMessages(raw: string | null): UIMessage[] | null {
  if (!raw) return null;
  const data = parseJson(raw);
  if (!Array.isArray(data)) return null;
  const out = data.flatMap(parseStoredMessage);
  return out.length ? out : null;
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function isStoredRole(role: unknown): role is "user" | "assistant" {
  return role === "user" || role === "assistant";
}

function getStoredMessageId(item: Record<string, unknown>): string | null {
  return typeof item.id === "string" ? item.id : null;
}

function parseStoredMessage(item: unknown): UIMessage[] {
  if (!isRecord(item)) return [];
  if (!isStoredRole(item.role)) return [];
  const id = getStoredMessageId(item);
  if (!id) return [];
  const parts = parseTextParts(item.parts);
  return parts ? [{ id, role: item.role, parts }] : [];
}

/** Loads the persisted accessibility chat transcript from browser storage. */
export function loadAccessibilityChatFromStorage(): UIMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredMessages(localStorage.getItem(ACCESSIBILITY_CHAT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Persists accessibility chat messages after normalizing transient streaming state. */
export function saveAccessibilityChatToStorage(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload = stripStreamingForStorage(messages);
    localStorage.setItem(ACCESSIBILITY_CHAT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // QuotaExceededError or private mode — ignore
  }
}
