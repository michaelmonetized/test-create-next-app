/**
 * App Components Sections Overlays Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import AlertDialogExample from "../examples/alert-dialog";
import DialogExample from "../examples/dialog";
import DrawerExample from "../examples/drawer";
import HoverCardTooltipExample from "../examples/hover-card-tooltip";
import PopoverExample from "../examples/popover";
import SheetExample from "../examples/sheet";

export function OverlaysSection() {
  return (
    <PageSection
      id="overlays"
      title="Overlays"
      description="Modal, transient, and contextual surfaces."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard title="Dialog">
          <DialogExample />
        </DemoCard>
        <DemoCard title="Alert dialog">
          <AlertDialogExample />
        </DemoCard>
        <DemoCard title="Drawer">
          <DrawerExample />
        </DemoCard>
        <DemoCard title="Sheet">
          <SheetExample />
        </DemoCard>
        <DemoCard title="Popover">
          <PopoverExample />
        </DemoCard>
        <DemoCard title="Hover card and tooltip">
          <HoverCardTooltipExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
