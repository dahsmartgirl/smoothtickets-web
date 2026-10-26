import type { Transition, Variants } from "motion/react";

/*
 * Motion presets (Motion, formerly Framer Motion). Springs and staggers can't be written in CSS,
 * so every animation the site runs through Motion is defined here, in one place.
 * Reduced-motion users get instant changes (see <MotionConfig reducedMotion="user"> in Nav).
 */

/** The mobile menu growing out of the nav bar, and folding back into it. */
export const menuSpring: Transition = { type: "spring", stiffness: 420, damping: 40, mass: 0.9 };

export const menuPanel: Variants = {
  closed: { height: 0 },
  open: { height: "auto" },
};

/** Menu rows drop in one after another, and leave together. */
export const menuList: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};

export const menuItem: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
};

export const fade: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

/** FAQ answers: height springs open/shut; the text fades and settles in slightly after. */
export const accordionSpring: Transition = { type: "spring", stiffness: 300, damping: 34, mass: 0.9 };

export const accordionPanel: Variants = {
  closed: { height: 0 },
  open: { height: "auto" },
};

export const accordionText: Variants = {
  closed: { opacity: 0, y: -6, transition: { duration: 0.15 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.28, delay: 0.08, ease: [0.22, 1, 0.36, 1] } },
};

/** The plus turns into an X (45°) on the same spring as the panel. */
export const accordionIcon: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 45 },
};
