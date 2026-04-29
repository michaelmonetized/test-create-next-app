/**
 * App Tailwindcss Ssr Page public module surface.
 */
import { TailwindTokenMatrix } from "@/components/tailwindcss/token-matrix";

export default function TailwindCSSSsrPage() {
  return <TailwindTokenMatrix mode="ssr" />;
}
