import type { Metadata } from "next";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Kept out of the index until the team confirms fees, who pays them, currencies and payout timing.
// When they do, publish the real numbers here and drop `robots`.
export const metadata: Metadata = {
  ...pageMetadata({ title: "Pricing", description: "How fees work on Smooth Tickets.", path: "/pricing" }),
  robots: { index: false, follow: true },
};

export default function PricingPage() {
  return (
    <>
      <Nav overHero={false} />
      <main className="mx-auto max-w-copy px-page pt-36 pb-24 sm:pt-44">
        <h1 className="type-display">
          No surprises <span className="text-brand">at checkout.</span>
        </h1>
        <p className="mt-6 text-subtext text-muted">
          Every Smooth Tickets event page shows the ticket price and the service fee as separate lines, so buyers see the full
          amount before they pay.
        </p>

        <figure className="mt-10 card">
          <figcaption className="text-body text-muted">Example: a ₦3,000 ticket on a live event page</figcaption>
          <dl className="mt-5 space-y-3 tabular-nums">
            <div className="flex justify-between">
              <dt>Ticket</dt>
              <dd>₦3,000</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Service fee</dt>
              <dd>₦150</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 type-heading">
              <dt>Buyer pays</dt>
              <dd>₦3,150</dd>
            </div>
          </dl>
        </figure>

        <p className="mt-10 text-subtext text-muted">
          Questions about fees or payouts for your event?{" "}
          <a href="mailto:hello@smooth.africa" className="link">
            hello@smooth.africa
          </a>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`${APP_URL}/auth/signup`}>
              Create an Event <Arrow />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`${APP_URL}/discovery`}>
              Explore Events
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
