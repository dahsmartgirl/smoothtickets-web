import { Location01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { formatEventDate, formatNaira, formatTimeRange, type EventSummary } from "@/lib/events";
import { Arrow } from "./brand";
import { Button } from "./ui/button";
import { Rail } from "./Rail";
import { TicketOutline } from "./TicketOutline";
import { Reveal } from "./Reveal";

export function EventCard({ event, className = "" }: { event: EventSummary; className?: string }) {
  const d = formatEventDate(event.startDate);
  return (
    <a href={event.href} className={`event-card ${className}`}>
      <div className="event-poster">
        {event.image && (
          <Image
            src={event.image}
            alt={`Poster for ${event.name}`}
            fill
            sizes="(min-width: 640px) 300px, 78vw"
          />
        )}
        <div className="sticker">
          <p className="type-number text-heading leading-none">{d.day}</p>
          <p className="type-caption">{d.month}</p>
        </div>
      </div>
      {/* Content stub: the dotted ticket outline is its border. */}
      <div className="event-stub">
        <TicketOutline />
        <h3 className="line-clamp-1 type-label">{event.name}</h3>
        <p className="event-meta">
          <time dateTime={event.startDate}>
            {d.weekday} {d.day} {d.month} · {formatTimeRange(event.startDate, event.endDate)}
          </time>
        </p>
        {event.location && (
          <p className="event-meta">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={2} aria-hidden />
            <span className="truncate">{event.location}</span>
          </p>
        )}
        <div data-perf className="my-4 h-px" />
        {/* Price and button share a row; when the card is too narrow for both (small phones, long prices), the button wraps under the price. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div>
            <p className="type-caption text-muted">From</p>
            <p className="type-number text-subheading">
              {event.fromPrice === null ? "—" : formatNaira(event.fromPrice)}
            </p>
          </div>
          <span className="event-cta">
            Get tickets <Arrow />
          </span>
        </div>
      </div>
    </a>
  );
}

export function EventRail({ events }: { events: EventSummary[] }) {
  if (!events.length) return null;
  return (
    <section id="events" aria-labelledby="events-title" className="section relative scroll-mt-24">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 id="events-title" className="type-title">
              Find your next experience
            </h2>
            <p className="mt-3 text-lead text-muted">Discover events worth showing up for.</p>
          </Reveal>
          <Button asChild variant="line" size="lg" className="hidden sm:inline-flex">
            <Link href="/discovery">View All Events</Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Rail label="Upcoming events">
          {events.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </Rail>
      </div>
      <div className="container-page">
        <Button asChild variant="line" size="lg" className="mt-2 w-full sm:hidden">
          <Link href="/discovery">View All Events</Link>
        </Button>
      </div>
    </section>
  );
}
