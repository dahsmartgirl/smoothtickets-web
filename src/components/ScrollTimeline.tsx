"use client";

import type { IconSvgElement } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export type TimelineStep = { icon: IconSvgElement; title: string; body: string };

/** Where the fill's leading edge sits: this far down the screen. A step lights up as its dot passes it. */
const LINE = 0.6;

/**
 * A vertical timeline that fills like a thermometer as you scroll: the blue bar runs from the first dot to
 * the last and grows with the page, and each step lights up as the bar reaches it.
 * Reduced motion: shown complete. Styles in globals.css (timeline-*).
 */
export function ScrollTimeline({ steps, className = "" }: { steps: TimelineStep[]; className?: string }) {
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fill = useMotionValue(0);
  const [track, setTrack] = useState({ top: 0, height: 0 });
  const [reached, setReached] = useState(0);

  const update = useCallback(() => {
    const dots = list.current ? [...list.current.querySelectorAll<HTMLElement>("[data-dot]")] : [];
    if (!list.current || dots.length < 2) return;
    const box = list.current.getBoundingClientRect();
    const centres = dots.map((d) => {
      const r = d.getBoundingClientRect();
      return r.top + r.height / 2;
    });
    const top = centres[0];
    const height = centres[centres.length - 1] - top;
    setTrack((t) => (t.top === top - box.top && t.height === height ? t : { top: top - box.top, height }));
    if (reduce) {
      fill.set(1);
      setReached(dots.length);
      return;
    }
    const line = window.innerHeight * LINE;
    fill.set(height ? Math.min(Math.max((line - top) / height, 0), 1) : 0);
    setReached(centres.filter((c) => c <= line + 1).length);
  }, [fill, reduce]);

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <ol ref={list} className={`timeline ${className}`}>
      <span aria-hidden className="timeline-track" style={{ top: track.top, height: track.height }}>
        <motion.span className="timeline-fill" style={{ scaleY: fill }} />
      </span>
      {steps.map((s, i) => (
        <li key={s.title} className="timeline-step" data-on={i < reached || undefined}>
          <span data-dot className="timeline-dot">
            <HugeiconsIcon icon={s.icon} strokeWidth={2} aria-hidden />
          </span>
          <div>
            <span className="type-number text-body text-brand">0{i + 1}</span>
            <h3 className="mt-1 type-heading">{s.title}</h3>
            <p className="mt-2 text-body text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
