"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";

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
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const btn =
    "grid size-11 place-items-center rounded-full bg-surface text-fg shadow-lg ring-1 ring-line transition-opacity hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-6 outline-none sm:scroll-px-6 sm:gap-5 sm:px-6 xl:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] xl:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[38%] hidden justify-between px-3 sm:flex xl:px-6">
        <button type="button" aria-label="Previous events" onClick={() => scroll(-1)} disabled={edges.start} className={`pointer-events-auto ${btn}`}>
          <Arrow className="size-4 rotate-180" />
        </button>
        <button type="button" aria-label="Next events" onClick={() => scroll(1)} disabled={edges.end} className={`pointer-events-auto ${btn}`}>
          <Arrow className="size-4" />
        </button>
      </div>
    </div>
  );
}
