import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="Smooth Tickets home">
      <Image src="/logo.svg" alt="" width={26} height={26} priority />
      <span className="font-display text-[13px] font-bold tracking-tight sm:text-[15px]">
        smooth<span className={onDark ? "text-brand-soft" : "text-brand dark:text-brand-soft"}>tickets</span>
      </span>
    </Link>
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: "primary" | "light" | "glass" | "outline" };

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const styles = {
    primary: "bg-brand text-white hover:bg-[#0068d9] shadow-[0_8px_30px_-8px_rgba(0,122,255,.8)]",
    light: "bg-white text-night hover:bg-paper",
    // for use on photos / always-dark sections
    glass: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20",
    outline: "bg-surface text-fg ring-1 ring-line hover:bg-surface-2",
  }[variant];
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand dark:text-brand-soft ${className}`}>
      {children}
    </p>
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

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
