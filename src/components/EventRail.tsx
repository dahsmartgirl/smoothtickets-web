import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { APP_URL, formatEventDate, formatNaira, type EventSummary } from "@/lib/events";
import { Arrow } from "./brand";
import { Button } from "./ui/button";
import { Rail } from "./Rail";
import { TicketOutline } from "./TicketOutline";
import { Reveal } from "./Reveal";

const stickers = ["bg-flame", "bg-lime", "bg-pink", "bg-brand-soft"];
// Hand-placed look: each date sticker sits at a slight angle.
const tilts = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

function EventCard({ event, i }: { event: EventSummary; i: number }) {
  const d = formatEventDate(event.startDate);
  return (
    <a
      href={event.url}
      className="group relative flex w-[78%] max-w-[300px] shrink-0 snap-start flex-col sm:w-[300px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl bg-surface-2">
        {event.image && (
          <Image
            src={event.image}
            alt={`Poster for ${event.name}`}
            fill
            sizes="(min-width: 640px) 300px, 78vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div
          className={`absolute top-4 left-4 rounded-xl ${stickers[i % stickers.length]} ${tilts[i % tilts.length]} px-3 py-1.5 text-center text-night`}
        >
          <p className="font-display text-xl leading-none font-black tabular-nums">{d.day}</p>
          <p className="text-[10px] font-bold tracking-widest">{d.month}</p>
        </div>
      </div>
      {/* Content stub: the dotted ticket outline is its border. */}
      <div className="relative px-6 pt-5 pb-6 text-fg">
        <TicketOutline />
        <h3 className="line-clamp-1 font-display text-sm font-bold">{event.name}</h3>
        <p className="mt-1.5 text-xs text-muted tabular-nums">
          <time dateTime={event.startDate}>
            {d.weekday} {d.day} {d.month} · {d.time}
          </time>
        </p>
        {event.location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <HugeiconsIcon icon={Location01Icon} size={12} strokeWidth={2} className="shrink-0" aria-hidden />
            <span className="truncate">{event.location}</span>
          </p>
        )}
        <div data-perf className="my-4 h-px" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">From</p>
            <p className="font-display text-base font-extrabold tabular-nums">
              {event.fromPrice === null ? "—" : formatNaira(event.fromPrice)}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-[#0068d9]">
            Get tickets <Arrow className="size-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function EventRail({ events }: { events: EventSummary[] }) {
  if (!events.length) return null;
  return (
    <section id="events" aria-labelledby="events-title" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 id="events-title" className="font-display text-3xl font-black tracking-tight uppercase sm:text-5xl">
              Find your next <span className="text-brand">experience.</span>
            </h2>
            <p className="mt-3 text-lead text-muted">Discover events worth showing up for.</p>
          </Reveal>
          <a
            href={`${APP_URL}/discovery`}
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-muted hover:text-fg sm:flex"
          >
            View All Events <Arrow />
          </a>
        </div>
      </div>
      <div className="mt-8">
        <Rail label="Upcoming events">
          {events.map((e, i) => (
            <EventCard key={e.slug} event={e} i={i} />
          ))}
        </Rail>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <Button asChild variant="outline" className="mt-2 w-full sm:hidden">
          <a href={`${APP_URL}/discovery`}>
            View All Events <Arrow />
          </a>
        </Button>
      </div>
    </section>
  );
}
