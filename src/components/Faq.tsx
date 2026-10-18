import { APP_URL } from "@/lib/events";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

// Answers state only what the product shows today. No FAQ schema: the brief rules out that shortcut.
const faqs: [string, React.ReactNode][] = [
  [
    "What is Smooth Tickets?",
    "Smooth Tickets is an online event ticketing platform for African organisers. You can create events, sell individual and group tickets, manage attendees, track earnings, and grow sales through affiliates, all in one place.",
  ],
  [
    "How do I create an event?",
    <>
      <a href={`${APP_URL}/auth/signup`} className="font-semibold text-brand-deep hover:underline dark:text-brand-soft">
        Create an account
      </a>
      , tap Create Event on your dashboard, add your event details and ticket types, then share your event&apos;s public link.
    </>,
  ],
  [
    "Can I sell group tickets and offer discounts?",
    "Yes. Each ticket type can admit more than one person, so you can sell group tickets and tables alongside individual tickets, and you can offer discounts to buyers.",
  ],
  [
    "What does it cost?",
    "Buyers see the ticket price and the service fee as separate lines on the event page, so they know the full amount before they pay.",
  ],
  [
    "How does check-in work?",
    "Every ticket has a unique QR code. On event day, open the scanner, sign in with the Event ID and Scanner Key from your event's Event Info tab, and scan each guest's code at the door.",
  ],
  [
    "How do affiliates work?",
    <>
      Affiliates share your event link and earn a commission, which you set per ticket type, on every ticket they sell.{" "}
      <a href="/affiliates" className="font-semibold text-brand-deep hover:underline dark:text-brand-soft">
        Learn about Smooth Affiliates
      </a>
      .
    </>,
  ],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 pt-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-page lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
            Questions, <span className="text-brand">answered.</span>
          </h2>
          <p className="mt-5 max-w-sm text-lead text-muted">
            Something else on your mind?{" "}
            <a href="mailto:hello@smooth.africa" className="font-semibold text-brand-deep hover:underline dark:text-brand-soft">
              hello@smooth.africa
            </a>
          </p>
        </div>
        <Accordion type="single" collapsible className="border-y border-line">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent className="max-w-2xl text-lead text-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
