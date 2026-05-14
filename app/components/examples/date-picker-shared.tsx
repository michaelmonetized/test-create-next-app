/**
 * App Components Examples Date Picker Shared public module surface.
 */
"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const HOURS = Array.from({ length: 14 }, (_, i) => i + 7);

export function getWeekDates(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export function WeekRangeLabel({ week }: { week: Date[] }) {
  return (
    <span className="text-sm font-medium">
      {week[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      {" – "}
      {week[6].toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </span>
  );
}

export function MonthGrid({
  selectedDate,
  year,
  onSelect,
}: {
  selectedDate: Date;
  year: number;
  onSelect: (month: number) => void;
}) {
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-2">
      {MONTHS.map((month, i) => {
        const isCurrentMonth =
          i === today.getMonth() && year === today.getFullYear();
        const isSelected =
          i === selectedDate.getMonth() && year === selectedDate.getFullYear();
        return (
          <Button
            key={month}
            variant={
              isSelected ? "default" : isCurrentMonth ? "secondary" : "outline"
            }
            size="sm"
            className="w-full"
            onClick={() => onSelect(i)}
          >
            {month}
          </Button>
        );
      })}
    </div>
  );
}

export function WeekDateButtons({
  week,
  selectedDate,
  className,
  renderLabel,
  size = "sm",
  onSelect,
}: {
  week: Date[];
  selectedDate: Date | undefined;
  className: string;
  renderLabel: (date: Date, index: number) => ReactNode;
  size?: "icon" | "sm";
  onSelect: (date: Date) => void;
}) {
  const today = new Date();

  return week.map((date, index) => {
    const isToday = isSameDay(date, today);
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

    return (
      <Button
        key={date.toISOString()}
        type="button"
        variant={isSelected ? "default" : isToday ? "secondary" : "ghost"}
        size={size}
        className={className}
        onClick={() => onSelect(date)}
      >
        {renderLabel(date, index)}
      </Button>
    );
  });
}
