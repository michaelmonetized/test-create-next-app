/**
 * Components Accessibility Back To Top public module surface.
 */
"use client";

import { CaretLineUpIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  return (
    <Button
      asChild
      variant={"default"}
      size={"icon-lg"}
      className="rounded-md fixed z-9090 bottom-md right-md"
    >
      <a href="#top" title="Back to top">
        <span className="sr-only focus:not-sr-only">Back to top</span>
        <CaretLineUpIcon />
      </a>
    </Button>
  );
}
