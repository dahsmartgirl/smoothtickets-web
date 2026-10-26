import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { APP_URL } from "@/lib/events";
import { Arrow } from "./brand";
import { Button } from "./ui/button";
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
      <a href={`${APP_URL}/auth/signup`} className="link">
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
      <a href="/affiliates" className="link">
        Learn about Smooth Affiliates
      </a>
      .
    </>,
  ],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-top scroll-mt-24">
      {/* Phones: intro, questions, then the contact box. Desktop: intro and contact box on the left, questions on the right. */}
      <div className="container-page layout-aside faq-layout">
        <div className="faq-intro">
          <h2 id="faq-title" className="type-title">
            Questions, answered
          </h2>
          <p className="mt-5 max-w-narrow text-lead text-muted">Everything organisers usually ask before their first event.</p>
        </div>

        <Accordion type="single" collapsible defaultValue={faqs[0][0]} className="faq-list">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="faq-contact card-dark">
          <span className="icon-btn bg-glass">
            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} aria-hidden />
          </span>
          <p className="mt-4 type-subheading">Still curious?</p>
          <p className="mt-1 text-body text-on-dark-muted">Ask us anything about running your event on Smooth Tickets.</p>
          <Button asChild size="sm" className="mt-5">
            <a href="mailto:hello@smooth.africa">
              Contact us <Arrow />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
