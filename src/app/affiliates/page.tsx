import type { Metadata } from "next";
import { AppPhone } from "@/components/Devices";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

const description =
  "Smooth Affiliates lets organisers turn their network into event promoters. Affiliates share event links and earn commission on every ticket they sell.";

export const metadata: Metadata = pageMetadata({
  title: "Affiliates: Promote Events and Earn Commission",
  description,
  path: "/affiliates",
});

// Answers stick to what the product shows today. Payout timing is not stated until ops confirms it.
const answers = [
  {
    q: "What is Smooth Affiliates?",
    a: "Smooth Affiliates is the promoter network built into Smooth Tickets. Affiliates share an event's ticket link, and every ticket sold through that link earns them a commission.",
  },
  {
    q: "Who can promote?",
    a: "Anyone can create an affiliate account. Each organiser decides who can promote their event: set Affiliate Access to Public and any affiliate can find and share it, or keep it invite-only and invite the people you choose.",
  },
  {
    q: "How does an organiser set commission?",
    a: "When you create or edit a ticket type, you set the affiliate commission for that ticket. Different ticket types can pay different commissions.",
  },
  {
    q: "How are earnings distributed?",
    a: "Smooth Tickets tracks each sale against the affiliate link it came from and handles affiliate payouts automatically. Affiliates see their tickets sold, clicks and earnings per ticket type in their dashboard.",
  },
];

const screens = [
  { src: "/screens/app/aff-discover.jpg", alt: "Affiliate Discover Events screen listing events open to affiliates" },
  { src: "/screens/app/aff-stats.jpg", alt: "My Promotions screen with total earnings, tickets sold and clicks" },
];

export default function AffiliatesPage() {
  return (
    <>
      <Nav overHero={false} />
      <main className="overflow-x-clip pt-32 sm:pt-40">
        <section className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h1 className="type-display-caps">
              Let more people <span className="text-brand">sell your</span> tickets.
            </h1>
            <p className="mt-6 max-w-copy text-lead text-muted">{description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`${APP_URL}/auth/signup`}>
                  Create an Event <Arrow />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`${APP_URL}/affiliate/auth/signup`}>
                  Become an affiliate
                </a>
              </Button>
            </div>
            <p className="mt-5 text-body text-muted">
              Already promoting?{" "}
              <a href={`${APP_URL}/affiliate/auth/login`} className="link">
                Affiliate login
              </a>
            </p>
          </div>
          <div className="relative mx-auto flex w-full max-w-narrow items-start justify-center gap-4">
            <div className="glow inset-10 -z-10" />
            <AppPhone screens={[screens[0]]} priority className="w-1/2 -rotate-3" />
            <AppPhone screens={[screens[1]]} className="mt-16 w-1/2 rotate-3" />
          </div>
        </section>

        <section aria-label="Questions about Smooth Affiliates" className="container-page section-top">
          <div className="grid gap-5 md:grid-cols-2">
            {answers.map(({ q, a }) => (
              <article key={q} className="card">
                <h2 className="type-heading">{q}</h2>
                <p className="mt-3 text-lead text-muted">{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-page section text-center">
          <h2 className="type-title">Ready to grow your sales?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={`${APP_URL}/auth/signup`}>
                Create Your Event <Arrow />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`${APP_URL}/discovery`}>
                Explore Events
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
