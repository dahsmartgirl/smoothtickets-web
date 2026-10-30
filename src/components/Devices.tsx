"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { screenSwap, screenTransition } from "@/lib/motion";

/**
 * Real app screens inside their iPhone mockups (public/screens/mockups, frame included, background cut out).
 * With several, they swap with a blur-and-settle crossfade (lib/motion: screenSwap); all stay mounted
 * so every screen is loaded before it shows. Styles live in globals.css (device-*).
 */
export function AppPhone({
  screens,
  active = 0,
  className = "",
  priority,
}: {
  screens: { src: string; alt: string }[];
  active?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`device ${className}`}>
      {screens.map((s, i) => (
        <motion.div
          key={s.src}
          className="device-layer"
          variants={screenSwap}
          initial={false}
          animate={i === active ? "shown" : "hidden"}
          transition={screenTransition}
        >
          <Image src={s.src} alt={i === active ? s.alt : ""} fill sizes="360px" priority={priority && i === 0} />
        </motion.div>
      ))}
    </div>
  );
}
