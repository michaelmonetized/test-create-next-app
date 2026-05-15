/**
 * App Components Sections Navigation Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import BreadcrumbExample from "../examples/breadcrumb";
import CommandExample from "../examples/command";
import ContextMenuExample from "../examples/context-menu";
import DropdownMenuExample from "../examples/dropdown-menu";
import MenubarExample from "../examples/menubar";
import NavigationMenuExample from "../examples/navigation-menu";

export function NavigationSection() {
  return (
    <PageSection
      id="navigation"
      title="Navigation"
      description="Menus, breadcrumbs, command surfaces, and route affordances."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard title="Breadcrumb" description="Linear pathing with an overflow affordance.">
          <BreadcrumbExample />
        </DemoCard>

        <DemoCard
          title="Navigation menu"
          description="Inline navigation with viewport and indicator."
          className="overflow-visible"
        >
          <NavigationMenuExample />
        </DemoCard>

        <DemoCard title="Menubar" description="Desktop-style command menus.">
          <MenubarExample />
        </DemoCard>

        <DemoCard title="Dropdown menu" description="Contextual actions from a trigger button.">
          <DropdownMenuExample />
        </DemoCard>

        <DemoCard title="Context menu" description="Right-click or long-press the trigger area.">
          <ContextMenuExample />
        </DemoCard>

        <DemoCard title="Command" description="Inline command palette plus the dialog variant.">
          <CommandExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
