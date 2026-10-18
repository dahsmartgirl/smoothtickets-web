"use client";

import { useEffect, type RefObject } from "react";

/** Marks `ref` with data-offscreen while it is out of view; globals.css pauses CSS animations inside it. */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
