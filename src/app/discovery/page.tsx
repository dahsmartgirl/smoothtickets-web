import type { Metadata } from "next";
import { DiscoveryBrowser } from "@/components/DiscoveryBrowser";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Discover events",
  description: "Find parties, concerts, raves and meetups across Nigeria and get your tickets on Smooth Tickets.",
  path: "/discovery",
});

type Search = { q?: string; when?: string; free?: string; city?: string };

export default async function DiscoveryPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [events, params] = await Promise.all([getUpcomingEvents(200, { withLocation: true }), searchParams]);

  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <DiscoveryBrowser events={events} initial={params} />
      </main>
      <Footer />
    </>
  );
}
