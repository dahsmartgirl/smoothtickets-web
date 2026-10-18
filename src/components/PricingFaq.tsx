"use client";

import { useState } from "react";
import { APP_URL, formatNaira } from "@/lib/events";
import { Eyebrow } from "./brand";

// Illustrative rate only — real fees depend on the organizer's plan.
const RATE = 0.05;

const faqs = [
  [
    "How much does it cost?",
    "Buyers pay a small service fee shown before checkout, and organizers pay a per-ticket or flat event fee depending on their plan. You can choose to absorb the service fee for your buyers.",
  ],
  [
    "How do attendees get their tickets?",
    "Instantly by email with a unique QR code. Tickets can be downloaded as PDF, added to a phone wallet, and optionally sent by SMS.",
  ],
  [
    "How does check-in work at the door?",
    "Scan each ticket's QR code with your phone. You'll see right away whether it's valid or already used. Offline scanning is available for spotty networks.",
  ],
  [
    "Can I offer refunds or transfers?",
    "Yes. You set the rules: full or partial refunds, refunds up to a certain date, or no refunds at all.",
  ],
  [
    "How does the affiliate program work?",
    "Sign up for a free affiliate account, share your link, and earn commission on every ticket sold through you. Organizers invite affiliates to their events and set the commission for each ticket tier.",
  ],
];

export function PricingFaq() {
  const [price, setPrice] = useState(5000);
  const [absorb, setAbsorb] = useState(false);

  const fee = Math.round(price * RATE);
  const buyerPays = absorb ? price : price + fee;
  const youGet = absorb ? price - fee : price;

  return (
    <section id="pricing" className="relative scroll-mt-24 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-2">
        {/* pricing */}
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
            Simple fees. <span className="text-brand">Your</span> call.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Fees come out of ticket revenue automatically, so there are no invoices to chase. You decide who covers the service fee.
          </p>

          <div className="mt-8 rounded-3xl bg-surface p-6 ring-1 ring-line">
            <label className="block">
              <span className="text-xs font-semibold text-muted">Ticket price (₦)</span>
              <input
                type="number"
                min={0}
                step={500}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
                className="mt-2 w-full rounded-xl bg-surface-2 px-4 py-3 font-display text-xl font-bold ring-1 ring-line outline-none focus:ring-2 focus:ring-brand"
              />
            </label>
            <div role="radiogroup" aria-label="Who pays the fee" className="mt-4 grid grid-cols-2 rounded-full bg-surface-2 p-1 text-sm font-semibold">
              {[
                [false, "Buyer pays fee"],
                [true, "I'll absorb it"],
              ].map(([v, l]) => (
                <button
                  key={String(l)}
                  role="radio"
                  aria-checked={absorb === v}
                  onClick={() => setAbsorb(v as boolean)}
                  className={`rounded-full py-2.5 transition-colors ${absorb === v ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface-2 p-4">
                <dt className="text-xs text-muted">Buyer pays</dt>
                <dd className="mt-1 font-display text-xl font-extrabold">{formatNaira(buyerPays)}</dd>
              </div>
              <div className="rounded-2xl bg-brand p-4 text-white">
                <dt className="text-xs text-white/75">You get per ticket</dt>
                <dd className="mt-1 font-display text-xl font-extrabold">{formatNaira(youGet)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[11px] text-muted">Example uses a 5% fee for illustration. Your exact rate depends on your plan.</p>
          </div>
        </div>

        {/* faq */}
        <div id="faq" className="scroll-mt-24">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
            Good <span className="font-serif font-normal normal-case italic text-brand">questions</span>
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-2 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Still stuck?{" "}
            <a href={`${APP_URL}/#faq`} className="font-semibold text-brand underline-offset-4 hover:underline dark:text-brand-soft">
              Talk to support
            </a>
            . We&apos;re here 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
