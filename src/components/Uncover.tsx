"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * A section that looks pinned underneath the content above it and gets uncovered as that content
 * scrolls away, without actually being pinned.
 *
 * Why not `position: sticky; bottom: 0`: iOS Safari tints its bottom toolbar to match fixed/sticky
 * elements touching the bottom edge, so a pinned blue CTA turned the toolbar blue on every screen.
 * Here the section stays in normal flow (only at the bottom when it really is), and while it scrolls
 * into view its contents are pushed down by exactly how far it still has to come, so they hold still
 * on screen while the edge above sweeps up.
 */
export function UncoverSection({
  children,
  className,
  contentClassName,
  ...props
}: React.ComponentProps<"section"> & { contentClassName?: string }) {
  const ref = useRef<HTMLElement>(null);
  const height = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => height.set(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  // 0 when the section's top meets the bottom of the screen, 1 when its bottom does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(() => (reduce ? 0 : -(1 - scrollYProgress.get()) * height.get()));

  return (
    <section ref={ref} className={className} {...props}>
      <motion.div style={{ y }} className={contentClassName}>
        {children}
      </motion.div>
    </section>
  );
}
