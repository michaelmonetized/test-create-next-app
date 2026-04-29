/**
 * App Components Components Page public module surface.
 */
import Layout from "@/components/ui/layout";
import { AppSidebar } from "@/components/ui/layout/sidebar";
import { ComponentsHeader, sections } from "./components-shell";
import { ActionsSection } from "./sections/actions-section";
import { AdvancedSection } from "./sections/advanced-section";
import { DataDisplaySection } from "./sections/data-display-section";
import { FormsSection } from "./sections/forms-section";
import { NavigationSection } from "./sections/navigation-section";
import { OverlaysSection } from "./sections/overlays-section";

export default function ShadcnPage() {
  return (
    <Layout variant="sidebar" className="relative">
      <AppSidebar sections={sections} />
      <div className="flex flex-col place-items-stretch place-content-stretch w-full *:p-md *:w-full *:grow">
        <ComponentsHeader />
        <main className="space-y-10" id="main">
          <ActionsSection />
          <NavigationSection />
          <FormsSection />
          <DataDisplaySection />
          <OverlaysSection />
          <AdvancedSection />
        </main>
      </div>
    </Layout>
  );
}
