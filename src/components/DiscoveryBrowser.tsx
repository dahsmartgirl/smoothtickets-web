"use client";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { overlaps, windowFor, type When } from "@/lib/dates";
import type { EventSummary } from "@/lib/events";
import { cardSwap } from "@/lib/motion";
import { EventCard } from "./EventRail";
import { Button } from "./ui/button";

const WHEN: { value: When; label: string }[] = [
  { value: "weekend", label: "This weekend" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
];

type Initial = { q?: string; when?: string; free?: string; city?: string };

/**
 * Discovery: a navy header with search and quick filters over a grid of event cards.
 * Everything filters on the page, instantly; the filters mirror into the URL so a filtered view can be shared.
 */
export function DiscoveryBrowser({ events, initial }: { events: EventSummary[]; initial: Initial }) {
  const [q, setQ] = useState(initial.q ?? "");
  const [when, setWhen] = useState<When | null>(WHEN.some((w) => w.value === initial.when) ? (initial.when as When) : null);
  const [free, setFree] = useState(initial.free === "1");
  const [city, setCity] = useState<string | null>(initial.city ?? null);

  // Cities with something on, most events first.
  const cities = useMemo(() => {
    const count = new Map<string, number>();
    for (const e of events) if (e.city) count.set(e.city, (count.get(e.city) ?? 0) + 1);
    return [...count].sort((a, b) => b[1] - a[1]).map(([c]) => c);
  }, [events]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const range = when ? windowFor(when) : null;
    return events.filter(
      (e) =>
        (!needle || `${e.name} ${e.location ?? ""}`.toLowerCase().includes(needle)) &&
        (!range || overlaps(e.startDate, e.endDate, range)) &&
        (!free || e.tiers.some((t) => t.price === 0)) &&
        (!city || e.city === city),
    );
  }, [events, q, when, free, city]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (when) p.set("when", when);
    if (free) p.set("free", "1");
    if (city) p.set("city", city);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [q, when, free, city]);

  const filtered = !!(q.trim() || when || free || city);
  const reset = () => {
    setQ("");
    setWhen(null);
    setFree(false);
    setCity(null);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="discover-title" className="page-head">
        <div className="container-page">
          <h1 id="discover-title" className="type-display">
            Find your next <span className="text-brand">experience.</span>
          </h1>
          <p className="mt-5 max-w-copy text-lead text-on-dark-muted">Discover events worth showing up for.</p>

          <div className="mt-9 flex max-w-[36rem] flex-col gap-4">
            <label className="search">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} aria-hidden />
              <span className="sr-only">Search events</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by event, venue or city"
                autoComplete="off"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="search-clear">
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} aria-hidden />
                </button>
              )}
            </label>
          </div>

          <div className="chip-row no-scrollbar" role="group" aria-label="Filters">
            <button type="button" className="chip" aria-pressed={!filtered} onClick={reset}>
              All
            </button>
            {WHEN.map((w) => (
              <button
                key={w.value}
                type="button"
                className="chip"
                aria-pressed={when === w.value}
                onClick={() => setWhen(when === w.value ? null : w.value)}
              >
                {w.label}
              </button>
            ))}
            <button type="button" className="chip" aria-pressed={free} onClick={() => setFree(!free)}>
              Free
            </button>
            {cities.length > 1 && <span aria-hidden className="chip-divider" />}
            {cities.length > 1 &&
              cities.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={city === c} onClick={() => setCity(city === c ? null : c)}>
                  {c}
                </button>
              ))}
          </div>
        </div>
      </section>

      <section aria-label="Events" className="container-page pt-12 pb-24 sm:pt-16">
        <p className="text-body text-muted" aria-live="polite">
          {shown.length === 1 ? "1 event" : `${shown.length} events`}
          {filtered && shown.length > 0 && (
            <>
              {" · "}
              <button type="button" onClick={reset} className="link">
                Clear filters
              </button>
            </>
          )}
        </p>

        {shown.length ? (
          <motion.ul layout className="event-grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((e) => (
                <motion.li key={e.slug} layout variants={cardSwap} initial="out" animate="in" exit="out">
                  <EventCard event={e} className="event-card-grid" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="empty-state">
            <p className="type-heading">Nothing matches that yet.</p>
            <p className="mt-2 text-body text-muted">
              {events.length ? "Try another search or clear the filters." : "New events are added all the time. Check back soon."}
            </p>
            {filtered && (
              <Button variant="line" className="mt-6" onClick={reset}>
                Clear filters
              </Button>
            )}
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
