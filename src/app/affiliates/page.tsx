import type { Metadata } from "next";
import { Phone } from "@/components/Devices";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow, Button, Eyebrow } from "@/components/ui";
import { APP_URL } from "@/lib/events";

const description =
  "Smooth Affiliates lets organisers turn their network into event promoters. Affiliates share event links and earn commission on every ticket they sell.";

export const metadata: Metadata = {
  title: "Affiliates: Promote Events and Earn Commission",
  description,
  alternates: { canonical: "/affiliates" },
  openGraph: { title: "Smooth Affiliates", description, url: "/affiliates" },
};

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
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>Smooth Affiliates</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95] font-black tracking-[-0.03em] uppercase">
              Let more people <span className="text-brand">sell your</span>{" "}
              <span className="font-serif font-normal tracking-normal normal-case italic">tickets.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`${APP_URL}/auth/signup`}>
                Create an Event <Arrow />
              </Button>
              <Button href={`${APP_URL}/affiliate/auth/signup`} variant="outline">
                Become an affiliate
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted">
              Already promoting?{" "}
              <a href={`${APP_URL}/affiliate/auth/login`} className="font-semibold text-brand hover:underline dark:text-brand-soft">
                Affiliate login
              </a>
            </p>
          </div>
          <div className="relative mx-auto flex w-full max-w-md items-start justify-center gap-4">
            <div className="absolute inset-10 -z-10 rounded-full bg-brand/20 blur-[90px]" />
            <Phone {...screens[0]} priority className="w-1/2 -rotate-[3deg]" />
            <Phone {...screens[1]} className="mt-16 w-1/2 rotate-[3deg]" />
          </div>
        </section>

        <section aria-label="Questions about Smooth Affiliates" className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {answers.map(({ q, a }) => (
              <article key={q} className="rounded-3xl bg-surface p-7 ring-1 ring-line">
                <h2 className="font-display text-lg font-bold">{q}</h2>
                <p className="mt-3 leading-relaxed text-muted">{a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-display text-2xl font-black tracking-tight uppercase sm:text-4xl">Ready to grow your sales?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`${APP_URL}/auth/signup`}>
              Create Your Event <Arrow />
            </Button>
            <Button href={`${APP_URL}/discovery`} variant="outline">
              Explore Events
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
