import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { AffiliateTracker } from "@/components/event/AffiliateTracker";
import { EventAbout } from "@/components/event/EventAbout";
import { EventHeader } from "@/components/event/EventHeader";
import { TicketPanel } from "@/components/event/TicketPanel";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { getEvent } from "@/lib/event";
import { APP_URL, formatLongDate } from "@/lib/events";
import { totalFor } from "@/lib/tickets";

export const revalidate = 60;

// generateMetadata and the page share one fetch.
const load = cache(getEvent);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await load((await params).slug);
  if (!event) return { title: "Event not found" };
  const where = event.location ? ` at ${event.location.venue || event.location.city}` : "";
  const description =
    event.description.replace(/\s+/g, " ").slice(0, 155) || `Get tickets for ${event.name}, ${formatLongDate(event.startDate)}${where}.`;
  const images = event.image ? [{ url: event.image, alt: `Poster for ${event.name}` }] : undefined;
  return {
    title: event.name,
    description,
    alternates: { canonical: `/${event.slug}` },
    openGraph: { type: "website", siteName: "Smooth Tickets", locale: "en_NG", title: event.name, description, url: `/${event.slug}`, images },
    twitter: { card: "summary_large_image", title: event.name, description, images },
  };
}

export default async function EventPage({ params }: Props) {
  const event = await load((await params).slug);
  if (!event) notFound();
  const ended = +new Date(event.endDate) < Date.now();

  // schema.org Event: only facts shown on the page. Lets search engines show date, venue and price.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description || undefined,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: event.image ? [event.image] : undefined,
    url: `${APP_URL}/${event.slug}`,
    location: event.location
      ? {
          "@type": "Place",
          name: event.location.venue || event.location.city,
          address: {
            "@type": "PostalAddress",
            streetAddress: event.location.address || undefined,
            addressLocality: event.location.city || undefined,
            addressRegion: event.location.state || undefined,
            addressCountry: "NG",
          },
        }
      : undefined,
    organizer: event.host ? { "@type": "Organization", name: event.host } : undefined,
    offers: event.tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: totalFor(t),
      priceCurrency: "NGN",
      availability: t.stock !== null && t.stock <= 0 ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${APP_URL}/${event.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AffiliateTracker slug={event.slug} />
      <Nav />
      <main className="overflow-x-clip">
        <EventHeader event={event} ended={ended} />
        <div className="container-page event-body">
          <TicketPanel
            event={{ id: event.id, slug: event.slug, name: event.name }}
            tiers={event.tiers}
            ended={ended}
          />
          <EventAbout event={event} />
        </div>
      </main>
      <Footer />
    </>
  );
}
