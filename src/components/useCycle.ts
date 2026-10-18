"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Auto-advances through `count` items until the user picks one. */
export function useCycle(count: number, ms = 4500) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), ms);
    return () => clearInterval(id);
  }, [count, ms, reduce, paused]);

  return {
    active,
    playing: !reduce && !paused,
    select: (i: number) => {
      setActive(i);
      setPaused(true);
    },
  };
}
