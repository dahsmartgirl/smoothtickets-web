"use client";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MotionConfig, motion } from "motion/react";
import { useId, useState } from "react";
import { accordionIcon, accordionPanel, accordionSpring, accordionText } from "@/lib/motion";

export type AccordionEntry = { question: string; answer: React.ReactNode };

/**
 * Single-open accordion, animated with Motion (presets in lib/motion.ts, styles in globals.css: accordion-*).
 * Every answer stays in the server HTML so it can be crawled; closed answers are `inert`, which keeps them
 * out of the tab order and away from screen readers.
 */
export function Accordion({ items, defaultOpen = 0, className = "" }: { items: AccordionEntry[]; defaultOpen?: number | null; className?: string }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <MotionConfig reducedMotion="user" transition={accordionSpring}>
      <div className={`accordion ${className}`}>
        {items.map((item, i) => {
          const isOpen = open === i;
          const state = isOpen ? "open" : "closed";
          return (
            <div key={item.question}>
              <h3 className="flex">
                <button
                  type="button"
                  id={`${id}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="accordion-trigger"
                >
                  {item.question}
                  <motion.span aria-hidden className="accordion-icon" variants={accordionIcon} initial={false} animate={state}>
                    <HugeiconsIcon icon={Add01Icon} strokeWidth={2.2} />
                  </motion.span>
                </button>
              </h3>
              <motion.div
                id={`${id}-a${i}`}
                role="region"
                aria-labelledby={`${id}-q${i}`}
                inert={!isOpen}
                className="accordion-content"
                variants={accordionPanel}
                initial={false}
                animate={state}
              >
                <motion.div className="accordion-body" variants={accordionText}>
                  {item.answer}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </MotionConfig>
  );
}
