"use client";

import { useRef } from "react";
import { usePauseOffscreen } from "./usePauseOffscreen";

const words = ["Create", "Sell", "Scan", "Get paid", "Repeat"];

export function Marquee({ className = "bg-flame text-night", tilt = "-rotate-2" }: { className?: string; tilt?: string }) {
  const row = [...words, ...words, ...words];
  const ref = useRef<HTMLDivElement>(null);
  usePauseOffscreen(ref);
  return (
    <div ref={ref} className={`relative z-10 -mx-4 overflow-hidden py-2.5 sm:py-4 ${tilt} ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-lg font-black whitespace-nowrap uppercase sm:text-4xl">
                <span className="px-4 sm:px-6">{w}</span>
                <svg viewBox="0 0 24 24" className="size-4 sm:size-8" aria-hidden>
                  <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
