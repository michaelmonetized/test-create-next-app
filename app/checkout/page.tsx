/**
 * App Checkout Page public module surface.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Control, FieldErrors, FieldPath } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  formatCurrency,
  OrderLineItems,
  OrderSummaryRows,
} from "@/components/commerce/order-summary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/layout";
import { Container } from "@/components/ui/layout/containers";

/* ------------------------------------------------------------------ */
/*  Schema                                                             */
/* ------------------------------------------------------------------ */

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip: z.string().length(5, "ZIP code must be exactly 5 characters"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3}$/, "CVC must be exactly 3 digits"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;
type CheckoutFieldName = FieldPath<CheckoutFormValues>;
type CheckoutFieldConfig = {
  name: CheckoutFieldName;
  label: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
};

/* ------------------------------------------------------------------ */
/*  Static order data                                                  */
/* ------------------------------------------------------------------ */

const lineItems = [
  { name: "Launch Toolkit Pro", price: 49 },
  { name: "Campaign Templates (x2)", price: 58 },
  { name: "Analytics Add-on", price: 19 },
];

const subtotal = 126;
const shipping = 0;
const tax = 10.08;
const total = 136.08;

const contactFields: CheckoutFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
];

const shippingFields: CheckoutFieldConfig[] = [
  { name: "name", label: "Full name", placeholder: "Jane Doe" },
  { name: "address", label: "Address", placeholder: "123 Main St" },
];

const shippingGridFields: CheckoutFieldConfig[] = [
  { name: "city", label: "City", placeholder: "San Francisco" },
  { name: "zip", label: "ZIP code", placeholder: "94102" },
];

const paymentFields: CheckoutFieldConfig[] = [
  {
    name: "cardNumber",
    label: "Card number",
    placeholder: "4242424242424242",
    maxLength: 16,
  },
];

const paymentGridFields: CheckoutFieldConfig[] = [
  { name: "expiry", label: "Expiry date", placeholder: "MM/YY", maxLength: 5 },
  { name: "cvc", label: "CVC", placeholder: "123", maxLength: 3 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function CheckoutInputField({
  config,
  control,
  errors,
}: {
  config: CheckoutFieldConfig;
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}) {
  const error = errors[config.name];

  return (
    <Controller
      name={config.name}
      control={control}
      render={({ field }) => (
        <Field data-invalid={!!error || undefined}>
          <FieldLabel htmlFor={config.name}>{config.label}</FieldLabel>
          <Input
            id={config.name}
            type={config.type}
            placeholder={config.placeholder}
            maxLength={config.maxLength}
            aria-invalid={!!error}
            {...field}
          />
          {error && <FieldError>{error.message}</FieldError>}
        </Field>
      )}
    />
  );
}

function CheckoutFieldList({
  fields,
  control,
  errors,
}: {
  fields: CheckoutFieldConfig[];
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}) {
  return fields.map((field) => (
    <CheckoutInputField
      key={field.name}
      config={field}
      control={control}
      errors={errors}
    />
  ));
}

function CheckoutFieldGrid({
  fields,
  control,
  errors,
}: {
  fields: CheckoutFieldConfig[];
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <CheckoutFieldList fields={fields} control={control} errors={errors} />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = useCallback(
    async (data: CheckoutFormValues) => {
      void data;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Order placed successfully!");
      router.push("/order-complete");
    },
    [router],
  );

  return (
    <Layout variant="default">
      <Container className="py-lg space-y-lg">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your Hustle&nbsp;Launch purchase.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CheckoutFieldList
                  fields={contactFields}
                  control={control}
                  errors={errors}
                />
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CheckoutFieldList
                  fields={shippingFields}
                  control={control}
                  errors={errors}
                />
                <CheckoutFieldGrid
                  fields={shippingGridFields}
                  control={control}
                  errors={errors}
                />
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CheckoutFieldList
                  fields={paymentFields}
                  control={control}
                  errors={errors}
                />
                <CheckoutFieldGrid
                  fields={paymentGridFields}
                  control={control}
                  errors={errors}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place order"}
            </Button>
          </form>

          {/* ---- Order summary sidebar ---- */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <OrderLineItems items={lineItems} />
              <OrderSummaryRows
                rows={[
                  { label: "Subtotal", value: formatCurrency(subtotal) },
                  {
                    label: "Shipping",
                    value: shipping === 0 ? "Free" : formatCurrency(shipping),
                  },
                  { label: "Tax (8%)", value: formatCurrency(tax) },
                ]}
                total={{ label: "Total", value: formatCurrency(total) }}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}
