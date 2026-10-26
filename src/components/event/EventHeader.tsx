import { Calendar03Icon, Clock01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import type { EventDetail } from "@/lib/event";
import { formatEventDate, formatLongDate, formatTimeRange, stickerTone } from "@/lib/events";
import { Arrow } from "../brand";
import { Button } from "../ui/button";
import { ShareButton } from "./ShareButton";

/**
 * Navy header tinted by the event's own poster (blown up and blurred behind a scrim), with the poster as a
 * ticket on the left and the essentials on the right: who, when, where.
 */
export function EventHeader({ event, ended }: { event: EventDetail; ended: boolean }) {
  const d = formatEventDate(event.startDate);
  const place = event.location;

  return (
    <section aria-labelledby="event-title" className="event-head">
      {event.image && (
        <div aria-hidden className="event-backdrop">
          <Image src={event.image} alt="" fill sizes="100vw" priority />
        </div>
      )}
      <div className="container-page event-head-inner">
        <div className="event-poster-lg">
          {event.image ? (
            <Image src={event.image} alt={`Poster for ${event.name}`} fill sizes="(min-width: 1024px) 360px, 90vw" priority />
          ) : (
            <span className="type-display text-on-dark-faint">{d.day}</span>
          )}
          <div className={`sticker ${stickerTone(event.slug)}`}>
            <p className="type-number text-heading leading-none">{d.day}</p>
            <p className="type-caption">{d.month}</p>
          </div>
        </div>

        <div className="min-w-0">
          {event.host && <p className="text-body text-on-dark-muted">Hosted by {event.host}</p>}
          <h1 id="event-title" className="event-title">
            {event.name}
          </h1>

          <ul className="mt-7 space-y-4">
            <li className="event-fact">
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} aria-hidden />
              <span>
                <time dateTime={event.startDate}>{formatLongDate(event.startDate)}</time>
                {ended && <span className="ml-2 badge bg-glass-strong">Ended</span>}
              </span>
            </li>
            <li className="event-fact">
              <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} aria-hidden />
              <span>{formatTimeRange(event.startDate, event.endDate)}</span>
            </li>
            {place && (
              <li className="event-fact">
                <HugeiconsIcon icon={Location01Icon} strokeWidth={2} aria-hidden />
                <span>
                  {place.venue || place.city}
                  <span className="block text-on-dark-muted">
                    {[place.address, place.venue ? place.city : null, place.state].filter(Boolean).join(", ")}
                  </span>
                </span>
              </li>
            )}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {!ended && (
              <Button asChild>
                <a href="#tickets">
                  Get tickets <Arrow />
                </a>
              </Button>
            )}
            <ShareButton title={event.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
