import { APP_URL } from "@/lib/events";
import { Eyebrow } from "./ui";

// Answers state only what the product shows today. No FAQ schema: the brief rules out that shortcut.
const faqs: [string, React.ReactNode][] = [
  [
    "What is Smooth Tickets?",
    "Smooth Tickets is an online event ticketing platform for African organisers. You can create events, sell individual and group tickets, manage attendees, track earnings, and grow sales through affiliates, all in one place.",
  ],
  [
    "How do I create an event?",
    <>
      <a href={`${APP_URL}/auth/signup`} className="font-semibold text-brand hover:underline dark:text-brand-soft">
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
      <a href="/affiliates" className="font-semibold text-brand hover:underline dark:text-brand-soft">
        Learn about Smooth Affiliates
      </a>
      .
    </>,
  ],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 pt-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
            Questions, <span className="font-serif font-normal normal-case italic text-brand">answered.</span>
          </h2>
          <p className="mt-5 max-w-sm text-muted">
            Something else on your mind?{" "}
            <a href="mailto:hello@smooth.africa" className="font-semibold text-brand hover:underline dark:text-brand-soft">
              hello@smooth.africa
            </a>
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-lg transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
