"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";
import type { Tier } from "@/lib/event";
import { formatNaira } from "@/lib/events";
import { scrim, sheet } from "@/lib/motion";
import { Arrow } from "../brand";
import { Button } from "../ui/button";

export type Line = { tier: Tier; qty: number; unit: number; couponCode?: string };

type Holder = { key: string; tierId: number; tierName: string; couponCode?: string; same: boolean; name: string; email: string };

function readCookie(name: string) {
  const hit = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : null;
}

/**
 * Checkout: contact details, then one holder per ticket ("same as contact" by default), then Paystack.
 * Posts to the same endpoint, with the same body, as the main app's checkout, including the affiliate
 * `ref` from the URL and the `fingerprint` cookie, so payments, emails and affiliate credit all behave the same.
 * A bottom sheet on phones, a centred panel from sm up.
 */
export function Checkout({
  slug,
  eventName,
  lines,
  total,
  onClose,
}: {
  slug: string;
  eventName: string;
  lines: Line[];
  total: number;
  onClose: () => void;
}) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [holders, setHolders] = useState<Holder[]>(() =>
    lines.flatMap((l) =>
      Array.from({ length: l.qty }, (_, i) => ({
        key: `${l.tier.id}-${i}`,
        tierId: l.tier.id,
        tierName: l.tier.name,
        couponCode: l.couponCode,
        same: true,
        name: "",
        email: "",
      })),
    ),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  // Latest values for the once-only effect below, so re-renders of the ticket panel never re-run it.
  const closeRef = useRef(onClose);
  const busyRef = useRef(busy);
  useEffect(() => {
    closeRef.current = onClose;
    busyRef.current = busy;
  });

  // Modal behaviour, set up once on open: pin the page where it is, focus, Escape closes.
  useEffect(() => {
    // overflow: hidden alone lets iOS Safari scroll and jump the page behind; pinning the body holds it exactly
    // where it was (even at the footer), and the padding stands in for the scrollbar so nothing shifts.
    const y = window.scrollY;
    const { body } = document;
    const prev = body.style.cssText;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: "0", right: "0", overflow: "hidden", paddingRight: `${gutter}px` });

    // A keyboard popping up over a sheet that's still sliding in is jarring on phones: focus the field on
    // desktop, the dialog itself on touch.
    if (window.matchMedia("(pointer: fine)").matches) firstField.current?.focus({ preventScroll: true });
    else dialog.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !busyRef.current && closeRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.cssText = prev;
      window.scrollTo({ top: y, behavior: "instant" }); // the site scrolls smoothly; this must not
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const update = (key: string, patch: Partial<Holder>) => setHolders((hs) => hs.map((h) => (h.key === key ? { ...h, ...patch } : h)));
  const count = holders.length;
  const complete =
    !!(first.trim() && last.trim() && email.trim() && phone.trim()) && holders.every((h) => h.same || (h.name.trim() && h.email.trim()));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const fullName = `${first.trim()} ${last.trim()}`.trim();
    if (!complete) return;
    setBusy(true);
    try {
      const body: Record<string, unknown> = {
        slug,
        name: fullName,
        email: email.trim(),
        phone: phone.trim().replace(/^\+/, ""),
        tickets: holders.map((h) => ({
          ticket_id: h.tierId,
          name: h.same ? fullName : h.name.trim(),
          email: h.same ? email.trim() : h.email.trim(),
          ...(h.couponCode ? { coupon_code: h.couponCode } : {}),
        })),
      };
      const fingerprint = readCookie("fingerprint");
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (fingerprint) body.fingerprint = fingerprint;
      if (ref) body.affiliate = ref;

      const res = await fetch(`${API_URL}/ticket/whitelist/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      const payUrl = json.data?.data?.authorization_url || json.data?.authorization_url || json.data?.payment_url;
      if (json.status && payUrl) {
        window.location.href = payUrl; // Paystack
      } else if (json.status) {
        window.location.href = "/payment-success"; // free tickets: no payment step, so confirm here
      } else {
        setError(json.message || "We couldn't start checkout. Please try again.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong on our side. Please try again.");
      setBusy(false);
    }
  };

  return (
    <motion.div
      className="checkout-scrim"
      variants={scrim}
      initial="hidden"
      animate="shown"
      exit="hidden"
      onClick={(e) => e.target === e.currentTarget && !busy && onClose()}
    >
      <motion.div
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="checkout"
        variants={sheet}
        initial="hidden"
        animate="shown"
        exit="hidden"
      >
        <div className="checkout-head">
          <div className="min-w-0">
            <h2 id="checkout-title" className="type-heading">
              Your details
            </h2>
            <p className="mt-0.5 truncate text-body text-muted">{eventName}</p>
          </div>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Close checkout" className="icon-btn text-muted transition-colors hover:text-night">
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <form onSubmit={submit} className="checkout-body" noValidate>
          {/* What's being bought */}
          <ul className="checkout-lines">
            {lines.map((l) => (
              <li key={l.tier.id} className="flex justify-between gap-4 text-body">
                <span>
                  {l.qty} × {l.tier.name}
                  {l.couponCode && <span className="text-muted"> ({l.couponCode})</span>}
                </span>
                <span className="tabular-nums">{formatNaira(l.qty * l.unit).replace("Free", "₦0")}</span>
              </li>
            ))}
          </ul>

          <fieldset className="mt-7">
            <legend className="type-label">Contact details</legend>
            <p className="mt-1 text-small text-muted">Your tickets and receipt go to this email.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="First name" value={first} onChange={setFirst} autoComplete="given-name" inputRef={firstField} />
              <Field label="Last name" value={last} onChange={setLast} autoComplete="family-name" />
              <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" className="sm:col-span-2" />
              <Field label="Phone number" type="tel" value={phone} onChange={setPhone} autoComplete="tel" className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="type-label">{count === 1 ? "Ticket holder" : "Ticket holders"}</legend>
            <ul className="mt-3 space-y-3">
              {holders.map((h, i) => (
                <li key={h.key} className="holder">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-body">
                      <span className="text-muted">Ticket {i + 1} ·</span> {h.tierName}
                    </p>
                    <label className="mt-0.5 flex shrink-0 items-center gap-2 text-small text-muted">
                      <input type="checkbox" checked={h.same} onChange={(e) => update(h.key, { same: e.target.checked })} className="check" />
                      Same as contact
                    </label>
                  </div>
                  {!h.same && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field label="Full name" value={h.name} onChange={(v) => update(h.key, { name: v })} autoComplete="off" />
                      <Field label="Email" type="email" value={h.email} onChange={(v) => update(h.key, { email: v })} autoComplete="off" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </fieldset>

          {error && (
            <p role="alert" className="mt-6 rounded-md bg-danger-soft px-4 py-3 text-body text-danger">
              {error}
            </p>
          )}

          <div className="checkout-foot">
            <div className="flex items-baseline justify-between">
              <span className="text-body text-muted">Total</span>
              <span className="type-number text-heading">{formatNaira(total).replace("Free", "₦0")}</span>
            </div>
            <Button type="submit" size="lg" className="mt-4 w-full" disabled={busy || !complete}>
              {busy ? "Starting checkout…" : total > 0 ? "Continue to payment" : "Get my tickets"} {!busy && <Arrow />}
            </Button>
            {total > 0 && <p className="mt-3 text-center text-small text-muted">You&apos;ll pay securely with Paystack.</p>}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  className = "",
  inputRef,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-small text-muted">
        {label} <span aria-hidden>*</span>
      </span>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
        inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined}
        className="field mt-1.5"
      />
    </label>
  );
}
