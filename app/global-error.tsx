/**
 * App Global Error public module surface.
 */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    void error;
  }, [error]);

  return (
    <div>
      <h1>{"We're still working on this feature…"}</h1>
      <h2>{"Check back later"}</h2>
      <p>
        <Button onClick={() => reset()}>Try Again</Button>
        <Button onClick={() => router.back()}>or Go Back</Button>
      </p>
    </div>
  );
}
