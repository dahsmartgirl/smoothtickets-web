"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./brand";
import { Button } from "./ui/button";

/** Horizontal snap row with prev/next buttons for mouse users; touch users just swipe. */
export function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const btn = "pointer-events-auto transition-opacity disabled:opacity-0";

  return (
    <div className="relative">
      {/* Auto margins on the ends centre a short list; once it overflows they collapse to 0, so scrolling still starts at the first card. */}
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-page pt-2 pb-8 outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:scroll-px-6 sm:gap-5 [&>*:first-child]:ms-auto [&>*:last-child]:me-auto"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[38%] hidden justify-between px-3 sm:flex">
        <Button variant="outline" size="icon" aria-label="Previous events" onClick={() => scroll(-1)} disabled={edges.start} className={btn}>
          <Arrow className="size-4 rotate-180" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next events" onClick={() => scroll(1)} disabled={edges.end} className={btn}>
          <Arrow className="size-4" />
        </Button>
      </div>
    </div>
  );
}
