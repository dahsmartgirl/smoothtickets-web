import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { APP_URL, formatLongDate, getUpcomingEvents } from "@/lib/events";

export const revalidate = 3600;

// Questions people ask answer engines, answered only with what the site itself says (homepage, pricing,
// affiliates and legal pages). Keep in step with those pages when their copy changes.
const faq: [string, string][] = [
  [
    "What is Smooth Tickets?",
    "Smooth Tickets is an online event ticketing platform for African organisers. You can create events, sell individual and group tickets, manage attendees, track earnings, and grow sales through affiliates, all in one place.",
  ],
  [
    "How do I create an event?",
    `Create an account at ${APP_URL}/auth/signup, tap Create Event on your dashboard, add your event details and ticket types, then share your event's public link.`,
  ],
  [
    "Can I sell group tickets and offer discounts?",
    "Yes. Each ticket type can admit more than one person, so you can sell group tickets and tables alongside individual tickets, and you can offer discount codes on the ticket types you choose.",
  ],
  [
    "What does Smooth Tickets cost?",
    "Smooth Tickets charges a 5% service fee on each paid ticket. Organisers set their own ticket prices; the 5% fee is added on top and shown on its own line next to the ticket on the event page, so buyers see the full total before they pay. Free tickets carry no service fee, and there is no other charge.",
  ],
  [
    "How do organisers get paid?",
    "Payouts are automatic. Ticket sales are grouped into batches and paid to the organiser's bank account, usually within a few hours. Payments are processed by Paystack.",
  ],
  [
    "How does check-in work?",
    "Every ticket has a unique QR code. On event day, the organiser opens the Smooth Tickets scanner, signs in with the Event ID and Scanner Key from the event's Event Info tab, and scans each guest's code at the door. Each code can only be scanned once.",
  ],
  [
    "What is Smooth Affiliates?",
    "Smooth Affiliates is the promoter network built into Smooth Tickets. Affiliates share an event's ticket link, and every ticket sold through that link earns them a commission.",
  ],
  [
    "Who can become an affiliate?",
    `Anyone can create an affiliate account at ${APP_URL}/affiliate/auth/signup. Each organiser decides who can promote their event: open it to every affiliate, or keep it invite-only.`,
  ],
  [
    "How much do affiliates earn?",
    "The organiser sets the commission for each ticket type, so it differs from event to event. Affiliate commission is paid out automatically in batches, usually within a few hours.",
  ],
  [
    "How are affiliate sales tracked?",
    "Each sale is tracked against the affiliate link it came from. A sale counts when the buyer opens the event through the affiliate's link and buys within 30 days on the same device and browser.",
  ],
  [
    "Can I get a refund?",
    "Refunds are decided by the event's organiser, so contact them first. If an event is cancelled, the organiser refunds ticket holders. The service fee is not refundable except where the law requires it.",
  ],
  ["How do I contact Smooth Tickets?", `On WhatsApp (${WHATSAPP_URL}) or by email at ${CONTACT_EMAIL}.`],
];

/**
 * /llms.txt (llmstxt.org): a plain-text briefing for AI answer engines: what Smooth Tickets is, how it works,
 * the questions people ask, the key pages and the events on sale now. Only facts the site itself shows.
 */
export async function GET() {
  const events = await getUpcomingEvents(100, { withLocation: true });
  const lines = [
    "# Smooth Tickets",
    "",
    "> Smooth Tickets is an online event ticketing platform for African organisers, based in Nigeria and run by Smooth Africa. Organisers create events, sell individual and group tickets, manage attendees, track earnings, check guests in with QR codes, and grow sales through affiliates. Buyers discover events and buy tickets with Paystack.",
    "",
    "## How it works",
    "",
    "1. Create: set up your event and customise tickets (individual, group and table tickets, each with its own price and stock).",
    "2. Sell: accept individual and group ticket purchases, with discount codes.",
    "3. Manage: track ticket sales, revenue, attendees and payouts in your dashboard.",
    "4. Check in: verify tickets with QR codes on event day.",
    "",
    "## Pricing",
    "",
    "- Organisers set the ticket price for each ticket type, or make tickets free.",
    "- The only charge is a 5% service fee on each paid ticket, added on top of the ticket price and shown on its own line on the event page. Example from a live event page: a ₦3,000 ticket shows a ₦150 service fee, so the buyer pays ₦3,150.",
    "- Buyers see the full total, fee included, before they pay.",
    "- Free tickets carry no service fee.",
    "- Payouts to organisers and affiliates are automatic: sales are batched and usually arrive within a few hours.",
    "",
    "## Questions and answers",
    "",
    ...faq.flatMap(([q, a]) => [`### ${q}`, "", a, ""]),
    "## Pages",
    "",
    `- [Discover events](${APP_URL}/discovery): upcoming parties, concerts, raves and meetups across Nigeria`,
    `- [Pricing](${APP_URL}/pricing): how the service fee and payouts work`,
    `- [Smooth Affiliates](${APP_URL}/affiliates): share event links and earn commission on every ticket sold`,
    `- [Contact](${APP_URL}/contact): WhatsApp or ${CONTACT_EMAIL}`,
    `- [Create an event](${APP_URL}/auth/signup)`,
    `- [Become an affiliate](${APP_URL}/affiliate/auth/signup)`,
    `- [Terms of Service](${APP_URL}/terms)`,
    `- [Privacy Policy](${APP_URL}/privacy)`,
    "",
    "## Upcoming events",
    "",
    ...events.map((e) => `- [${e.name}](${e.url}): ${formatLongDate(e.startDate)}${e.location ? `, ${e.location}` : ""}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
