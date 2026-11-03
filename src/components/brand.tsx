import { ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { encode } from "uqr";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Smooth Tickets home">
      <Image src="/logo.svg" alt="" width={26} height={26} priority />
      {/* One colour: black on light backgrounds, white on dark ones. */}
      <span className={`logo-text ${onDark ? "text-white" : "text-fg"}`}>smoothtickets</span>
    </Link>
  );
}

/**
 * A real, scannable QR code for `value`, drawn in the same crisp squares as the old decorative one.
 * Low error correction keeps it to as few modules as possible, so it stays close to that look.
 */
export function QrCode({ value, className = "" }: { value: string; className?: string }) {
  const { size, data } = encode(value, { ecc: "L", border: 0 });
  let d = "";
  data.forEach((row, y) => row.forEach((on, x) => on && (d += `M${x} ${y}h1v1h-1z`)));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} shapeRendering="crispEdges" aria-hidden>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** `icon` sizes it; containers like btn and event-cta resize it from globals.css. */
export function Arrow({ className = "icon" }: { className?: string }) {
  return <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} className={className} aria-hidden />;
}

/** ↗ on the buttons that take you into the app to sign up (Create an Event, Become an affiliate). */
export function ArrowOut({ className = "icon icon-out" }: { className?: string }) {
  return <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className={className} aria-hidden />;
}
