"use client";

import { useEffect, useRef, useState } from "react";
import { APP_URL } from "@/lib/events";
import { ThemeToggle } from "./ThemeToggle";
import { Arrow, Logo } from "./brand";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const links = [
  { label: "Discover Events", href: `${APP_URL}/discovery` },
  { label: "Affiliates", href: "/affiliates", badge: "Earn" },
  { label: "Pricing", href: "/pricing" },
];

function EarnBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-night uppercase">{children}</span>;
}

/** `overHero`: the page opens on the dark hero photo, so the docked bar uses white text. */
export function Nav({ overHero = true }: { overHero?: boolean }) {
  // "Docked" = at the very top: transparent and lined up with the page content. Scrolled = a contracted navy pill.
  const [docked, setDocked] = useState(true);
  const sentinel = useRef<HTMLDivElement>(null);
  const onDark = !docked || overHero;

  // Docked while the top 24px of the page is in view; no scroll listener needed.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const subtle = onDark ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-fg/5 hover:text-fg";

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6" />
      <header className="fixed inset-x-0 top-[calc(1rem+env(safe-area-inset-top))] z-50 px-page">
        {/* Docked width = the hero's text column (max-w-6xl minus its 1.5rem side padding), so the logo and CTA line up with it. */}
        <nav
          className={`mx-auto flex items-center justify-between gap-2 rounded-full py-1.5 transition-[max-width,padding,background-color,box-shadow] duration-300 ease-out ${
            docked
              ? `max-w-[calc(72rem-3rem)] px-0 ${onDark ? "text-white" : "text-fg"}`
              : "max-w-4xl bg-night-2 pr-1.5 pl-4 text-white shadow-[0_10px_30px_-12px_rgba(5,11,31,.5)] sm:pl-5"
          }`}
        >
          <Logo onDark={onDark} />
          <ul className="hidden items-center gap-0.5 text-sm md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={`flex items-center gap-1.5 rounded-full px-3 py-2 whitespace-nowrap transition-colors ${subtle}`}>
                  {l.label}
                  {l.badge && <EarnBadge>{l.badge}</EarnBadge>}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <ThemeToggle color={subtle} />
            </div>
            <a href={`${APP_URL}/auth/login`} className={`hidden rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors md:block ${subtle}`}>
              Log in
            </a>
            <Button asChild size="sm" className="hidden shadow-none md:inline-flex">
              <a href={`${APP_URL}/auth/signup`}>Create Event</a>
            </Button>

            {/* Mobile menu: shadcn Sheet (focus trap, Escape, outside tap and scroll lock come from Radix Dialog). */}
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className={`grid size-10 place-items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden ${subtle}`}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </SheetTrigger>
              <SheetContent
                aria-describedby={undefined}
                className="rounded-b-3xl px-page pt-[calc(1rem+env(safe-area-inset-top))] pb-5"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center justify-between py-1.5">
                  <Logo />
                  <SheetClose
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-full text-muted outline-none hover:bg-fg/5 hover:text-fg focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </SheetClose>
                </div>
                <ul className="mt-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="flex items-center justify-between rounded-2xl px-2 py-3.5 font-display text-base font-bold hover:bg-fg/5"
                      >
                        <span className="flex items-center gap-2">
                          {l.label}
                          {l.badge && <EarnBadge>{l.badge}</EarnBadge>}
                        </span>
                        <Arrow className="size-4 text-muted" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
                  <Button asChild variant="outline">
                    <a href={`${APP_URL}/auth/login`}>Log in</a>
                  </Button>
                  <Button asChild className="shadow-none">
                    <a href={`${APP_URL}/auth/signup`}>Create Event</a>
                  </Button>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-surface-2 py-1 pr-1 pl-4 text-sm text-muted">
                  Appearance
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
