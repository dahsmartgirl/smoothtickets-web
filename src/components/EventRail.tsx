import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { APP_URL, formatEventDate, formatNaira, type EventSummary } from "@/lib/events";
import { Arrow } from "./brand";
import { Button } from "./ui/button";
import { Rail } from "./Rail";
import { TicketOutline } from "./TicketOutline";
import { Reveal } from "./Reveal";

function EventCard({ event }: { event: EventSummary }) {
  const d = formatEventDate(event.startDate);
  return (
    <a href={event.url} className="event-card">
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
          <p className="type-eyebrow">{d.month}</p>
        </div>
      </div>
      {/* Content stub: the dotted ticket outline is its border. */}
      <div className="event-stub">
        <TicketOutline />
        <h3 className="line-clamp-1 type-label">{event.name}</h3>
        <p className="event-meta">
          <time dateTime={event.startDate}>
            {d.weekday} {d.day} {d.month} · {d.time}
          </time>
        </p>
        {event.location && (
          <p className="event-meta">
            <HugeiconsIcon icon={Location01Icon} strokeWidth={2} aria-hidden />
            <span className="truncate">{event.location}</span>
          </p>
        )}
        <div data-perf className="my-4 h-px" />
        <div className="flex items-center justify-between">
          <div>
            <p className="type-eyebrow text-muted">From</p>
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
          <Button asChild variant="line" className="hidden sm:inline-flex">
            <a href={`${APP_URL}/discovery`}>View All Events</a>
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
        <Button asChild variant="line" className="mt-2 w-full sm:hidden">
          <a href={`${APP_URL}/discovery`}>View All Events</a>
        </Button>
      </div>
    </section>
  );
}
