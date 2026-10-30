import {
  DiscountTag01Icon,
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
import { ArrowOut } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: "How fees and payouts work on Smooth Tickets: the service fee on its own line, and automatic payouts.",
  path: "/pricing",
});

// Only what the product does today: the fee line on the event page, as buyers see it.
const steps = [
  { title: "You set the ticket price", body: "Choose a price for each ticket type: regular, VIP, group tickets, tables or free." },
  { title: "The service fee sits on its own line", body: "Every event page shows the fee next to each ticket, so it's never hidden in the price." },
  { title: "Buyers see the full total first", body: "The total, fee included, is on screen before anyone pays. No surprises at checkout." },
  { title: "You get paid automatically", body: "Payouts are automatic, so the money from your ticket sales reaches you almost instantly." },
];

const included = [
  { icon: Ticket01Icon, title: "Ticket types", body: "Individual, group and table tickets, each with its own price and stock." },
  { icon: DiscountTag01Icon, title: "Discount codes", body: "Run coupons on the ticket types you choose." },
  { icon: UserGroupIcon, title: "Affiliates", body: "Let promoters sell your tickets for a commission you set." },
  { icon: ChartLineData01Icon, title: "Sales and attendees", body: "Track ticket sales, revenue and who's coming in your dashboard." },
  { icon: Wallet01Icon, title: "Automatic payouts", body: "Your money reaches you almost instantly. Track revenue and payouts in one place." },
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
            <div className="container-page intro">
              <h1 id="pricing-title" className="type-display">
                No surprises <span className="text-brand">at checkout.</span>
              </h1>
              <p className="mt-5 max-w-copy text-lead text-on-dark-muted">
                Every Smooth Tickets event page shows the ticket price and the service fee as separate lines, so buyers know the
                full amount before they pay.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="how-fees-title"
            data-stagger
            className="container-page section grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div data-stagger-group>
              <h2 id="how-fees-title" className="type-title">
                How a ticket is priced
              </h2>
              <ol className="mt-8 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-5">
                    <span className="type-number text-heading text-brand">0{i + 1}</span>
                    <div>
                      <h3 className="type-subheading">{s.title}</h3>
                      <p className="mt-1 text-body text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* A ticket stub: the worked example, as the event page shows it */}
            <figure className="stub">
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
                  <dt>Service fee</dt>
                  <dd>₦150</dd>
                </div>
                <div className="rule-top pt-4 type-heading">
                  <dt>Buyer pays</dt>
                  <dd className="type-number">₦3,150</dd>
                </div>
              </dl>
            </figure>
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
