"use client";

import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import { APP_URL } from "@/lib/events";
import { Arrow, Logo } from "./brand";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const links = [
  { label: "Discover Events", href: `${APP_URL}/discovery` },
  { label: "Affiliates", href: "/affiliates", badge: "Earn" },
  { label: "Pricing", href: "/pricing" },
];

function EarnBadge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
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

  const tone = onDark ? "on-dark" : "on-light";

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6" />
      <header className="fixed inset-x-0 top-4 z-50 px-page">
        <nav className={`nav ${docked ? `nav-docked ${onDark ? "text-white" : "text-fg"}` : "nav-pill"}`}>
          <Logo onDark={onDark} />
          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={`nav-link ${tone}`}>
                  {l.label}
                  {l.badge && <EarnBadge>{l.badge}</EarnBadge>}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <a href={`${APP_URL}/auth/login`} className={`nav-link hidden md:flex ${tone}`}>
              Log in
            </a>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href={`${APP_URL}/auth/signup`}>Create Event</a>
            </Button>

            {/* Mobile menu: shadcn Sheet (focus trap, Escape, outside tap and scroll lock come from Radix Dialog). */}
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className={`icon-btn md:hidden ${tone}`}
              >
                <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} aria-hidden />
              </SheetTrigger>
              <SheetContent aria-describedby={undefined}>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center justify-between py-1.5">
                  <Logo />
                  <SheetClose
                    aria-label="Close menu"
                    className="icon-btn on-light"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
                  </SheetClose>
                </div>
                <ul className="mt-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="menu-link">
                        <span className="flex items-center gap-2">
                          {l.label}
                          {l.badge && <EarnBadge>{l.badge}</EarnBadge>}
                        </span>
                        <Arrow className="icon text-muted" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
                  <Button asChild variant="outline">
                    <a href={`${APP_URL}/auth/login`}>Log in</a>
                  </Button>
                  <Button asChild>
                    <a href={`${APP_URL}/auth/signup`}>Create Event</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
