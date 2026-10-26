import { CONTACT_EMAIL } from "@/lib/contact";
import { APP_URL, formatLongDate, getUpcomingEvents } from "@/lib/events";

export const revalidate = 3600;

/**
 * /llms.txt (llmstxt.org): a plain-text map of the site for AI answer engines, with what Smooth Tickets is,
 * the key pages and the events on sale now. Only facts the site itself shows.
 */
export async function GET() {
  const events = await getUpcomingEvents(100, { withLocation: true });
  const lines = [
    "# Smooth Tickets",
    "",
    "> Smooth Tickets is an online event ticketing platform for African organisers. Create events, sell individual and group tickets, manage attendees, track earnings, check guests in with QR codes, and grow sales through affiliates.",
    "",
    "Buyers see the ticket price and the service fee as separate lines on every event page, so they know the full amount before they pay. Payments go through Paystack.",
    "",
    "## Pages",
    "",
    `- [Discover events](${APP_URL}/discovery): upcoming parties, concerts, raves and meetups across Nigeria`,
    `- [Smooth Affiliates](${APP_URL}/affiliates): share event links and earn commission on every ticket sold`,
    `- [Pricing](${APP_URL}/pricing): how the service fee works`,
    `- [Contact](${APP_URL}/contact): WhatsApp or ${CONTACT_EMAIL}`,
    `- [Create an event](${APP_URL}/auth/signup)`,
    "",
    "## Upcoming events",
    "",
    ...events.map((e) => `- [${e.name}](${e.url}): ${formatLongDate(e.startDate)}${e.location ? `, ${e.location}` : ""}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
