/**
 * App Components Sections Forms Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import CalendarExample from "../examples/calendar";
import ComboboxExample from "../examples/combobox";
import DateInputExample from "../examples/date-input";
import DatetimeInputExample from "../examples/datetime-input";
import FieldExample from "../examples/field";
import InputGroupExample from "../examples/input-group";
import InputOtpExample from "../examples/input-otp";
import InputsExample from "../examples/inputs";
import SelectExample from "../examples/select";
import SelectionControlsExample from "../examples/selection-controls";
import SliderExample from "../examples/slider";
import TimeInputExample from "../examples/time-input";

export function FormsSection() {
  return (
    <PageSection
      id="forms"
      title="Forms"
      description="Field composition, native controls, higher-level selectors, and input ergonomics."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard
          title="Field"
          description="The field wrappers are the semantic spine of the form system."
        >
          <FieldExample />
        </DemoCard>
        <DemoCard title="Inputs and textareas">
          <InputsExample />
        </DemoCard>
        <DemoCard title="Input group">
          <InputGroupExample />
        </DemoCard>
        <DemoCard title="Selection controls">
          <SelectionControlsExample />
        </DemoCard>
        <DemoCard title="Select and native select">
          <SelectExample />
        </DemoCard>
        <DemoCard title="Input OTP">
          <InputOtpExample />
        </DemoCard>
        <DemoCard title="Combobox">
          <ComboboxExample />
        </DemoCard>
        <DemoCard title="Slider">
          <SliderExample />
        </DemoCard>
        <DemoCard title="Calendar">
          <CalendarExample />
        </DemoCard>
        <DemoCard title="Date input">
          <DateInputExample />
        </DemoCard>
        <DemoCard title="Time input">
          <TimeInputExample />
        </DemoCard>
        <DemoCard title="Datetime input">
          <DatetimeInputExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
