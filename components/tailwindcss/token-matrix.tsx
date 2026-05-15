/**
 * Components Tailwindcss Token Matrix public module surface.
 */
import {
  animationClasses,
  aspectClasses,
  blockSizeClasses,
  colorClasses,
  containerClasses,
  fontClasses,
  inlineSizeClasses,
  radiusClasses,
  spacingClasses,
  textSizeClasses,
} from "@/lib/tailwind-token-matrix";

type TailwindTokenMatrixProps = {
  mode: "client" | "ssr";
};

function TokenSection({
  children,
  eyebrow,
  id,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="scroll-mt-xl rounded-3xl border border-border bg-card p-lg shadow-lg shadow-primary/10"
      id={id}
    >
      <div className="mb-md flex flex-wrap items-end justify-between gap-md">
        <div>
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-wide">
            {eyebrow}
          </p>
          <h2 className="font-serif text-2x text-card-foreground" id={`${id}-title`}>
            {title}
          </h2>
        </div>
        <a
          className="rounded-full border border-border px-md py-sm text-sm text-primary hover:bg-primary hover:text-primary-foreground"
          href="#top"
        >
          Back to top
        </a>
      </div>
      {children}
    </section>
  );
}

function ColorMatrix() {
  return (
    <div className="grid gap-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {colorClasses.map((token) => (
        <article
          className="rounded-xl border border-border bg-muted p-sm shadow-sm"
          key={token.name}
        >
          <div className="mb-sm flex items-center gap-sm">
            <div
              className={`h-xl w-xl rounded-lg border border-border ring-2 ${token.bg} ${token.ring}`}
            />
            <div className="min-w-0">
              <h3 className="truncate font-mono text-xs text-foreground">{token.name}</h3>
              <p className={`truncate text-xs ${token.text}`}>text-{token.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-xs text-[0.65rem]">
            <span className={`rounded-md border px-xs py-xs ${token.border}`}>border</span>
            <span className={`rounded-md px-xs py-xs shadow-md ${token.shadow}`}>shadow</span>
            <span className={`rounded-md px-xs py-xs ${token.bg}`}>bg</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function TypeMatrix() {
  return (
    <div className="space-y-lg">
      <div className="grid gap-md md:grid-cols-3">
        {fontClasses.map((className) => (
          <article
            className={`rounded-2xl border border-border bg-muted p-md ${className}`}
            key={className}
          >
            <p className="font-mono text-xs text-muted-foreground">{className}</p>
            <p>The quick brown fox ships production code.</p>
          </article>
        ))}
      </div>
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {textSizeClasses.map((className) => (
          <article className="rounded-2xl border border-border p-md" key={className}>
            <p className="font-mono text-xs text-muted-foreground">{className}</p>
            <p className={`font-sans ${className}`}>Aa</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SpacingMatrix() {
  return (
    <div className="space-y-lg">
      {spacingClasses.map((token) => (
        <article className="rounded-2xl border border-border bg-muted p-md" key={token.name}>
          <h3 className="mb-sm font-mono text-sm text-foreground">spacing {token.name}</h3>
          <div className="grid gap-md lg:grid-cols-2">
            <div className="rounded-xl bg-background p-sm">
              <p className="mb-xs text-xs text-muted-foreground">padding + margin</p>
              <div className={`border border-primary bg-primary/10 ${token.padding.join(" ")}`}>
                <div
                  className={`border border-secondary bg-secondary/20 text-xs ${token.margin.join(" ")}`}
                >
                  {token.padding[0]} / {token.margin[0]}
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-background p-sm">
              <p className="mb-xs text-xs text-muted-foreground">gap + space + inset</p>
              <div className={`mb-sm grid grid-cols-3 ${token.gap.join(" ")}`}>
                <span className="rounded bg-accent p-xs text-xs">A</span>
                <span className="rounded bg-accent p-xs text-xs">B</span>
                <span className="rounded bg-accent p-xs text-xs">C</span>
              </div>
              <div className={`mb-sm flex ${token.space.join(" ")}`}>
                <span className="rounded bg-success p-xs text-xs">X</span>
                <span className="rounded bg-success p-xs text-xs">Y</span>
              </div>
              <div className="relative h-24 rounded-lg border border-border">
                <div
                  className={`absolute rounded bg-destructive/20 text-[0.6rem] ${token.inset.join(" ")}`}
                >
                  {token.inset[0]}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function SizeMatrix() {
  return (
    <div className="grid gap-lg lg:grid-cols-2">
      <div className="space-y-sm">
        <h3 className="font-mono text-sm text-muted-foreground">Inline sizing</h3>
        {inlineSizeClasses.map((className) => (
          <div className="rounded-lg border border-border p-xs" key={className}>
            <div className={`truncate rounded bg-primary/15 px-sm py-xs text-xs ${className}`}>
              {className}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-sm">
        <h3 className="font-mono text-sm text-muted-foreground">Block sizing</h3>
        {blockSizeClasses.map((className) => (
          <div
            className="inline-block rounded-lg border border-border p-xs align-top"
            key={className}
          >
            <div
              className={`flex w-24 items-center justify-center overflow-hidden rounded bg-secondary/20 px-xs text-[0.6rem] ${className}`}
            >
              {className}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShapeMatrix() {
  return (
    <div className="grid gap-lg lg:grid-cols-3">
      <div>
        <h3 className="mb-sm font-mono text-sm text-muted-foreground">Containers</h3>
        <div className="space-y-xs">
          {containerClasses.map((className) => (
            <div
              className={`rounded-lg border border-border bg-muted px-sm py-xs text-xs ${className}`}
              key={className}
            >
              {className}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-sm font-mono text-sm text-muted-foreground">Radius</h3>
        <div className="grid grid-cols-2 gap-sm">
          {radiusClasses.map((className) => (
            <div
              className={`border border-primary bg-primary/10 p-md text-xs ${className}`}
              key={className}
            >
              {className}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-sm font-mono text-sm text-muted-foreground">Aspect + animation</h3>
        <div className="grid gap-sm">
          {aspectClasses.map((className) => (
            <div className="w-full" key={className}>
              <div
                className={`flex items-center justify-center rounded-lg border border-border bg-accent/10 text-xs ${className}`}
              >
                {className}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-xs">
            {animationClasses.map((className) => (
              <span
                className={`rounded-full bg-success/20 px-sm py-xs text-[0.65rem] ${className}`}
                key={className}
              >
                {className}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const navItems = [
  ["type", "Type"],
  ["spacing", "Spacing"],
  ["sizes", "Block + inline"],
  ["colors", "Colors"],
  ["shape", "Shape"],
] as const;

export function TailwindTokenMatrix({ mode }: TailwindTokenMatrixProps) {
  return (
    <main className="min-h-screen bg-background text-foreground" id="top">
      <div className="mx-auto flex max-w-7xl flex-col gap-xl p-lg">
        <header className="rounded-4xl border border-border bg-card p-xl shadow-xl shadow-ring/10">
          <div className="mb-md flex flex-wrap gap-sm">
            <span className="rounded-full bg-primary px-md py-sm text-primary-foreground">
              Tailwind v4
            </span>
            <span className="rounded-full bg-secondary px-md py-sm text-secondary-foreground">
              {mode === "client" ? "Client rendered" : "SSR"}
            </span>
            <span className="rounded-full border border-border px-md py-sm text-muted-foreground">
              globals.css variable coverage
            </span>
          </div>
          <h1 className="font-serif text-5x text-foreground">Tailwind token matrix</h1>
          <p className="mt-md max-w-4xl text-lg text-muted-foreground">
            A handwritten benchmark page that deliberately renders the variable-backed Tailwind
            surface from globals.css: fonts, text sizes, block and inline sizing, containers,
            padding, margin, gap, spacing, insets, radius, animation, aspect ratios, semantic
            colors, input states, sidebar tokens, chart colors, and the full Catppuccin palette.
          </p>
          <nav className="mt-lg flex flex-wrap gap-sm" aria-label="Tailwind token sections">
            {navItems.map(([id, label]) => (
              <a
                className="rounded-full border border-border px-md py-sm text-sm hover:bg-accent hover:text-accent-foreground"
                href={`#${id}`}
                key={id}
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        <TokenSection eyebrow="Font variables" id="type" title="Font families and text scale">
          <TypeMatrix />
        </TokenSection>
        <TokenSection
          eyebrow="Spacing variables"
          id="spacing"
          title="Padding, margin, gap, space, and inset coverage"
        >
          <SpacingMatrix />
        </TokenSection>
        <TokenSection
          eyebrow="Container + size variables"
          id="sizes"
          title="Block and inline sizing coverage"
        >
          <SizeMatrix />
        </TokenSection>
        <TokenSection
          eyebrow="Color variables"
          id="colors"
          title="Semantic colors and full Catppuccin palette"
        >
          <ColorMatrix />
        </TokenSection>
        <TokenSection
          eyebrow="Other theme variables"
          id="shape"
          title="Containers, radius, aspect ratios, and animations"
        >
          <ShapeMatrix />
        </TokenSection>
      </div>
    </main>
  );
}
