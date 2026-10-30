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
 * into view its inner layer is shifted by exactly how far the section still has to come, so the whole
 * band (background, texture, edges and contents together) holds still on screen while the edge above
 * sweeps up. The section itself is only a clipping window: give the visuals to `contentClassName`.
 *
 * Where the browser has scroll-driven animations (Chrome, Safari 26+), CSS does the shifting (.uncover-layer
 * in globals.css) on the compositor, in step with the scroll. The JS version runs a frame behind on iOS,
 * so the band wobbled slightly; it's kept as the fallback.
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
  const native = typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => height.set(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  // 0 when the section's top meets the bottom of the screen, 1 when its bottom does.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(() => (reduce || native ? 0 : -(1 - scrollYProgress.get()) * height.get()));

  return (
    <section ref={ref} className={`uncover relative overflow-hidden ${className ?? ""}`} {...props}>
      <motion.div style={{ y }} className={`uncover-layer ${contentClassName ?? ""}`}>
        {children}
      </motion.div>
    </section>
  );
}
