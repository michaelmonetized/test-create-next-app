/**
 * App Billing Billing Content public module surface.
 */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const usageMeters = [
  { label: "Campaigns", used: 8, limit: 25 },
  { label: "Team members", used: 3, limit: 10 },
  { label: "API calls", used: 12_847, limit: 50_000 },
];

const invoices = [
  { date: "Mar 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Feb 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Jan 1, 2026", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Dec 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Nov 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
  { date: "Oct 1, 2025", description: "Growth plan - monthly", amount: "$29.00", status: "Paid" },
];

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PlanFeature[];
  current?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    features: [
      { text: "3 campaigns", included: true },
      { text: "1 team member", included: true },
      { text: "1,000 API calls / mo", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: false },
      { text: "Custom branding", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Growth",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    current: true,
    features: [
      { text: "25 campaigns", included: true },
      { text: "10 team members", included: true },
      { text: "50,000 API calls / mo", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Scale",
    monthlyPrice: "$79",
    yearlyPrice: "$790",
    features: [
      { text: "Unlimited campaigns", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Unlimited API calls", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Email support", included: true },
      { text: "Custom branding", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function BillingHeading() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your subscription, usage, and payment details for Hustle&nbsp;Launch.
      </p>
    </div>
  );
}

export function CurrentPlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Growth plan
          <Badge variant="secondary">Current</Badge>
        </CardTitle>
        <CardDescription>
          $29 / month &middot; Next billing date: April&nbsp;1,&nbsp;2026
        </CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change plan
            </Button>
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Billing cycle</span>
            <span className="font-medium">14 of 30 days</span>
          </div>
          <Progress value={Math.round((14 / 30) * 100)} />
        </div>
      </CardContent>
    </Card>
  );
}

export function UsageSection() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Usage this period</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {usageMeters.map((meter) => {
          const pct = Math.round((meter.used / meter.limit) * 100);
          return (
            <Card key={meter.label}>
              <CardHeader>
                <CardTitle>{meter.label}</CardTitle>
                <CardDescription>
                  {formatNumber(meter.used)} of {formatNumber(meter.limit)} used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={pct} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function PaymentMethodCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-16 items-center justify-center rounded border border-border bg-muted text-xs font-bold">
            VISA
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">
              &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242
            </p>
            <p className="text-xs text-muted-foreground">Expires 12/27</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Visa
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function BillingHistorySection() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Billing history</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.date}>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.description}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function PlanComparisonSection({
  billingCycle,
  onBillingCycleChange,
}: {
  billingCycle: "monthly" | "yearly";
  onBillingCycleChange: (value: "monthly" | "yearly") => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Compare plans</h2>
      <Tabs
        value={billingCycle}
        onValueChange={(v) => onBillingCycleChange(v as "monthly" | "yearly")}
      >
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <PlanGrid plans={plans} cycle="monthly" />
        </TabsContent>
        <TabsContent value="yearly">
          <PlanGrid plans={plans} cycle="yearly" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { Separator as BillingSeparator };

function PlanGrid({ plans, cycle }: { plans: Plan[]; cycle: "monthly" | "yearly" }) {
  return (
    <div className="grid gap-4 pt-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} cycle={cycle} />
      ))}
    </div>
  );
}

function PlanCard({ plan, cycle }: { plan: Plan; cycle: "monthly" | "yearly" }) {
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const period = price === "Free" ? "" : cycle === "monthly" ? "/mo" : "/yr";

  return (
    <Card className={cn(plan.current && "ring-2 ring-primary")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {plan.name}
          {plan.current ? <Badge>Current</Badge> : null}
        </CardTitle>
        <CardDescription>
          <span className="text-2xl font-bold text-foreground">{price}</span>
          {period ? <span className="text-muted-foreground">{period}</span> : null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <PlanFeature key={feature.text} feature={feature} />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <PlanAction plan={plan} />
      </CardFooter>
    </Card>
  );
}

function PlanFeature({ feature }: { feature: Plan["features"][number] }) {
  return (
    <li className="flex items-center gap-2 text-xs">
      <span className={feature.included ? "text-primary" : "text-muted-foreground/40"}>
        {feature.included ? "\u2713" : "\u2014"}
      </span>
      <span className={cn(!feature.included && "text-muted-foreground/50")}>{feature.text}</span>
    </li>
  );
}

function PlanAction({ plan }: { plan: Plan }) {
  if (plan.current) {
    return (
      <Button variant="secondary" className="w-full" disabled>
        Current plan
      </Button>
    );
  }

  return (
    <Button variant={plan.name === "Scale" ? "default" : "outline"} className="w-full">
      {plan.name === "Starter" ? "Downgrade" : "Upgrade"}
    </Button>
  );
}
