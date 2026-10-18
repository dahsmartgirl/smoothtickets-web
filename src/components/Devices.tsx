import Image from "next/image";

/** Phone frame around a real app screenshot (cropped from the top). */
export function Phone({
  src,
  alt,
  className = "",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative rounded-[44px] bg-[#0d0f17] p-2.5 shadow-2xl ring-1 ring-white/15 ${className}`}>
      <div className="absolute top-4 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[36px] bg-white">
        <Image src={src} alt={alt} fill sizes="320px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}

/** Minimal browser chrome around a desktop screenshot. */
export function Browser({
  src,
  alt,
  url = "tickets.smooth.africa",
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-surface shadow-[0_30px_80px_-30px_rgba(10,18,48,.35)] ring-1 ring-line sm:rounded-3xl ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 truncate rounded-full bg-fg/5 px-3 py-1 text-[11px] text-muted">
          <svg viewBox="0 0 16 16" className="size-3 shrink-0" fill="currentColor" aria-hidden>
            <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3Zm-1.5 5V4a1.5 1.5 0 1 1 3 0v2h-3Z" />
          </svg>
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative aspect-[16/10] bg-white">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

/**
 * Phone with a clean status bar, crossfading between real app screens.
 * Meant to sit inside an overflow-hidden panel so it "rises" from the bottom edge.
 */
export function AppPhone({
  screens,
  active,
  className = "",
}: {
  screens: { src: string; alt: string }[];
  active: number;
  className?: string;
}) {
  return (
    <div className={`rounded-[46px] bg-[#0d0f17] p-2.5 shadow-2xl ring-1 ring-white/15 ${className}`}>
      <div className="overflow-hidden rounded-[38px] bg-white">
        {/* status bar */}
        <div className="relative flex h-10 items-center justify-between px-7 text-[13px] font-semibold text-night">
          <span>9:41</span>
          <span className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1" aria-hidden>
            <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg viewBox="0 0 26 12" className="h-3 w-6" fill="none">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity=".4" />
              <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
              <rect x="24" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".4" />
            </svg>
          </span>
        </div>
        <div className="relative aspect-[780/1407]">
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              sizes="320px"
              className={`object-cover object-top transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
