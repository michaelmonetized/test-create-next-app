/**
 * App Components Sections Actions Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import BadgeVariantsExample from "../examples/badge-variants";
import ButtonGroupsExample from "../examples/button-groups";
import ButtonVariantsExample from "../examples/button-variants";
import KbdExample from "../examples/kbd";
import PaginationExample from "../examples/pagination";
import ToggleExample from "../examples/toggle";

export function ActionsSection() {
  return (
    <PageSection
      id="actions"
      title="Actions"
      description="Buttons, badges, toggles, grouping primitives, and keyboard affordances."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard
          title="Button variants and sizes"
          description="Every button variant and size shipped by the local component."
        >
          <ButtonVariantsExample />
        </DemoCard>

        <DemoCard
          title="Badge variants"
          description="Variant-bearing components should show their full range."
        >
          <BadgeVariantsExample />
        </DemoCard>

        <DemoCard
          title="Button groups"
          description="Horizontal, vertical, text, and grouped separators."
        >
          <ButtonGroupsExample />
        </DemoCard>

        <DemoCard
          title="Toggle and toggle group"
          description="Single-state and grouped toggles with variant coverage."
        >
          <ToggleExample />
        </DemoCard>

        <DemoCard
          title="Pagination"
          description="The full pagination component family."
        >
          <PaginationExample />
        </DemoCard>

        <DemoCard title="Kbd" description="Keyboard hint primitives.">
          <KbdExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
