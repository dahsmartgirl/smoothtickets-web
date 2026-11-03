import type { Viewport } from "next";
import { Affiliates } from "@/components/Affiliates";
import { EventRail } from "@/components/EventRail";
import { Faq } from "@/components/Faq";
import { FinalCta, Footer } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { getUpcomingEvents } from "@/lib/events";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const revalidate = 300;

export default async function Home() {
  const events = await getUpcomingEvents(6, { withLocation: true, onePerSeries: true });

  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        {/* The final CTA sits pinned underneath this layer and is uncovered as it scrolls away. */}
        <div className="above-cta">
          <Hero />
          <EventRail events={events} />
          <HowItWorks />
          <Affiliates />
          <Faq />
        </div>
        <FinalCta />
      </main>
      <Footer torn={false} />
    </>
  );
}
