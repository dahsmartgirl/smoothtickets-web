import type { Metadata } from "next";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow, Button, Eyebrow } from "@/components/ui";
import { APP_URL } from "@/lib/events";

// Kept out of the index until the team confirms fees, who pays them, currencies and payout timing.
// When they do, publish the real numbers here and drop `robots`.
export const metadata: Metadata = {
  title: "Pricing",
  description: "How fees work on Smooth Tickets.",
  alternates: { canonical: "/pricing" },
  robots: { index: false, follow: true },
};

export default function PricingPage() {
  return (
    <>
      <Nav overHero={false} />
      <main className="mx-auto max-w-3xl px-4 pt-36 pb-24 sm:px-6 sm:pt-44">
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.95] font-black tracking-[-0.03em] uppercase">
          No surprises <span className="font-serif font-normal tracking-normal normal-case italic text-brand">at checkout.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Every Smooth Tickets event page shows the ticket price and the service fee as separate lines, so buyers see the full
          amount before they pay.
        </p>

        <figure className="mt-10 rounded-3xl bg-surface p-7 ring-1 ring-line">
          <figcaption className="text-sm font-semibold text-muted">Example: a ₦3,000 ticket on a live event page</figcaption>
          <dl className="mt-5 space-y-3">
            <div className="flex justify-between">
              <dt>Ticket</dt>
              <dd className="font-semibold">₦3,000</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Service fee</dt>
              <dd>₦150</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-display text-lg font-extrabold">
              <dt>Buyer pays</dt>
              <dd>₦3,150</dd>
            </div>
          </dl>
        </figure>

        <p className="mt-10 leading-relaxed text-muted">
          Questions about fees or payouts for your event?{" "}
          <a href="mailto:hello@smooth.africa" className="font-semibold text-brand hover:underline dark:text-brand-soft">
            hello@smooth.africa
          </a>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`${APP_URL}/auth/signup`}>
            Create an Event <Arrow />
          </Button>
          <Button href={`${APP_URL}/discovery`} variant="outline">
            Explore Events
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
