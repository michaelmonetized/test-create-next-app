/**
 * Components Ui Chart public module surface.
 */
"use client";

import * as React from "react";
import type { TooltipValueType } from "recharts";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
type TooltipNameType = number | string;
type TooltipPayload = NonNullable<
  RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>["payload"]
>;
type TooltipPayloadItem = TooltipPayload[number];

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  initialDimension?: {
    width: number;
    height: number;
  };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function getTooltipLabel({
  config,
  hideLabel,
  payload,
  labelKey,
  label,
  labelFormatter,
  labelClassName,
}: {
  config: ChartConfig;
  hideLabel: boolean;
  payload?: TooltipPayload;
  labelKey?: string;
  label?: unknown;
  labelFormatter?: (label: React.ReactNode, payload: TooltipPayload) => React.ReactNode;
  labelClassName?: string;
}) {
  if (hideLabel || !payload?.length) {
    return null;
  }

  const [item] = payload;
  const key = getTooltipItemKey(item, labelKey);
  const itemConfig = getPayloadConfigFromPayload(config, item, key);
  const value = getTooltipLabelValue({ config, itemConfig, label, labelKey });

  if (labelFormatter) {
    return (
      <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
    );
  }

  return value ? <div className={cn("font-medium", labelClassName)}>{value}</div> : null;
}

function getTooltipItemKey(item: TooltipPayloadItem, explicitKey?: string) {
  if (explicitKey) return explicitKey;
  if (item.dataKey != null) return String(item.dataKey);
  if (item.name != null) return String(item.name);
  return "value";
}

function getTooltipLabelValue({
  config,
  itemConfig,
  label,
  labelKey,
}: {
  config: ChartConfig;
  itemConfig: ChartConfig[string] | undefined;
  label: unknown;
  labelKey?: string;
}) {
  if (labelKey || typeof label !== "string") {
    return itemConfig?.label;
  }
  return config[label]?.label ?? label;
}

function ChartTooltipIndicator({
  color,
  indicator,
  nestLabel,
}: {
  color: string | undefined;
  indicator: "line" | "dot" | "dashed";
  nestLabel: boolean;
}) {
  return (
    <div
      className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
        "h-2.5 w-2.5": indicator === "dot",
        "w-1": indicator === "line",
        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
        "my-0.5": nestLabel && indicator === "dashed",
      })}
      style={
        {
          "--color-bg": color,
          "--color-border": color,
        } as React.CSSProperties
      }
    />
  );
}

function ChartTooltipDefaultContent({
  item,
  itemConfig,
  indicatorColor,
  indicator,
  hideIndicator,
  nestLabel,
  tooltipLabel,
}: {
  item: TooltipPayloadItem;
  itemConfig: ChartConfig[string] | undefined;
  indicatorColor: string | undefined;
  indicator: "line" | "dot" | "dashed";
  hideIndicator: boolean;
  nestLabel: boolean;
  tooltipLabel: React.ReactNode;
}) {
  const Icon = itemConfig?.icon;

  return (
    <>
      {Icon ? (
        <Icon />
      ) : (
        !hideIndicator && (
          <ChartTooltipIndicator
            color={indicatorColor}
            indicator={indicator}
            nestLabel={nestLabel}
          />
        )
      )}
      <div
        className={cn(
          "flex flex-1 justify-between leading-none",
          nestLabel ? "items-end" : "items-center",
        )}
      >
        <div className="grid gap-1.5">
          {nestLabel ? tooltipLabel : null}
          <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
        </div>
        <ChartTooltipValue value={item.value} />
      </div>
    </>
  );
}

function ChartTooltipValue({ value }: { value: TooltipPayloadItem["value"] }) {
  if (value == null) return null;
  return (
    <span className="font-mono font-medium text-foreground tabular-nums">
      {typeof value === "number" ? value.toLocaleString() : String(value)}
    </span>
  );
}

function ChartTooltipItem({
  item,
  index,
  config,
  color,
  formatter,
  nameKey,
  indicator,
  hideIndicator,
  nestLabel,
  tooltipLabel,
}: {
  item: TooltipPayloadItem;
  index: number;
  config: ChartConfig;
  color?: string;
  formatter?: RechartsPrimitive.DefaultTooltipContentProps<
    TooltipValueType,
    TooltipNameType
  >["formatter"];
  nameKey?: string;
  indicator: "line" | "dot" | "dashed";
  hideIndicator: boolean;
  nestLabel: boolean;
  tooltipLabel: React.ReactNode;
}) {
  const key = getTooltipItemKey(item, nameKey);
  const itemConfig = getPayloadConfigFromPayload(config, item, key);
  const indicatorColor = color ?? item.payload?.fill ?? item.color;
  const customContent =
    formatter && item.value !== undefined && item.name
      ? formatter(item.value, item.name, item, index, item.payload)
      : null;

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
        indicator === "dot" && "items-center",
      )}
    >
      {customContent ? (
        customContent
      ) : (
        <ChartTooltipDefaultContent
          item={item}
          itemConfig={itemConfig}
          indicatorColor={indicatorColor}
          indicator={indicator}
          hideIndicator={hideIndicator}
          nestLabel={nestLabel}
          tooltipLabel={tooltipLabel}
        />
      )}
    </div>
  );
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    return getTooltipLabel({
      config,
      hideLabel,
      payload,
      labelKey,
      label,
      labelFormatter,
      labelClassName,
    });
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-none border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            return (
              <ChartTooltipItem
                key={index}
                item={item}
                index={index}
                config={config}
                color={color}
                formatter={formatter}
                nameKey={nameKey}
                indicator={indicator}
                hideIndicator={hideIndicator}
                nestLabel={nestLabel}
                tooltipLabel={tooltipLabel}
              />
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const configLabelKey = getPayloadStringValue(payload, key) ?? key;
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

function getPayloadStringValue(payload: object, key: string) {
  const direct = getStringProperty(payload, key);
  if (direct) return direct;

  const nestedPayload = "payload" in payload ? payload.payload : undefined;
  return isObject(nestedPayload) ? getStringProperty(nestedPayload, key) : undefined;
}

function getStringProperty(source: object, key: string) {
  return key in source && typeof source[key as keyof typeof source] === "string"
    ? (source[key as keyof typeof source] as string)
    : undefined;
}

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent };
