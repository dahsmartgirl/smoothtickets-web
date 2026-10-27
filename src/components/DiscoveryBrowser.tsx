"use client";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { overlaps, windowFor } from "@/lib/dates";
import type { EventSummary } from "@/lib/events";
import { cardSwap } from "@/lib/motion";
import { EventCard } from "./EventRail";
import { Button } from "./ui/button";

type Initial = { q?: string; when?: string; free?: string };

/**
 * Discovery: a navy header with search and quick filters over a grid of event cards.
 * Everything filters on the page, instantly; the filters mirror into the URL so a filtered view can be shared.
 */
export function DiscoveryBrowser({ events, initial }: { events: EventSummary[]; initial: Initial }) {
  const [q, setQ] = useState(initial.q ?? "");
  const [week, setWeek] = useState(initial.when === "week");
  const [free, setFree] = useState(initial.free === "1");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const range = week ? windowFor("week") : null;
    return events.filter(
      (e) =>
        (!needle || `${e.name} ${e.location ?? ""}`.toLowerCase().includes(needle)) &&
        (!range || overlaps(e.startDate, e.endDate, range)) &&
        (!free || e.tiers.some((t) => t.price === 0)),
    );
  }, [events, q, week, free]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (week) p.set("when", "week");
    if (free) p.set("free", "1");
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [q, week, free]);

  const filtered = !!(q.trim() || week || free);
  const reset = () => {
    setQ("");
    setWeek(false);
    setFree(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="discover-title" className="page-head">
        <div className="container-page">
          <h1 id="discover-title" className="type-display">
            Find your next <span className="text-brand">experience.</span>
          </h1>
          <p className="mt-5 max-w-copy text-lead text-on-dark-muted">
            Parties, concerts, raves and meetups across Nigeria. Discover events worth showing up for.
          </p>

          <div className="mt-9 flex max-w-[36rem] flex-col gap-4">
            <label className="search">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} aria-hidden />
              <span className="sr-only">Search events</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search events, venues, cities"
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
            <button type="button" className="chip" aria-pressed={week} onClick={() => setWeek(!week)}>
              This week
            </button>
            <button type="button" className="chip" aria-pressed={free} onClick={() => setFree(!free)}>
              Free
            </button>
          </div>
        </div>
      </section>

      <section aria-label="Events" className="container-page pt-6 pb-24 sm:pt-10">

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
