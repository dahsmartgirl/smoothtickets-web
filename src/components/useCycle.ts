"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

/** Auto-advances through `count` items until the user picks one. Holds still while `ref` is off-screen. */
export function useCycle(count: number, ref: RefObject<HTMLElement | null>, ms = 4500) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms, reduce, paused, visible]);

  return {
    active,
    playing: !reduce && !paused && visible,
    select: (i: number) => {
      setActive(i);
      setPaused(true);
    },
  };
}
