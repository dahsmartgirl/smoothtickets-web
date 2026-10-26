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

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="rail"
      >
        {children}
      </div>
      <div className="rail-controls">
        <Button variant="outline" size="icon" aria-label="Previous events" onClick={() => scroll(-1)} disabled={edges.start} className="rail-btn">
          <Arrow className="icon icon-flip" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next events" onClick={() => scroll(1)} disabled={edges.end} className="rail-btn">
          <Arrow />
        </Button>
      </div>
    </div>
  );
}
