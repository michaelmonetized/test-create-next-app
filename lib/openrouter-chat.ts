/**
 * Lib Openrouter Chat public module surface.
 */
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ACCESSIBILITY_CHAT_SYSTEM_PROMPT } from "@/lib/accessibility-chat-system-prompt";
import { resolveOpenRouterModelId } from "@/lib/openrouter-resolve-model";

function missingOpenRouterKeyResponse() {
  return Response.json(
    { error: "Server misconfiguration: OPENROUTER_API_KEY is not set." },
    { status: 503 },
  );
}

async function readChatMessages(req: Request): Promise<UIMessage[] | Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body as { messages?: UIMessage[] }).messages;
  if (!Array.isArray(messages)) {
    return Response.json(
      { error: "Expected messages array." },
      { status: 400 },
    );
  }
  return messages;
}

function getOpenRouterReferer(): string {
  if (process.env.OPENROUTER_HTTP_REFERER) {
    return process.env.OPENROUTER_HTTP_REFERER;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost";
}

async function streamOpenRouterChat(messages: UIMessage[], apiKey: string) {
  const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    headers: {
      "HTTP-Referer": getOpenRouterReferer(),
      "X-Title": "Accessibility demo chat",
    },
  });

  let modelId: string;
  try {
    modelId = await resolveOpenRouterModelId(openrouter);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Model resolution failed.";
    console.error("[openrouter]", message);
    return Response.json({ error: message }, { status: 503 });
  }

  const modelMessages = await convertToModelMessages(messages);
  const result = streamText({
    // Callable `openrouter(id)` uses the Responses API; OpenRouter only proxies chat completions.
    model: openrouter.chat(modelId),
    system: ACCESSIBILITY_CHAT_SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}

/** Handles the accessibility chat route by validating input and streaming an OpenRouter response. */
export async function handleAccessibilityChatPost(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return missingOpenRouterKeyResponse();
  }

  const messages = await readChatMessages(req);
  return messages instanceof Response
    ? messages
    : streamOpenRouterChat(messages, apiKey);
}
