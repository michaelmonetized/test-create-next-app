/**
 * App Components Sections Data Display Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import AccordionExample from "../examples/accordion";
import AlertExample from "../examples/alert";
import AspectRatioExample from "../examples/aspect-ratio";
import AvatarExample from "../examples/avatar";
import CardExample from "../examples/card";
import CollapsibleExample from "../examples/collapsible";
import EmptySkeletonExample from "../examples/empty-skeleton";
import ItemExample from "../examples/item";
import ResizableExample from "../examples/resizable";
import ScrollAreaExample from "../examples/scroll-area";
import TableExample from "../examples/table";
import TabsExample from "../examples/tabs";

export function DataDisplaySection() {
  return (
    <PageSection
      id="data-display"
      title="Data Display"
      description="Cards, tables, list items, structural layout primitives, and display helpers."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard title="Card">
          <CardExample />
        </DemoCard>
        <DemoCard title="Alert variants">
          <AlertExample />
        </DemoCard>
        <DemoCard title="Avatar">
          <AvatarExample />
        </DemoCard>
        <DemoCard title="Item">
          <ItemExample />
        </DemoCard>
        <DemoCard title="Accordion and collapsible">
          <AccordionExample />
          <CollapsibleExample />
        </DemoCard>
        <DemoCard title="Tabs">
          <TabsExample />
        </DemoCard>
        <DemoCard title="Aspect ratio">
          <AspectRatioExample />
        </DemoCard>
        <DemoCard title="Table">
          <TableExample />
        </DemoCard>
        <DemoCard title="Scroll area and separator">
          <ScrollAreaExample />
        </DemoCard>
        <DemoCard title="Resizable">
          <ResizableExample />
        </DemoCard>
        <DemoCard title="Empty and skeleton">
          <EmptySkeletonExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
