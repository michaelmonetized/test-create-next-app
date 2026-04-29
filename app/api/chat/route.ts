/**
 * App Api Chat Route public module surface.
 */
import { handleAccessibilityChatPost } from "@/lib/openrouter-chat";

export const maxDuration = 60;

export const POST = handleAccessibilityChatPost;
