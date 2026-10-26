export const APP_URL = "https://tickets.smooth.africa";
const API_URL = "https://api.smoothballot.com";

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
  url: string;
  startDate: string;
  endDate: string;
  image: string | null;
  /** "Venue, City". Only fetched when asked for (one request per event). */
  location: string | null;
  fromPrice: number | null;
  tiers: { name: string; price: number }[];
};

/**
 * Venue and city from the public event endpoint the event pages use.
 * That response also carries the scanner key and organiser email, so only `location` is read.
 */
async function getLocation(slug: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/ticket/whitelist?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: { event?: { location?: { venue?: string; city?: string } | null } } };
    const loc = json.data?.event?.location;
    const parts = [loc?.venue?.trim(), loc?.city?.trim()].filter(Boolean);
    return parts.length ? parts.join(", ") : null;
  } catch {
    return null;
  }
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
    const json = (await res.json()) as { data?: { events?: ApiEvent[] } };
    const now = Date.now();

    const events = (json.data?.events ?? [])
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
          startDate: e.start_date,
          endDate: e.end_date ?? e.start_date,
          image: e.image?.link ?? null,
          location: null as string | null,
          fromPrice: tiers.length ? tiers[0].price : null,
          tiers,
        };
      });

    if (withLocation) {
      const locations = await Promise.all(events.map((e) => getLocation(e.slug)));
      events.forEach((e, i) => (e.location = locations[i]));
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
