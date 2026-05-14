/**
 * App Components Components Shell public module surface.
 */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const sections: [string, string][] = [
  ["Actions", "actions"],
  ["Navigation", "navigation"],
  ["Forms", "forms"],
  ["Data Display", "data-display"],
  ["Overlays", "overlays"],
  ["Advanced", "advanced"],
];

export function ComponentsHeader() {
  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>shadcn/ui</Badge>
        <Badge variant="secondary">Kitchen Sink</Badge>
        <Badge variant="outline">Radix + Base UI</Badge>
      </div>
      <div className="space-y-2">
        <h1>Completely WCAG Compliant shadcn Kitchen Sink</h1>
        <p>
          A dense reference page for every installed `components/ui/*.tsx`
          primitive in this repo, grouped by how you actually reach for them in
          product work.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
          <CardDescription>
            Each section uses only the local shadcn components in this codebase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <nav>
            <ul>
              {sections.map(([, id], index) => (
                <li key={id}>
                  <a href={`#${id}`}>{sections[index][0]}</a>
                </li>
              ))}
            </ul>
          </nav>
        </CardContent>
      </Card>
    </header>
  );
}

export function PageSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-black">{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function DemoCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
