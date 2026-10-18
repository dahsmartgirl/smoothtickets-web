import type { MetadataRoute } from "next";
import { APP_URL, getUpcomingEvents } from "@/lib/events";

export const revalidate = 3600;

// /pricing is left out while it is noindex (see app/pricing/page.tsx).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getUpcomingEvents(500);
  return [
    { url: APP_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${APP_URL}/discovery`, changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/affiliates`, changeFrequency: "monthly", priority: 0.7 },
    ...events.map((e) => ({ url: e.url, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}
