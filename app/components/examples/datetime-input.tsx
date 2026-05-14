/**
 * App Components Examples Datetime Input public module surface.
 */
"use client";

import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  Controller,
  type ControllerFieldState,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  DAYS,
  formatTime,
  getWeekDates,
  HOURS,
  MonthGrid,
  WeekDateButtons,
  WeekRangeLabel,
} from "./date-picker-shared";

type DateView = "week" | "month" | "year";

const formSchema = z.object({
  date: z.date({ error: "Select a date and time." }),
});

export default function DatetimeInputExample() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [dateView, setDateView] = React.useState<DateView>("week");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: undefined },
  });
  const [navDate, setNavDate] = React.useState(new Date());

  const selectedDate = form.watch("date");

  function handleDateSelect(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    form.setValue("date", d, { shouldValidate: form.formState.isSubmitted });
    setNavDate(d);
    setStep(2);
  }

  function handleTimeSelect(h: number, m: number) {
    const current = form.getValues("date");
    if (!current) return;
    const d = new Date(current);
    d.setHours(h, m, 0, 0);
    form.setValue("date", d, { shouldValidate: form.formState.isSubmitted });
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Date and time confirmed", {
      description:
        data.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
        " at " +
        data.date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
    });
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={step === 1 ? "default" : "outline"}
            size="xs"
            onClick={() => setStep(1)}
          >
            1. Date
          </Button>
          <span className="text-muted-foreground">/</span>
          <Button
            type="button"
            variant={step === 2 ? "default" : "outline"}
            size="xs"
            onClick={() => {
              if (selectedDate) setStep(2);
            }}
          >
            2. Time
          </Button>
        </div>

        <Separator />

        <Controller
          name="date"
          control={form.control}
          render={({ fieldState }) => (
            <DateTimeField
              dateView={dateView}
              fieldState={fieldState}
              navDate={navDate}
              selectedDate={selectedDate}
              step={step}
              onDateSelect={handleDateSelect}
              onDateViewChange={setDateView}
              onNavDateChange={setNavDate}
              onStepChange={setStep}
              onTimeSelect={handleTimeSelect}
            />
          )}
        />

        <Button type="submit">Confirm date and time</Button>
      </div>
    </Form>
  );
}

function DateTimeField({
  dateView,
  fieldState,
  navDate,
  selectedDate,
  step,
  onDateSelect,
  onDateViewChange,
  onNavDateChange,
  onStepChange,
  onTimeSelect,
}: {
  dateView: DateView;
  fieldState: ControllerFieldState;
  navDate: Date;
  selectedDate: Date | undefined;
  step: 1 | 2;
  onDateSelect: (date: Date) => void;
  onDateViewChange: (view: DateView) => void;
  onNavDateChange: (date: Date) => void;
  onStepChange: (step: 1 | 2) => void;
  onTimeSelect: (hour: number, minute: number) => void;
}) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>Date and time</FieldLabel>
      {step === 1 ? (
        <DateSelectionStep
          dateView={dateView}
          navDate={navDate}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onDateViewChange={onDateViewChange}
          onNavDateChange={onNavDateChange}
        />
      ) : null}
      {step === 2 && selectedDate ? (
        <TimeSelectionStep
          selectedDate={selectedDate}
          onBack={() => onStepChange(1)}
          onTimeSelect={onTimeSelect}
        />
      ) : null}
      <FieldDescription>
        {formatSelectedDateTime(selectedDate)}
      </FieldDescription>
      {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  );
}

function DateSelectionStep({
  dateView,
  navDate,
  selectedDate,
  onDateSelect,
  onDateViewChange,
  onNavDateChange,
}: {
  dateView: DateView;
  navDate: Date;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  onDateViewChange: (view: DateView) => void;
  onNavDateChange: (date: Date) => void;
}) {
  return (
    <div className="space-y-3">
      <DateViewToggle view={dateView} onViewChange={onDateViewChange} />
      {dateView === "week" ? (
        <WeekDatePicker
          navDate={navDate}
          selectedDate={selectedDate}
          onNavChange={onNavDateChange}
          onSelect={onDateSelect}
        />
      ) : null}
      {dateView === "month" ? (
        <MonthDatePicker
          navDate={navDate}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onDateViewChange={onDateViewChange}
          onNavDateChange={onNavDateChange}
        />
      ) : null}
      {dateView === "year" ? (
        <YearDatePicker
          navDate={navDate}
          onSelect={(date) => {
            onNavDateChange(date);
            onDateViewChange("month");
          }}
        />
      ) : null}
    </div>
  );
}

