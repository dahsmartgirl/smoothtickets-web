"use client";

import { useRef } from "react";
import { AppPhone } from "./Devices";
import { Reveal } from "./Reveal";
import { useCycle } from "./useCycle";

const steps = [
  {
    title: "Create",
    body: "Set up your event and customise tickets.",
    src: "/screens/app/create-ticket.jpg",
    alt: "Create Ticket form with price and stock in the Smooth Tickets dashboard",
  },
  {
    title: "Sell",
    body: "Accept individual and group ticket purchases, with discounts.",
    src: "/screens/event-mobile.jpg",
    alt: "Public event page where buyers choose tickets",
  },
  {
    title: "Manage",
    body: "Track ticket sales, revenue, attendees and payouts.",
    src: "/screens/app/revenue.jpg",
    alt: "Revenue tab showing total revenue and payouts",
  },
  {
    title: "Check In",
    body: "Verify tickets with QR codes on event day.",
    src: "/screens/app/scanner.jpg",
    alt: "Smooth Tickets scanner login used to check guests in",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { active, playing, select } = useCycle(steps.length, ref);

  return (
    <section ref={ref} id="how" aria-labelledby="how-title" className="relative scroll-mt-24 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-page lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <h2 id="how-title" className="font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
              Everything you need. <span className="text-brand">Nothing complicated.</span>
            </h2>
          </Reveal>

          <ol className="mt-10 space-y-2" aria-label="How it works">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(i)}
                    className={`relative flex w-full gap-5 overflow-hidden rounded-2xl px-6 py-5 text-left transition-colors ${
                      on ? "bg-brand text-white" : "text-fg hover:bg-surface"
                    }`}
                  >
                    <span className={`font-display text-xl font-black ${on ? "text-white/50" : "text-brand/40"}`}>0{i + 1}</span>
                    <span>
                      <span className="block font-display text-base font-bold">{s.title}</span>
                      <span className={`mt-1 block text-sm leading-relaxed ${on ? "text-white/85" : "text-muted"}`}>{s.body}</span>
                    </span>
                    {on && playing && (
                      <span key={active} className="absolute inset-x-0 bottom-0 h-1 origin-left animate-progress bg-white/40" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="relative h-[520px] overflow-hidden rounded-[36px] bg-surface-2 sm:h-[600px]">
            <div className="absolute top-1/4 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand/25 blur-[80px]" />
            <AppPhone screens={steps} active={active} className="absolute top-12 left-1/2 w-[280px] -translate-x-1/2 sm:w-[310px]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-2 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
