"use client";

import { useEffect, useRef, useState } from "react";

const INSET = 1; // half the stroke, so the dots sit on the card's edge
const NOTCH = 10; // radius of the side bites

/** The card's corner radius, read from the --radius-lg token so it always matches the poster. */
function cornerRadius(el: Element) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return parseFloat(getComputedStyle(el).getPropertyValue("--radius-lg")) * rem || 0;
}

/**
 * Dotted border for a card's content area: down both sides, round the bottom, with a notch on each side
 * at the perforation, plus the dotted perforation itself. It is open at the top, where the poster forms
 * the ticket's top edge. Place inside a `relative` box that contains an element marked `data-perf`;
 * the notches line up with that element's vertical center.
 */
export function TicketOutline() {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<{ w: number; h: number; y: number; r: number } | null>(null);

  useEffect(() => {
    const svg = ref.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;
    const measure = () => {
      const perf = host.querySelector<HTMLElement>("[data-perf]");
      const hostTop = host.getBoundingClientRect().top;
      const y = perf ? perf.getBoundingClientRect().top - hostTop + perf.offsetHeight / 2 : host.clientHeight / 2;
      setBox({ w: host.clientWidth, h: host.clientHeight, y: Math.round(y), r: cornerRadius(host) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  let d = "";
  if (box) {
    const { w, h, y, r: BOTTOM_R } = box;
    const l = INSET, r = w - INSET, b = h - INSET;
    d = [
      `M ${r} 0`,
      `V ${y - NOTCH}`,
      `A ${NOTCH} ${NOTCH} 0 0 0 ${r} ${y + NOTCH}`,
      `V ${b - BOTTOM_R}`,
      `A ${BOTTOM_R} ${BOTTOM_R} 0 0 1 ${r - BOTTOM_R} ${b}`,
      `H ${l + BOTTOM_R}`,
      `A ${BOTTOM_R} ${BOTTOM_R} 0 0 1 ${l} ${b - BOTTOM_R}`,
      `V ${y + NOTCH}`,
      `A ${NOTCH} ${NOTCH} 0 0 0 ${l} ${y - NOTCH}`,
      `V 0`,
      // perforation between the notches
      `M ${l + NOTCH + 6} ${y} H ${r - NOTCH - 6}`,
    ].join(" ");
  }

  return (
    <svg ref={ref} aria-hidden className="ticket-outline">
      {d && <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.01 5" />}
    </svg>
  );
}
