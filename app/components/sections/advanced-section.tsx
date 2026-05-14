/**
 * App Components Sections Advanced Section public module surface.
 */
import { DemoCard, PageSection } from "../components-shell";
import CarouselExample from "../examples/carousel";
import ChartExample from "../examples/chart";
import DirectionExample from "../examples/direction";
import ProgressSpinnerToastExample from "../examples/progress-spinner-toast";

export function AdvancedSection() {
  return (
    <PageSection
      id="advanced"
      title="Advanced"
      description="State-heavy and con components."
    >
      <div className="grid gap-4 xl:grid-cols-2 xl:[&>*:last-child:nth-child(odd)]:col-span-full">
        <DemoCard title="Chart">
          <ChartExample />
        </DemoCard>
        <DemoCard title="Carousel">
          <CarouselExample />
        </DemoCard>
        <DemoCard title="Direction provider">
          <DirectionExample />
        </DemoCard>
        <DemoCard title="Progress, spinner, and toast">
          <ProgressSpinnerToastExample />
        </DemoCard>
      </div>
    </PageSection>
  );
}
