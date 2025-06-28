"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { orderSchema, OrderFormData } from "../validators";
import { listFunds, bookTrade, OrderStatus } from "../lib/trade.service";

import StatusStepper from "./StatusStepper";
import BalanceBanner from "./BalanceBanner";
import { Heading, MButton, MTextInput, Paragraph } from "~/components/ui";

export default function OrderForm() {
  /* ────────────── constants & helpers ────────────── */
  const funds = useMemo(listFunds, []);
  const findFund = (id?: string) => funds.find((f) => f.id === id);

  const getOrderValue = (id?: string, qty = 0) =>
    (findFund(id)?.price ?? 0) * qty;

  const renderError = (msg?: string) =>
    msg && <p className="text-xs text-red-600">{msg}</p>;

  /* ────────────── react-hook-form setup ────────────── */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<OrderFormData>({ resolver: zodResolver(orderSchema) });

  const watchFund = watch("fundId");
  const watchQty = watch("quantity") ?? 0;
  const computedValue = getOrderValue(watchFund, watchQty);

  /* ────────────── local UI state ────────────── */
  const [statusTrail, setStatusTrail] = useState<OrderStatus[] | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  /* ────────────── submit handler ────────────── */
  const onSubmit = useCallback(
    async (data: OrderFormData) => {
      try {
        setGlobalError(null);
        setStatusTrail(["Submitted"]);

        const { statusTrail } = await bookTrade(data);
        setStatusTrail(statusTrail);
      } catch (e) {
        const safeMsg =
          e instanceof Error ? e.message : "Unexpected error. Please try again.";
        setStatusTrail(["Submitted", "Failed"]);
        setGlobalError(safeMsg);
      }
    },
    []
  );

  /* ────────────── render ────────────── */
  return (
    <section className="space-y-6">
      <Heading level={2}>Book a Trade</Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 lg:grid-cols-3"
      >
        {/* ── Fund ─────────────────────── */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Fund Name</span>
          <select className="input" defaultValue="" {...register("fundId")}>
            <option value="">— Select Fund —</option>
            {funds.map(({ id, name, price }) => (
              <option key={id} value={id}>
                {name} (${price})
              </option>
            ))}
          </select>
          {renderError(errors.fundId?.message)}
        </label>

        {/* ── Transaction Type ─────────── */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Transaction Type</span>
          <select
            className="input"
            defaultValue=""
            {...register("transactionType")}
          >
            <option value="">—</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          {renderError(errors.transactionType?.message)}
        </label>

        {/* ── Quantity ─────────────────── */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Quantity</span>
          <MTextInput
            type="number"
            min={1}
            {...register("quantity", { valueAsNumber: true })}
          />
          {renderError(errors.quantity?.message)}
        </label>

        {/* ── Order Value (read-only) ──── */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Order Value</span>
          <MTextInput
            readOnly
            value={computedValue ? `$${computedValue.toLocaleString()}` : ""}
            className="cursor-not-allowed bg-slate-100 dark:bg-slate-700"
          />
        </label>

        {/* ── Submit ───────────────────── */}
        <div className="lg:col-span-3">
          <MButton
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          >
            Submit
          </MButton>
        </div>
      </form>

      {/* ─────────── status + errors ─────────── */}
      {globalError && <Paragraph className="text-red-600">{globalError}</Paragraph>}
      {statusTrail && <StatusStepper steps={statusTrail} />}

      <BalanceBanner />
    </section>
  );
}
