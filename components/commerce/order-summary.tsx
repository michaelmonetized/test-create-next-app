/**
 * Components Commerce Order Summary public module surface.
 */
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { TableHead, TableRow } from "@/components/ui/table";

interface OrderLineItem {
  name: string;
  price: number;
}

interface OrderSummaryTotal {
  label: string;
  value: ReactNode;
}

/** Formats commerce amounts with fixed cents for compact order summaries. */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/** Renders named line items and prices in a consistent summary row style. */
export function OrderLineItems({ items }: { items: OrderLineItem[] }) {
  return items.map((item) => (
    <div key={item.name} className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{item.name}</span>
      <span className="tabular-nums">{formatCurrency(item.price)}</span>
    </div>
  ));
}

/** Renders subtotal-style rows followed by a separated bold total row. */
export function OrderSummaryRows({
  rows,
  total,
}: {
  rows: OrderSummaryTotal[];
  total: OrderSummaryTotal;
}) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{row.label}</span>
          <span className="tabular-nums">{row.value}</span>
        </div>
      ))}
      <Separator />
      <div className="flex items-center justify-between text-sm font-bold">
        <span>{total.label}</span>
        <span className="tabular-nums">{total.value}</span>
      </div>
    </>
  );
}

/** Renders order confirmation line items followed by the final total row. */
export function OrderDetailsRows({
  items,
  total,
}: {
  items: OrderLineItem[];
  total: OrderSummaryTotal;
}) {
  return (
    <>
      <OrderLineItems items={items} />
      <Separator />
      <div className="flex items-center justify-between text-sm font-bold">
        <span>{total.label}</span>
        <span className="tabular-nums">{total.value}</span>
      </div>
    </>
  );
}

/** Renders table headers with a visually hidden trailing action column label. */
export function ActionTableHeader({
  columns,
  actionLabel = "Actions",
}: {
  columns: string[];
  actionLabel?: string;
}) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableHead key={column}>{column}</TableHead>
      ))}
      <TableHead className="text-right">
        <span className="sr-only">{actionLabel}</span>
      </TableHead>
    </TableRow>
  );
}
