import Image from "next/image";
import { APP_URL, formatEventDate, formatNaira, type EventSummary } from "@/lib/events";
import { Arrow, Eyebrow } from "./ui";
import { Rail } from "./Rail";
import { Reveal } from "./Reveal";

const stickers = ["bg-flame", "bg-lime", "bg-pink", "bg-brand-soft"];

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
          className={`absolute top-4 left-4 rounded-xl ${stickers[i % stickers.length]} px-3 py-1.5 text-center text-night shadow-lg`}
        >
          <p className="font-display text-xl leading-none font-black">{d.day}</p>
          <p className="text-[10px] font-bold tracking-widest">{d.month}</p>
        </div>
      </div>
      {/* stub */}
      <div className="ticket rounded-b-3xl bg-surface px-5 pt-4 pb-5 text-fg shadow-[0_20px_40px_-25px_rgba(10,18,48,.35)]" style={{ ["--notch-y" as string]: "0px" }}>
        <h3 className="line-clamp-1 font-display text-sm font-bold">{event.name}</h3>
        <p className="mt-1 text-xs text-muted">
          <time dateTime={event.startDate}>
            {d.weekday} {d.day} {d.month} · {d.time}
          </time>
        </p>
        <div className="perf-x my-3 text-fg/15" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-muted uppercase">From</p>
            <p className="font-display text-base font-extrabold">
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Discover events</Eyebrow>
            <h2 id="events-title" className="mt-3 font-display text-3xl font-black tracking-tight uppercase sm:text-5xl">
              Find your next <span className="font-serif font-normal normal-case italic text-brand">experience.</span>
            </h2>
            <p className="mt-4 text-muted">Discover events worth showing up for.</p>
          </Reveal>
          <a
            href={`${APP_URL}/discovery`}
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-muted hover:text-fg sm:flex"
          >
            View all events <Arrow />
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <a
          href={`${APP_URL}/discovery`}
          className="mt-2 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-fg ring-1 ring-line sm:hidden"
        >
          View all events <Arrow />
        </a>
      </div>
    </section>
  );
}
