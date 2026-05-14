/**
 * App Billing Page public module surface.
 */
"use client";

import { useState } from "react";
import {
  BillingHeading,
  BillingHistorySection,
  BillingSeparator,
  CurrentPlanCard,
  PaymentMethodCard,
  PlanComparisonSection,
  UsageSection,
} from "@/app/billing/billing-content";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        <BillingHeading />
        <CurrentPlanCard />
        <UsageSection />
        <PaymentMethodCard />
        <BillingHistorySection />
        <BillingSeparator />
        <PlanComparisonSection
          billingCycle={billingCycle}
          onBillingCycleChange={setBillingCycle}
        />
      </Container>
    </Layout>
  );
}
