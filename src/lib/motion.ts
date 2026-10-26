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

/** How it works: the blue highlight springs from step to step (shared layoutId). */
export const stepSpring: Transition = { type: "spring", stiffness: 380, damping: 34, mass: 0.8 };

/** Phone screens: the incoming one sharpens and settles from a slight zoom as the old one blurs away. */
export const screenSwap: Variants = {
  hidden: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
  shown: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const screenTransition: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

/** Discovery: cards settle in and shrink away as the filters change; the grid reflows on `layout`. */
export const cardSwap: Variants = {
  out: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
  in: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

/** Event page, phones: the total-and-continue bar rises from the bottom edge. */
export const stickyBar: Variants = {
  hidden: { y: "110%" },
  shown: { y: 0, transition: { type: "spring", stiffness: 420, damping: 38 } },
};

/** Checkout: slides up as a sheet on phones and settles into place as a panel on larger screens. */
/**
 * The checkout's backdrop. Its own tint and blur are animated, not its opacity: a backdrop blur inside anything
 * fading in is only drawn once the fade ends, so it would snap on.
 */
export const scrim: Variants = {
  hidden: { backgroundColor: "rgba(5, 11, 31, 0)", backdropFilter: "blur(0px)", transition: { duration: 0.2 } },
  shown: { backgroundColor: "rgba(5, 11, 31, 0.5)", backdropFilter: "blur(8px)", transition: { duration: 0.25 } },
};

export const sheet: Variants = {
  hidden: { y: 48, opacity: 0, transition: { duration: 0.2 } },
  shown: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 36 } },
};
