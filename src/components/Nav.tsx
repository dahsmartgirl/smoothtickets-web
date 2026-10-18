"use client";

import { useEffect, useState } from "react";
import { APP_URL } from "@/lib/events";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./ui";

const links = [
  { label: "Discover Events", href: `${APP_URL}/discovery` },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Pricing", href: "/pricing" },
];

/** `overHero`: the page opens on the dark hero photo, so the bar starts transparent with white text. */
export function Nav({ overHero = true }: { overHero?: boolean }) {
  // "Docked" = at the top of the page, sitting directly on the hero photo.
  const [docked, setDocked] = useState(overHero);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setDocked(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const subtle = docked ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-fg/5 hover:text-fg";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-4 transition-all duration-300 sm:pl-5 ${
          docked
            ? "bg-transparent text-white shadow-none ring-1 ring-transparent"
            : "bg-surface/85 text-fg shadow-[0_10px_40px_-15px_rgba(5,11,31,.45)] ring-1 ring-line backdrop-blur-xl"
        }`}
      >
        <Logo onDark={docked} />
        <ul className="hidden items-center gap-0.5 text-sm md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={`flex items-center rounded-full px-3 py-2 transition-colors ${subtle}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <ThemeToggle color={docked ? "text-white/85 hover:bg-white/10 hover:text-white" : undefined} />
          </div>
          <a href={`${APP_URL}/auth/login`} className={`hidden rounded-full px-3 py-2 text-sm transition-colors sm:block ${subtle}`}>
            Log in
          </a>
          <a
            href={`${APP_URL}/auth/signup`}
            className="rounded-full bg-brand px-3.5 py-2.5 text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#0068d9] sm:px-4 sm:text-sm"
          >
            Create event
          </a>
          {/* mobile menu */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Menu"
              className={`grid size-10 cursor-pointer list-none place-items-center rounded-full transition-colors [&::-webkit-details-marker]:hidden ${subtle}`}
            >
              <svg viewBox="0 0 24 24" className="size-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg viewBox="0 0 24 24" className="hidden size-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </summary>
            <div className="absolute top-14 -right-1.5 w-64 rounded-3xl bg-surface p-2 text-fg shadow-2xl ring-1 ring-line">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium hover:bg-fg/5">
                  {l.label}
                </a>
              ))}
              <div className="mt-1 flex items-center justify-between border-t border-line px-2 pt-1">
                <a href={`${APP_URL}/auth/login`} className="rounded-2xl px-2 py-3 text-sm font-medium text-muted hover:text-fg">
                  Log in
                </a>
                <ThemeToggle />
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
