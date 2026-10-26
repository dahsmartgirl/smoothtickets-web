import Image from "next/image";

/**
 * Phone with a clean status bar, showing real app screens (crossfading when there are several).
 * The screen matches the screenshots' proportions, so nothing is cropped off the sides.
 * Styles live in globals.css (device-*).
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
      <div className="device-screen">
        <div className="device-status">
          <span>9:41</span>
          <span className="device-island" />
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
        <div className="device-shot">
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              sizes="320px"
              priority={priority && i === 0}
              className={i === active ? "opacity-100" : "opacity-0"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
