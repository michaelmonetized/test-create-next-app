/**
 * App Components Examples Calendar public module surface.
 */
"use client";

import { Form } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
import { DayView, WeekView, YearView } from "./calendar-views";

type View = "day" | "week" | "month" | "year";

// ── Main example with form ──

const formSchema = z.object({
  date: z.date({ error: "Select a launch date." }),
});

export default function CalendarExample() {
  const [view, setView] = React.useState<View>("month");
  const [navDate, setNavDate] = React.useState(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: undefined },
  });

  const selectedDate = useWatch({ control: form.control, name: "date" });

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("date", date, {
        shouldValidate: form.formState.isSubmitted,
      });
      setNavDate(date);
    }
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Launch date set", {
      description: data.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  const views: View[] = ["day", "week", "month", "year"];

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <Button
              key={v}
              type="button"
              variant={view === v ? "default" : "outline"}
              size="xs"
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>

        <Separator />

        <Controller
          name="date"
          control={form.control}
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Launch date</FieldLabel>

              {view === "month" && (
                <Calendar
                  mode="single"
                  month={navDate}
                  onMonthChange={setNavDate}
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-none border"
                />
              )}

              {view === "day" && (
                <DayView date={navDate} onDateChange={setNavDate} />
              )}

              {view === "week" && (
                <WeekView date={navDate} onDateChange={setNavDate} />
              )}

              {view === "year" && (
                <YearView
                  date={navDate}
                  onDateChange={(d) => {
                    setNavDate(d);
                    setView("month");
                  }}
                />
              )}

              <FieldDescription>
                {selectedDate
                  ? `Selected: ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                  : "Choose when the campaign goes live."}
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit">Set launch date</Button>
      </div>
    </Form>
  );
}
