import { API_URL, shiftTime } from "./api";

export const APP_URL = "https://tickets.smooth.africa";

type ApiTicket = { id: number; name: string; price: string; stock_count: number };
type ApiEvent = {
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  image?: { link?: string } | null;
  tickets?: ApiTicket[];
};

export type EventSummary = {
  name: string;
  slug: string;
  /** Absolute link on the main domain (sitemap, structured data). */
  url: string;
  /** This site's event page. */
  href: string;
  startDate: string;
  endDate: string;
  image: string | null;
  /** "Venue, City". Only fetched when asked for (one request per event). */
  location: string | null;
  city: string | null;
  fromPrice: number | null;
  tiers: { name: string; price: number }[];
};

/**
 * Venue and city from the public event endpoint the event pages use.
 * That response also carries the scanner key and organiser email, so only `location` is read.
 */
async function getLocation(slug: string): Promise<{ venue: string | null; city: string | null }> {
  try {
    const res = await fetch(`${API_URL}/ticket/whitelist?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } });
    if (!res.ok) return { venue: null, city: null };
    const json = (await res.json()) as { data?: { event?: { location?: { venue?: string; city?: string } | null } } };
    const loc = json.data?.event?.location;
    return { venue: loc?.venue?.trim() || null, city: loc?.city?.trim() || null };
  } catch {
    return { venue: null, city: null };
  }
}

/** Organisers type cities freely: "ONDO CITY", "Ondo city" and "Ondo" are one place. Title case, no trailing "city". */
export function normaliseCity(raw: string | null) {
  const c = raw?.trim().replace(/\s+city$/i, "").trim();
  if (!c) return null;
  return c.toLowerCase().replace(/(^|[\s-])\p{L}/gu, (m) => m.toUpperCase());
}

/** "The Untapped Experience {Lautech Edition}" -> "the untapped experience" */
function seriesName(name: string) {
  return name.replace(/\{[^}]*\}/g, "").trim().toLowerCase();
}

export async function getUpcomingEvents(
  limit = 10,
  { withLocation = false, onePerSeries = false } = {},
): Promise<EventSummary[]> {
  try {
    const res = await fetch(`${API_URL}/ticket/whitelist/discovery`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: { events?: ApiEvent[] }; meta?: { utc_offset?: number } };
    const now = Date.now();
    const offset = json.meta?.utc_offset;

    const events = (json.data?.events ?? [])
      .map((e) => ({ ...e, start_date: shiftTime(e.start_date, offset), end_date: shiftTime(e.end_date ?? e.start_date, offset) }))
      .filter((e) => new Date(e.end_date ?? e.start_date).getTime() >= now)
      .filter((e) => !/\btest\b/i.test(e.name))
      // Upcoming events first (soonest first); long-running ones that already started go last.
      .sort((a, b) => {
        const sa = +new Date(a.start_date);
        const sb = +new Date(b.start_date);
        const startedA = sa < now;
        const startedB = sb < now;
        if (startedA !== startedB) return startedA ? 1 : -1;
        return sa - sb;
      })
      // One card per series: editions like "The Untapped Experience {UI}" share a poster and
      // truncate to the same title, so they read as duplicates. Keep the soonest edition.
      // Off by default: the sitemap still needs every edition's page.
      .filter(
        (e, i, all) =>
          !onePerSeries || all.findIndex((o) => seriesName(o.name) === seriesName(e.name)) === i,
      )
      .slice(0, limit)
      .map((e) => {
        const tiers = (e.tickets ?? [])
          .map((t) => ({ name: t.name, price: Number(t.price) }))
          .sort((a, b) => a.price - b.price);
        return {
          name: e.name.trim(),
          slug: e.slug,
          url: `${APP_URL}/${e.slug}`,
          href: `/${e.slug}`,
          startDate: e.start_date,
          endDate: e.end_date ?? e.start_date,
          image: e.image?.link ?? null,
          location: null as string | null,
          city: null as string | null,
          fromPrice: tiers.length ? tiers[0].price : null,
          tiers,
        };
      });

    if (withLocation) {
      const locations = await Promise.all(events.map((e) => getLocation(e.slug)));
      events.forEach((e, i) => {
        const { venue, city } = locations[i];
        e.city = normaliseCity(city);
        e.location = [venue, city].filter(Boolean).join(", ") || null;
      });
    }
    return events;
  } catch {
    return [];
  }
}

export function formatNaira(n: number) {
  if (n === 0) return "Free";
  return `₦${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
}

export function formatEventDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-NG", { day: "2-digit", timeZone: "Africa/Lagos" }),
    month: d.toLocaleDateString("en-NG", { month: "short", timeZone: "Africa/Lagos" }),
    weekday: d.toLocaleDateString("en-NG", { weekday: "short", timeZone: "Africa/Lagos" }),
  };
}

/** 12-hour clock in Lagos time, like the main site: "8:00 PM". */
function formatTime(d: Date) {
  return d
    .toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" })
    .toUpperCase();
}

/** Start and end time as a range, like the main site: "8:00 PM - 4:30 AM". */
export function formatTimeRange(startIso: string, endIso: string) {
  const start = formatTime(new Date(startIso));
  const end = formatTime(new Date(endIso));
  return start === end ? start : `${start} - ${end}`;
}

/** "Saturday, 31 October 2026" in Lagos time. */
export function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });
}

const STICKER_TONES = ["sticker-amber", "sticker-lime", "sticker-pink", "sticker-sky"] as const;

/** An event's date-sticker colour, from its slug: the same on the card, the rail and the event page. */
export function stickerTone(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return STICKER_TONES[h % STICKER_TONES.length];
}
