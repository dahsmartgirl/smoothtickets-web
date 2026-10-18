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
  image: string | null;
  fromPrice: number | null;
  tiers: { name: string; price: number }[];
};

export async function getUpcomingEvents(limit = 10): Promise<EventSummary[]> {
  try {
    const res = await fetch(`${API_URL}/ticket/whitelist/discovery`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: { events?: ApiEvent[] } };
    const now = Date.now();

    return (json.data?.events ?? [])
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
          image: e.image?.link ?? null,
          fromPrice: tiers.length ? tiers[0].price : null,
          tiers,
        };
      });
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
    month: d.toLocaleDateString("en-NG", { month: "short", timeZone: "Africa/Lagos" }).toUpperCase(),
    weekday: d.toLocaleDateString("en-NG", { weekday: "short", timeZone: "Africa/Lagos" }),
    time: d
      .toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" })
      .toUpperCase(),
  };
}