function DateViewToggle({
  view,
  onViewChange,
}: {
  view: DateView;
  onViewChange: (view: DateView) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(["week", "month", "year"] as DateView[]).map((option) => (
        <Button
          key={option}
          type="button"
          variant={view === option ? "default" : "outline"}
          size="xs"
          onClick={() => onViewChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </div>
  );
}

function MonthDatePicker({
  navDate,
  selectedDate,
  onDateSelect,
  onDateViewChange,
  onNavDateChange,
}: {
  navDate: Date;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  onDateViewChange: (view: DateView) => void;
  onNavDateChange: (date: Date) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => onDateViewChange("year")}
        >
          {navDate.toLocaleDateString("en-US", { month: "long" })}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => onDateViewChange("year")}
        >
          {navDate.getFullYear()}
        </Button>
      </div>
      <Calendar
        mode="single"
        month={navDate}
        onMonthChange={onNavDateChange}
        selected={selectedDate}
        onSelect={(date) => {
          if (date) onDateSelect(date);
        }}
        className="rounded-none border"
      />
    </div>
  );
}

function TimeSelectionStep({
  selectedDate,
  onBack,
  onTimeSelect,
}: {
  selectedDate: Date;
  onBack: () => void;
  onTimeSelect: (hour: number, minute: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={onBack}>
          &larr; Back to date
        </Button>
        <span className="text-sm font-medium">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="max-h-72 space-y-px overflow-y-auto border">
        {HOURS.map((hour) =>
          [0, 30].map((minute) => (
            <TimeOption
              key={`${hour}-${minute}`}
              hour={hour}
              minute={minute}
              selectedDate={selectedDate}
              onSelect={onTimeSelect}
            />
          )),
        )}
      </div>
    </div>
  );
}

function TimeOption({
  hour,
  minute,
  selectedDate,
  onSelect,
}: {
  hour: number;
  minute: number;
  selectedDate: Date;
  onSelect: (hour: number, minute: number) => void;
}) {
  const highlighted =
    hasSelectedTime(selectedDate) && isSelectedTime(selectedDate, hour, minute);
  return (
    <Button
      type="button"
      variant={highlighted ? "default" : "ghost"}
      size="sm"
      className="w-full justify-start rounded-none border-b last:border-b-0"
      onClick={() => onSelect(hour, minute)}
    >
      {formatTime(hour, minute)}
    </Button>
  );
}

function hasSelectedTime(date: Date) {
  return date.getHours() !== 0 || date.getMinutes() !== 0;
}

function isSelectedTime(date: Date, hour: number, minute: number) {
  return date.getHours() === hour && date.getMinutes() === minute;
}

function formatSelectedDateTime(date: Date | undefined) {
  if (!date) return "Pick a date, then choose a time.";
  const dateText = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  if (!hasSelectedTime(date)) return `${dateText} — select a time`;
  return `${dateText} at ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

// ── Week date picker ──

function WeekDatePicker({
  navDate,
  selectedDate,
  onNavChange,
  onSelect,
}: {
  navDate: Date;
  selectedDate: Date | undefined;
  onNavChange: (d: Date) => void;
  onSelect: (d: Date) => void;
}) {
  const week = getWeekDates(navDate);

  function shift(weeks: number) {
    const d = new Date(navDate);
    d.setDate(d.getDate() + weeks * 7);
    onNavChange(d);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="xs"
          type="button"
          onClick={() => shift(-1)}
        >
          &larr;
        </Button>
        <WeekRangeLabel week={week} />
        <Button
          variant="ghost"
          size="xs"
          type="button"
          onClick={() => shift(1)}
        >
          &rarr;
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        <WeekDateButtons
          week={week}
          selectedDate={selectedDate}
          className="flex h-auto flex-col gap-0 px-1 py-2"
          renderLabel={(date, index) => (
            <>
              <span className="text-[0.65rem] uppercase">{DAYS[index]}</span>
              <span className="text-sm font-medium">{date.getDate()}</span>
            </>
          )}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}

// ── Year date picker (12 month grid) ──

function YearDatePicker({
  navDate,
  onSelect,
}: {
  navDate: Date;
  onSelect: (d: Date) => void;
}) {
  const [year, setYear] = React.useState(navDate.getFullYear());

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="xs"
          type="button"
          onClick={() => setYear((y) => y - 1)}
        >
          &larr;
        </Button>
        <span className="text-sm font-medium">{year}</span>
        <Button
          variant="ghost"
          size="xs"
          type="button"
          onClick={() => setYear((y) => y + 1)}
        >
          &rarr;
        </Button>
      </div>
      <MonthGrid
        selectedDate={navDate}
        year={year}
        onSelect={(month) => onSelect(new Date(year, month, 1))}
      />
    </div>
  );
}
