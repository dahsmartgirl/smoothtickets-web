"use client";

import { MotionConfig, motion } from "motion/react";
import { useRef } from "react";
import { stepSpring } from "@/lib/motion";
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
    <MotionConfig reducedMotion="user">
      <section ref={ref} id="how" aria-labelledby="how-title" className="section relative scroll-mt-24">
        {/* Mobile order: heading, phone, steps, so the screen sits next to the step it shows.
            Desktop: heading and steps on the left, phone spanning both rows on the right. */}
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-x-14">
          <Reveal className="lg:self-end">
            <h2 id="how-title" className="type-title">
              Everything you need. Nothing complicated.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="how-panel">
              <AppPhone screens={steps} active={active} className="how-phone" />
              <div className="fade-bottom" />
            </div>
          </Reveal>

          <div className="lg:self-start">
            <ol className="space-y-2" aria-label="How it works">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title}>
                    <button type="button" aria-pressed={on} onClick={() => select(i)} className="step">
                      {on && <motion.span layoutId="step-highlight" className="step-highlight" transition={stepSpring} />}
                      <span className="step-number">0{i + 1}</span>
                      <span>
                        <span className="block type-subheading">{s.title}</span>
                        <span className="step-body">{s.body}</span>
                      </span>
                      {on && playing && <span key={active} className="step-progress" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
