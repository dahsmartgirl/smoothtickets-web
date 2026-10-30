import { ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Smooth Tickets home">
      <Image src="/logo.svg" alt="" width={26} height={26} priority />
      {/* One colour: black on light backgrounds, white on dark ones. */}
      <span className={`logo-text ${onDark ? "text-white" : "text-fg"}`}>smoothtickets</span>
    </Link>
  );
}

/** Deterministic, decorative QR-style grid. Not scannable. */
export function QrCode({ seed = "smooth", size = 21, className = "" }: { seed?: string; size?: number; className?: string }) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) if (!inFinder(x, y) && rand() > 0.52) cells.push([x, y]);
  const finders = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} shapeRendering="crispEdges" aria-hidden>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
      ))}
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`} fill="currentColor">
          <path d={`M${x} ${y}h7v7h-7z M${x + 1} ${y + 1}v5h5v-5z`} fillRule="evenodd" />
          <rect x={x + 2} y={y + 2} width={3} height={3} />
        </g>
      ))}
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
