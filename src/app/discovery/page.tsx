import type { Metadata, Viewport } from "next";
import { DiscoveryBrowser } from "@/components/DiscoveryBrowser";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { APP_URL, getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Upcoming Events in Nigeria: Parties, Concerts & More",
  description:
    "Find upcoming parties, concerts, raves, festivals and meetups across Nigeria. See dates, venues and ticket prices, then buy your tickets on Smooth Tickets.",
  path: "/discovery",
});

type Search = { q?: string; when?: string; free?: string };

export default async function DiscoveryPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [events, params] = await Promise.all([getUpcomingEvents(200, { withLocation: true }), searchParams]);

  // The events on the page, in order, so search and answer engines read the list as a list of events.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming events on Smooth Tickets",
    url: `${APP_URL}/discovery`,
    numberOfItems: events.length,
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: e.url,
      name: e.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <DiscoveryBrowser events={events} initial={params} />
      </main>
      <Footer />
    </>
  );
}
