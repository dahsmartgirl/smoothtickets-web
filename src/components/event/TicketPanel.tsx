"use client";

import { MinusSignIcon, PlusSignIcon, Tag01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";
import type { Tier } from "@/lib/event";
import { formatNaira } from "@/lib/events";
import { stickyBar } from "@/lib/motion";
import { feeFor, isSoldOut, totalFor } from "@/lib/tickets";
import { Arrow } from "../brand";
import { Button } from "../ui/button";
import { Checkout, type Line } from "./Checkout";

type Coupon = { code: string; price: number };

/**
 * The ticket counter: one perforated stub per ticket category with a quantity stepper, the running total,
 * and the button that opens checkout. Prices include the service fee, worked out like the main app.
 * On phones a bar with the total follows you once tickets are picked and the panel scrolls away.
 */
export function TicketPanel({
  event,
  tiers,
  ended,
}: {
  event: { id: number; slug: string; name: string };
  tiers: Tier[];
  ended: boolean;
}) {
  const [qty, setQty] = useState<Record<number, number>>({});
  const [coupons, setCoupons] = useState<Record<number, Coupon>>({});
  const [checkout, setCheckout] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const [summaryOnScreen, setSummaryOnScreen] = useState(true);

  useEffect(() => {
    const el = summary.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSummaryOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines: Line[] = tiers
    .filter((t) => (qty[t.id] ?? 0) > 0)
    .map((t) => {
      const c = coupons[t.id];
      return { tier: t, qty: qty[t.id], unit: totalFor(t, c?.price), couponCode: c?.code };
    });
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.unit, 0);

  const step = (t: Tier, by: 1 | -1) =>
    setQty((q) => {
      const next = Math.max(0, (q[t.id] ?? 0) + by);
      return { ...q, [t.id]: t.stock !== null ? Math.min(next, t.stock) : next };
    });

  const cta = count ? `Get ${count} ${count === 1 ? "ticket" : "tickets"}` : "Choose your tickets";

  return (
    <MotionConfig reducedMotion="user">
      <section id="tickets" aria-labelledby="tickets-title" className="ticket-panel">
        <div className="ticket-panel-head">
          <h2 id="tickets-title" className="type-heading">
            Tickets
          </h2>
          <p className="mt-1 text-body text-muted">Prices include the service fee.</p>
        </div>

        {ended ? (
          <p className="px-6 pb-7 text-body text-muted">This event has ended, so tickets are no longer on sale.</p>
        ) : tiers.length === 0 ? (
          <p className="px-6 pb-7 text-body text-muted">Tickets aren&apos;t on sale yet. Check back soon.</p>
        ) : (
          <>
            <ul className="tier-list">
              {tiers.map((t) => (
                <TierRow
                  key={t.id}
                  tier={t}
                  eventId={event.id}
                  qty={qty[t.id] ?? 0}
                  coupon={coupons[t.id]}
                  onStep={(by) => step(t, by)}
                  onCoupon={(c) => setCoupons((all) => ({ ...all, [t.id]: c }))}
                />
              ))}
            </ul>

            <div ref={summary} className="ticket-summary">
              <div className="flex items-baseline justify-between">
                <span className="text-body text-muted">Total</span>
                <span className="type-number text-heading">{formatNaira(total).replace("Free", "₦0")}</span>
              </div>
              <Button className="mt-4 w-full" size="lg" disabled={!count} onClick={() => setCheckout(true)}>
                {cta} {count > 0 && <Arrow />}
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Phones: the total and the button stay in reach once tickets are picked */}
      <AnimatePresence>
        {count > 0 && !summaryOnScreen && !checkout && (
          <motion.div className="ticket-bar" variants={stickyBar} initial="hidden" animate="shown" exit="hidden">
            <div>
              <p className="text-small text-muted">
                {count} {count === 1 ? "ticket" : "tickets"}
              </p>
              <p className="type-number text-heading">{formatNaira(total).replace("Free", "₦0")}</p>
            </div>
            <Button onClick={() => setCheckout(true)}>
              Continue <Arrow />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkout && (
          <Checkout key="checkout" slug={event.slug} eventName={event.name} lines={lines} total={total} onClose={() => setCheckout(false)} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

function TierRow({
  tier,
  eventId,
  qty,
  coupon,
  onStep,
  onCoupon,
}: {
  tier: Tier;
  eventId: number;
  qty: number;
  coupon?: Coupon;
  onStep: (by: 1 | -1) => void;
  onCoupon: (c: Coupon) => void;
}) {
  const soldOut = isSoldOut(tier);
  const unit = totalFor(tier, coupon?.price);
  const fee = feeFor(tier, coupon?.price);
  const atMax = tier.stock !== null && qty >= tier.stock;

  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/ticket/whitelist/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupon_code: code.trim(), event_id: eventId, ticket_id: tier.id }),
      });
      const json = await res.json();
      if (json.status) {
        const amount = json.data?.amount ?? json.data?.ticket?.coupon_amount ?? json.data?.ticket?.price ?? 0;
        onCoupon({ code: code.trim(), price: Number(amount) });
        setCodeOpen(false);
      } else {
        setError(json.message || "That code doesn't work for this ticket.");
      }
    } catch {
      setError("Couldn't check that code. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="tier" data-selected={qty > 0 || undefined} data-sold-out={soldOut || undefined}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="type-label">{tier.name}</h3>
          {tier.description && <p className="mt-0.5 text-small text-muted">{tier.description}</p>}
          {tier.admits > 1 && !/admit/i.test(tier.description) && <p className="mt-2 tier-tag">Admits {tier.admits}</p>}
        </div>
        <div className="shrink-0 text-right">
          {coupon && <p className="text-small text-muted line-through">{formatNaira(totalFor(tier))}</p>}
          <p className="type-number text-subheading">{formatNaira(unit)}</p>
          {fee > 0 && <p className="text-small text-muted">incl. {formatNaira(fee)} fee</p>}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        {soldOut ? (
          <span className="tier-tag bg-mist text-muted">Sold out</span>
        ) : coupon ? (
          <span className="inline-flex items-center gap-1.5 text-small text-brand-deep">
            <HugeiconsIcon icon={Tag01Icon} strokeWidth={2} className="size-3.5" aria-hidden />
            {coupon.code} applied
          </span>
        ) : tier.couponActive ? (
          <button type="button" className="text-small link" onClick={() => setCodeOpen(!codeOpen)} aria-expanded={codeOpen}>
            Have a code?
          </button>
        ) : (
          <span />
        )}

        {!soldOut && (
          <div className="stepper" role="group" aria-label={`${tier.name} quantity`}>
            <button type="button" onClick={() => onStep(-1)} disabled={qty === 0} aria-label={`One less ${tier.name}`}>
              <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} aria-hidden />
            </button>
            <span aria-live="polite" className="type-number">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => onStep(1)}
              disabled={atMax}
              aria-label={`One more ${tier.name}`}
              data-primary
            >
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} aria-hidden />
            </button>
          </div>
        )}
      </div>

      {codeOpen && !coupon && (
        <form onSubmit={apply} className="mt-4">
          <div className="flex min-w-0 gap-2">
            <label className="sr-only" htmlFor={`code-${tier.id}`}>
              Coupon code for {tier.name}
            </label>
            <input
              id={`code-${tier.id}`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              autoCapitalize="characters"
              className="field h-10 min-w-0 flex-1"
            />
            <Button type="submit" variant="line" className="h-10 px-4" disabled={busy || !code.trim()}>
              {busy ? "Checking…" : "Apply"}
            </Button>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-small text-danger">
              {error}
            </p>
          )}
        </form>
      )}
    </li>
  );
}
