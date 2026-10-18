"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Browser } from "./Devices";
import { Eyebrow } from "./brand";

const tabs = [
  {
    id: "event",
    label: "Event page",
    src: "/screens/event-desktop.jpg",
    url: "tickets.smooth.africa/the-untapped-experience",
    title: "A page worth sharing",
    points: [
      "Your poster, date, venue and directions in one place",
      "Unlimited tiers: Early Bird, VIP, tables, private links",
      "One link for WhatsApp, IG and X, or let affiliates share it",
    ],
  },
  {
    id: "checkout",
    label: "Checkout",
    src: "/screens/checkout-desktop.jpg",
    url: "tickets.smooth.africa/the-untapped-experience",
    title: "Checkout buyers trust",
    points: [
      "Fees shown before paying, never after",
      "Secure payment, with the QR ticket in their inbox instantly",
      "Tickets save as PDF or to a phone wallet, and work offline",
    ],
  },
  {
    id: "discovery",
    label: "Discovery",
    src: "/screens/discovery-desktop.jpg",
    url: "tickets.smooth.africa/discovery",
    title: "Get found by new crowds",
    points: [
      "Public events listed for people looking for plans",
      "Filter by this week or free, search by venue or city",
      "Sales, check-ins and revenue update live on your dashboard",
    ],
  },
];

export function ProductTour() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section className="relative overflow-hidden bg-surface-2/60 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>See it in action</Eyebrow>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
            The real thing, <span className="font-serif font-normal normal-case italic text-brand">no mockups</span>
          </h2>
        </div>

        <div role="tablist" aria-label="Product screens" className="mx-auto mt-10 flex w-fit gap-1 rounded-full bg-surface p-1 ring-1 ring-line">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                active === t.id ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_2.2fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="order-2 lg:order-1"
            >
              <h3 className="font-display text-2xl font-extrabold">{tab.title}</h3>
              <ul className="mt-5 space-y-3">
                {tab.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-muted">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Browser src={tab.src} alt={`${tab.label} screen on Smooth Tickets`} url={tab.url} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
