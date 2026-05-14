import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import type { UIMessage } from "ai";
import {
  loadAccessibilityChatFromStorage,
  saveAccessibilityChatToStorage,
} from "./accessibility-chat-storage";

const STORAGE_KEY = "accessibility-chat:layout-accessibility-chat";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

function defineWindow(value: unknown) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value,
  });
}

function defineLocalStorage(value: unknown) {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value,
  });
}

function textMessage(
  id: string,
  role: "user" | "assistant",
  text: string,
  state?: "streaming" | "done",
): UIMessage {
  return {
    id,
    role,
    parts: [{ type: "text", text, ...(state ? { state } : {}) }],
  };
}

describe("accessibility chat storage", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
    defineWindow({});
    defineLocalStorage(storage);
  });

  afterEach(() => {
    storage.clear();
    Reflect.deleteProperty(globalThis, "window");
    Reflect.deleteProperty(globalThis, "localStorage");
  });

  test("returns null when running without a browser window", () => {
    Reflect.deleteProperty(globalThis, "window");

    expect(loadAccessibilityChatFromStorage()).toBeNull();

    saveAccessibilityChatToStorage([textMessage("1", "user", "Hello")]);
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });

  test("persists messages and normalizes streaming text parts", () => {
    saveAccessibilityChatToStorage([
      textMessage("user-1", "user", "Audit this layout"),
      textMessage("assistant-1", "assistant", "Working on it", "streaming"),
    ]);

    expect(JSON.parse(storage.getItem(STORAGE_KEY) ?? "null")).toEqual([
      {
        id: "user-1",
        role: "user",
        parts: [{ type: "text", text: "Audit this layout" }],
      },
      {
        id: "assistant-1",
        role: "assistant",
        parts: [{ type: "text", text: "Working on it", state: "done" }],
      },
    ]);
  });

  test("loads only valid stored user and assistant text messages", () => {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: "user-1",
          role: "user",
          parts: [
            { type: "text", text: "Check focus states", state: "done" },
            { type: "tool-call", text: "ignored" },
          ],
        },
        {
          id: "system-1",
          role: "system",
          parts: [{ type: "text", text: "ignored" }],
        },
        {
          id: "assistant-1",
          role: "assistant",
          parts: [{ type: "text", text: "Looks good" }],
        },
        { id: 42, role: "user", parts: [{ type: "text", text: "ignored" }] },
      ]),
    );

    expect(loadAccessibilityChatFromStorage()).toEqual([
      {
        id: "user-1",
        role: "user",
        parts: [{ type: "text", text: "Check focus states", state: "done" }],
      },
      {
        id: "assistant-1",
        role: "assistant",
        parts: [{ type: "text", text: "Looks good" }],
      },
    ]);
  });

  test("returns null for missing, malformed, or non-message payloads", () => {
    expect(loadAccessibilityChatFromStorage()).toBeNull();

    storage.setItem(STORAGE_KEY, "{bad json");
    expect(loadAccessibilityChatFromStorage()).toBeNull();

    storage.setItem(STORAGE_KEY, JSON.stringify({ id: "not-an-array" }));
    expect(loadAccessibilityChatFromStorage()).toBeNull();

    storage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: "empty", role: "user", parts: [] }]),
    );
    expect(loadAccessibilityChatFromStorage()).toBeNull();
  });

  test("ignores localStorage read and write failures", () => {
    defineLocalStorage({
      getItem() {
        throw new Error("read blocked");
      },
      setItem() {
        throw new Error("write blocked");
      },
    });

    expect(loadAccessibilityChatFromStorage()).toBeNull();
    expect(() =>
      saveAccessibilityChatToStorage([textMessage("1", "user", "Hello")]),
    ).not.toThrow();
  });
});
