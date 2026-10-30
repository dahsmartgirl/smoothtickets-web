"use client";

import { MotionConfig, motion } from "motion/react";
import { useRef } from "react";
import { stepSpring } from "@/lib/motion";
import { AppPhone } from "./Devices";
import { useCycle } from "./useCycle";

const steps = [
  {
    title: "Create",
    body: "Set up your event and customise tickets.",
    src: "/screens/mockups/create-event.webp",
    alt: "Create Event form with banner upload, event name and description",
  },
  {
    title: "Sell",
    body: "Accept individual and group ticket purchases, with discounts.",
    src: "/screens/mockups/discovery.webp",
    alt: "Smooth Tickets discovery page where buyers find events",
  },
  {
    title: "Manage",
    body: "Track ticket sales, revenue, attendees and payouts.",
    src: "/screens/mockups/event-info.webp",
    alt: "Event info screen with date, venue, public link and scanner key",
  },
  {
    title: "Check In",
    body: "Verify tickets with QR codes on event day.",
    src: "/screens/mockups/scanner.webp",
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
        <div data-stagger className="container-page grid gap-10 lg:grid-cols-2 lg:gap-x-14">
          <h2 id="how-title" className="type-title lg:self-end">
            Everything you need. Nothing complicated.
          </h2>

          <div className="how-panel lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <AppPhone screens={steps} active={active} className="how-phone" />
            <div className="fade-bottom" />
          </div>

          <ol data-stagger-group className="space-y-2 lg:self-start" aria-label="How it works">
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
      </section>
    </MotionConfig>
  );
}
