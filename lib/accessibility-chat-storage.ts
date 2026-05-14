/**
 * Lib Accessibility Chat Storage public module surface.
 */
import type { UIMessage } from "ai";
import { z } from "zod";

const ACCESSIBILITY_CHAT_STORAGE_KEY =
  "accessibility-chat:layout-accessibility-chat";

const storedTextPartSchema = z
  .object({
    type: z.literal("text"),
    text: z.string(),
    state: z.enum(["streaming", "done"]).optional(),
  })
  .passthrough();

const storedMessageSchema = z
  .object({
    id: z.string(),
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.unknown()),
  })
  .passthrough();

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

function parseStoredMessage(item: unknown): UIMessage[] {
  const result = storedMessageSchema.safeParse(item);
  if (!result.success) return [];

  const parts = result.data.parts.flatMap(parseStoredTextPart);
  return parts.length
    ? [{ id: result.data.id, role: result.data.role, parts }]
    : [];
}

function parseStoredTextPart(part: unknown): UIMessage["parts"] {
  const result = storedTextPartSchema.safeParse(part);
  return result.success ? [result.data] : [];
}

/** Loads the persisted accessibility chat transcript from browser storage. */
export function loadAccessibilityChatFromStorage(): UIMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredMessages(
      localStorage.getItem(ACCESSIBILITY_CHAT_STORAGE_KEY),
    );
  } catch {
    return null;
  }
}

/** Persists accessibility chat messages after normalizing transient streaming state. */
export function saveAccessibilityChatToStorage(messages: UIMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload = stripStreamingForStorage(messages);
    localStorage.setItem(
      ACCESSIBILITY_CHAT_STORAGE_KEY,
      JSON.stringify(payload),
    );
  } catch {
    // QuotaExceededError or private mode — ignore
  }
}
