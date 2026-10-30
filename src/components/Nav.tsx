"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { APP_URL } from "@/lib/events";
import { fade, menuItem, menuList, menuPanel, menuSpring } from "@/lib/motion";
import { Arrow, ArrowOut, Logo } from "./brand";
import { Button } from "./ui/button";

const links = [
  { label: "Discover Events", href: "/discovery" },
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
  const trigger = useRef<HTMLButtonElement>(null);

  // Mobile menu. `shown` stays true until the fold-up animation ends, so the bar keeps its
  // pill and ticket edge while the menu is still closing.
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const pill = !docked || shown;
  const onDark = pill || overHero;
  const tone = onDark ? "on-dark" : "on-light";

  // Docked while the top 24px of the page is in view; no scroll listener needed.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // While open: Escape closes (focus back on the toggle), and widening to desktop closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onWide = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWide);
    };
  }, [open]);

  const toggle = () => {
    if (!open) setShown(true);
    setOpen(!open);
  };
  const close = () => setOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-6" />

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="menu-scrim"
            variants={fade}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-4 z-50 px-page">
        <motion.nav
          aria-label="Main"
          className={`nav ${pill ? "nav-pill" : `nav-docked ${onDark ? "text-white" : "text-fg"}`}`}
          initial={false}
          animate={{ "--open": open ? 1 : 0 }}
          transition={menuSpring}
        >
          <div className="nav-bar">
            <Logo onDark={onDark} />
            <ul className="hidden items-center gap-0.5 lg:flex">
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
              <a href={`${APP_URL}/auth/login`} target="_blank" rel="noopener" className={`nav-link hidden lg:flex ${tone}`}>
                Log in
              </a>
              <Button asChild size="sm" className="hidden lg:inline-flex">
                <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
                  Create Event <ArrowOut />
                </a>
              </Button>

              <button
                ref={trigger}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={toggle}
                className={`icon-btn lg:hidden ${tone}`}
              >
                <span className="burger" aria-hidden>
                  <span className="burger-line" />
                  <span className="burger-line" />
                </span>
              </button>
            </div>
          </div>

          {/* The menu grows out of the bar itself; its bottom edge turns into a torn ticket stub (--open in globals.css). */}
          <AnimatePresence initial={false} onExitComplete={() => setShown(false)}>
            {open && (
              <motion.div
                key="menu"
                id="mobile-menu"
                className="menu-panel"
                variants={menuPanel}
                initial="closed"
                animate="open"
                exit="closed"
                transition={menuSpring}
              >
                <motion.div className="menu-body" variants={menuList}>
                  <ul>
                    {links.map((l) => (
                      <motion.li key={l.label} variants={menuItem}>
                        <a href={l.href} className="menu-link" onClick={close}>
                          <span className="flex items-center gap-2">
                            {l.label}
                            {l.badge && <EarnBadge>{l.badge}</EarnBadge>}
                          </span>
                          <Arrow />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div className="menu-actions" variants={menuItem}>
                    <Button asChild variant="glass">
                      <a href={`${APP_URL}/auth/login`} target="_blank" rel="noopener">Log in</a>
                    </Button>
                    <Button asChild>
                      <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
                        Create Event <ArrowOut />
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </MotionConfig>
  );
}
