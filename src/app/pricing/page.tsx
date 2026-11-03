import {
  DiscountTag01Icon,
  Invoice01Icon,
  Tag01Icon,
  ViewIcon,
  QrCodeIcon,
  Ticket01Icon,
  UserGroupIcon,
  Wallet01Icon,
  ChartLineData01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { FinalCta, Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { ScrollTimeline } from "@/components/ScrollTimeline";
import { ArrowOut } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Ticketing Fees and Payouts",
  description:
    "Smooth Tickets charges a 5% service fee per paid ticket, shown on its own line before buyers pay. Free tickets carry no fee, and payouts are automatic.",
  path: "/pricing",
});

// Only what the product does today. The hero's ticket is the worked example, as the event page shows it.
const steps = [
  { icon: Tag01Icon, title: "You set the price", body: "Regular, VIP, group tickets, tables or free. Free tickets carry no fee." },
  { icon: Invoice01Icon, title: "The fee has its own line", body: "A 5% service fee, shown next to every ticket on the event page." },
  { icon: ViewIcon, title: "Buyers see the total first", body: "The full amount is on screen before they pay." },
  { icon: Wallet01Icon, title: "You get paid automatically", body: "Ticket sales are grouped and paid to your bank account automatically, usually within a few hours." },
];

const included = [
  { icon: Ticket01Icon, title: "Ticket types", body: "Individual, group and table tickets, each with its own price and stock." },
  { icon: DiscountTag01Icon, title: "Discount codes", body: "Run coupons on the ticket types you choose." },
  { icon: UserGroupIcon, title: "Affiliates", body: "Let promoters sell your tickets for a commission you set." },
  { icon: ChartLineData01Icon, title: "Sales and attendees", body: "Track ticket sales, revenue and who's coming in your dashboard." },
  { icon: Wallet01Icon, title: "Automatic payouts", body: "Sales are batched and paid out automatically, usually within a few hours. Track revenue and payouts in one place." },
  { icon: QrCodeIcon, title: "QR check-in", body: "Scan every ticket at the door on event day." },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        {/* The final CTA sits pinned underneath this layer and is uncovered as it scrolls away. */}
        <div className="above-cta above-cta-night">
          <section aria-labelledby="pricing-title" className="page-head">
            <div className="container-page">
              <div className="intro">
                <h1 id="pricing-title" className="max-w-copy type-display">
                  No surprises at checkout.
                </h1>
                <p className="mt-5 max-w-copy text-lead text-on-dark-muted">You set the ticket price. Buyers see the 5% service fee on its own line before they pay.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="how-fees-title" className="container-page section grid gap-14 lg:grid-cols-[1fr_24rem] lg:gap-16">
            <div>
              <div data-stagger>
                <h2 id="how-fees-title" className="type-title">
                  How a ticket is priced
                </h2>
                <p className="mt-5 max-w-copy text-lead text-muted">One fee, always on its own line.</p>
              </div>
              <ScrollTimeline steps={steps} className="mt-12" />
            </div>
            <div data-stagger className="lg:self-stretch">
              {/* The worked example, as the event page shows it. Desktop: pinned at the right edge beside the steps. */}
              <figure className="stub w-full max-w-narrow ml-0 lg:sticky lg:top-28 lg:mr-0 lg:ml-auto">
                <div className="stub-top">
                  <p className="text-body text-muted">Example from a live event page</p>
                  <p className="mt-2 type-heading">Regular ticket</p>
                </div>
                <div aria-hidden className="perf-x text-line" />
                <dl className="stub-lines">
                  <div>
                    <dt>Ticket price</dt>
                    <dd>₦3,000</dd>
                  </div>
                  <div className="text-muted">
                    <dt>Service fee (5%)</dt>
                    <dd>₦150</dd>
                  </div>
                  <div className="rule-top pt-4 type-heading">
                    <dt>Buyer pays</dt>
                    <dd className="type-number">₦3,150</dd>
                  </div>
                </dl>
              </figure>
            </div>
          </section>

          <section aria-labelledby="included-title" className="section grain relative overflow-hidden bg-night text-white">
            <div className="glow -top-40 -right-40 size-128" />
            <div data-stagger className="container-page relative">
              <h2 id="included-title" className="type-title">
                Every event gets the full toolkit
              </h2>
              <p className="mt-5 max-w-copy text-lead text-on-dark-muted">What you can do with every event you run on Smooth Tickets.</p>
              <ul data-stagger-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {included.map((f) => (
                  <li key={f.title} className="rounded-xl bg-glass-faint p-6 sm:p-7">
                    <HugeiconsIcon icon={f.icon} strokeWidth={2} className="size-6 text-brand" aria-hidden />
                    <h3 className="mt-4 type-heading">{f.title}</h3>
                    <p className="mt-2 text-body text-on-dark-muted">{f.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>

        <FinalCta
          title={
            <>
              Ready when
              <br />
              you are.
            </>
          }
          body={
            <>
              Questions about fees or payouts for your event?{" "}
              <Link href="/contact" className="text-white underline underline-offset-4 hover:no-underline">
                Talk to us
              </Link>
              .
            </>
          }
          actions={
            <>
              <Button asChild variant="night">
                <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
                  Create an Event <ArrowOut />
                </a>
              </Button>
              <Button asChild variant="glass">
                <Link href="/discovery">Explore Events</Link>
              </Button>
            </>
          }
        />
      </main>
      <Footer torn={false} />
    </>
  );
}
