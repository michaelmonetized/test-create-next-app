/**
 * App Components Examples Calendar Views public module surface.
 */
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DAYS,
  getWeekDates,
  HOURS,
  isSameDay,
  MonthGrid,
  WeekRangeLabel,
} from "./date-picker-shared";

export function DayView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const today = new Date();

  function shift(days: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    onDateChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => shift(-1)}>
          ←
        </Button>
        <span className="text-sm font-medium">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          {isSameDay(date, today) && (
            <Badge variant="secondary" className="ml-2">
              Today
            </Badge>
          )}
        </span>
        <Button variant="ghost" size="xs" onClick={() => shift(1)}>
          →
        </Button>
      </div>
      <div className="max-h-64 space-y-px overflow-y-auto border">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="flex items-center border-b last:border-b-0 hover:bg-muted/50"
          >
            <div className="w-14 shrink-0 px-2 py-2 text-right text-xs text-muted-foreground">
              {hour > 12 ? hour - 12 : hour}
              {hour >= 12 ? "pm" : "am"}
            </div>
            <div className="min-h-8 flex-1 border-l px-2 py-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeekView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const week = getWeekDates(date);
  const today = new Date();

  function shift(weeks: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + weeks * 7);
    onDateChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => shift(-1)}>
          ←
        </Button>
        <WeekRangeLabel week={week} />
        <Button variant="ghost" size="xs" onClick={() => shift(1)}>
          →
        </Button>
      </div>
      <div className="overflow-x-auto border">
        <div className="grid min-w-[28rem] grid-cols-[3.5rem_repeat(7,1fr)]">
          <div className="border-b px-1 py-1.5" />
          {week.map((date, index) => (
            <div
              key={date.toISOString()}
              className={`border-b border-l px-1 py-1.5 text-center text-xs font-medium ${
                isSameDay(date, today)
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              <div>{DAYS[index]}</div>
              <div>{date.getDate()}</div>
            </div>
          ))}
          {HOURS.slice(0, 8).map((hour) => (
            <React.Fragment key={hour}>
              <div className="border-b px-1 py-1.5 text-right text-xs text-muted-foreground">
                {hour > 12 ? hour - 12 : hour}
                {hour >= 12 ? "p" : "a"}
              </div>
              {week.map((date) => (
                <div
                  key={date.toISOString()}
                  className="min-h-7 border-b border-l hover:bg-muted/50"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export function YearView({
  date,
  onDateChange,
}: {
  date: Date;
  onDateChange: (d: Date) => void;
}) {
  const [year, setYear] = React.useState(date.getFullYear());

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => setYear((y) => y - 1)}>
          ←
        </Button>
        <span className="text-sm font-medium">{year}</span>
        <Button variant="ghost" size="xs" onClick={() => setYear((y) => y + 1)}>
          →
        </Button>
      </div>
      <MonthGrid
        selectedDate={date}
        year={year}
        onSelect={(month) => onDateChange(new Date(year, month, 1))}
      />
    </div>
  );
}
