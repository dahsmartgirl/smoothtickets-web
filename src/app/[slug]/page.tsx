import type { Metadata, Viewport } from "next";
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

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const revalidate = 60;

// generateMetadata and the page share one fetch.
const load = cache(getEvent);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await load((await params).slug);
  if (!event) return { title: "Event not found" };
  const place = event.location;
  const where = place ? [place.venue, place.city].filter(Boolean).join(", ") : "";
  const date = formatLongDate(event.startDate);
  // Searches are "<event> tickets", often with the date or city: answer all three in the title and the
  // first words of the description, then the organiser's own copy.
  const title = `${event.name} Tickets${place?.city ? `, ${place.city}` : ""}`;
  const lead = `${date}${where ? ` at ${where}` : ""}. Get tickets on Smooth Tickets.`;
  const blurb = event.description.replace(/\s+/g, " ").trim();
  const full = blurb ? `${lead} ${blurb}` : lead;
  const description = full.length > 160 ? `${full.slice(0, 157).replace(/\s+\S*$/, "")}…` : full;
  const images = event.image ? [{ url: event.image, alt: `Poster for ${event.name}` }] : undefined;
  return {
    title,
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
  const url = `${APP_URL}/${event.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${url}#event`,
    name: event.name,
    description: event.description || undefined,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: event.image ? [event.image] : undefined,
    url,
    isAccessibleForFree: event.tiers.length > 0 && event.tiers.every((t) => t.price === 0),
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
      url,
    })),
  };
  // Home > Discover events > this event, for the breadcrumb trail in search results
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Smooth Tickets", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "Discover events", item: `${APP_URL}/discovery` },
      { "@type": "ListItem", position: 3, name: event.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]) }} />
      <AffiliateTracker slug={event.slug} />
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <EventHeader event={event} ended={ended} />
        <div data-stagger className="container-page event-body">
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
