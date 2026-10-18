import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Kept out of the index until the team confirms fees, who pays them, currencies and payout timing.
// When they do, publish the real numbers here and drop `robots`.
// Opens on the white page background, not the dark hero.
export const viewport: Viewport = { themeColor: "#ffffff" };

export const metadata: Metadata = {
  ...pageMetadata({ title: "Pricing", description: "How fees work on Smooth Tickets.", path: "/pricing" }),
  robots: { index: false, follow: true },
};

export default function PricingPage() {
  return (
    <>
      <Nav overHero={false} />
      <main className="mx-auto max-w-3xl px-page pt-[calc(9rem+env(safe-area-inset-top))] pb-24 sm:pt-[calc(11rem+env(safe-area-inset-top))]">
        <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.95] font-black tracking-[-0.03em] uppercase">
          No surprises <span className="text-brand">at checkout.</span>
        </h1>
        <p className="mt-6 text-lead text-muted">
          Every Smooth Tickets event page shows the ticket price and the service fee as separate lines, so buyers see the full
          amount before they pay.
        </p>

        <figure className="mt-10 rounded-3xl bg-surface p-7 ring-1 ring-line">
          <figcaption className="text-sm font-semibold text-muted">Example: a ₦3,000 ticket on a live event page</figcaption>
          <dl className="mt-5 space-y-3 tabular-nums">
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

        <p className="mt-10 text-lead text-muted">
          Questions about fees or payouts for your event?{" "}
          <a href="mailto:hello@smooth.africa" className="font-semibold text-brand-deep hover:underline dark:text-brand-soft">
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
