/**
 * Components Date Year Inline public module surface.
 */
"use client";

export default function DateYearInline() {
  const date = new Date();
  return <>{date.getFullYear()}</>;
}
