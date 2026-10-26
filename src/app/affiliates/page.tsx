import { Link04Icon, MoneyBag02Icon, Search01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Affiliates } from "@/components/Affiliates";
import { AppPhone } from "@/components/Devices";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Accordion, type AccordionEntry } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

const description =
  "Share event links and earn commission on every ticket you sell. Organisers: turn your network into promoters with Smooth Affiliates.";

export const metadata: Metadata = pageMetadata({
  title: "Affiliates: Promote Events and Earn Commission",
  description,
  path: "/affiliates",
});

// The affiliate's side, step by step, as the affiliate app works today.
const steps = [
  { icon: UserAdd01Icon, title: "Create your affiliate account", body: "Sign up with your email and pick a username." },
  { icon: Search01Icon, title: "Pick events to promote", body: "Browse events open to affiliates, or accept an organiser's invite." },
  { icon: Link04Icon, title: "Share your link", body: "Every event gets its own link for you. Post it, send it, put it in your bio." },
  { icon: MoneyBag02Icon, title: "Earn on every ticket", body: "Each ticket bought through your link earns the commission the organiser set." },
];

const screens = [
  { src: "/screens/app/aff-discover.jpg", alt: "Affiliate Discover Events screen listing events open to affiliates" },
  { src: "/screens/app/aff-stats.jpg", alt: "My Promotions screen with total earnings, tickets sold and clicks" },
];

// Answers stick to what the product shows today. Payout timing is not stated until ops confirms it.
const answers: AccordionEntry[] = [
  {
    question: "What is Smooth Affiliates?",
    answer:
      "Smooth Affiliates is the promoter network built into Smooth Tickets. Affiliates share an event's ticket link, and every ticket sold through that link earns them a commission.",
  },
  {
    question: "Who can become an affiliate?",
    answer:
      "Anyone can create an affiliate account. Each organiser decides who can promote their event: open it to every affiliate, or keep it invite-only and invite the people they choose.",
  },
  {
    question: "How much can I earn?",
    answer:
      "The organiser sets the commission for each ticket type, so it differs from event to event. Your dashboard shows what you've earned on each ticket type.",
  },
  {
    question: "How are sales tracked?",
    answer:
      "Smooth Tickets tracks each sale against the affiliate link it came from. Your dashboard shows clicks, tickets sold and earnings per ticket type.",
  },
  {
    question: "How do organisers set commission?",
    answer:
      "When you create or edit a ticket type, you set the affiliate commission for that ticket. Different ticket types can pay different commissions.",
  },
  {
    question: "How are earnings paid out?",
    answer: "Smooth Tickets handles affiliate payouts automatically. Add your bank account in your affiliate dashboard to get paid.",
  },
];

export default function AffiliatesPage() {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <section aria-labelledby="affiliates-page-title" className="page-head">
          <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="badge badge-lg">Smooth Affiliates</p>
              <h1 id="affiliates-page-title" className="mt-5 type-display">
                Share events. <span className="text-brand">Earn on every ticket.</span>
              </h1>
              <p className="mt-5 max-w-copy text-lead text-on-dark-muted">{description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={`${APP_URL}/affiliate/auth/signup`}>
                    Become an affiliate <Arrow />
                  </a>
                </Button>
                <Button asChild variant="glass">
                  <a href="#hosts">I&apos;m hosting an event</a>
                </Button>
              </div>
              <p className="mt-5 text-body text-on-dark-muted">
                Already promoting?{" "}
                <a href={`${APP_URL}/affiliate/auth/login`} className="text-white hover:underline">
                  Affiliate login
                </a>
              </p>
            </div>
            <div className="relative mx-auto hidden w-full max-w-narrow items-start justify-center gap-4 sm:flex">
              <div className="glow inset-10 -z-10" />
              <AppPhone screens={[screens[0]]} priority className="w-1/2 -rotate-3" />
              <AppPhone screens={[screens[1]]} className="mt-16 w-1/2 rotate-3" />
            </div>
          </div>
        </section>

        <section id="earn" aria-labelledby="earn-title" className="container-page section scroll-mt-24">
          <h2 id="earn-title" className="type-title">
            How affiliates earn
          </h2>
          <p className="mt-5 max-w-copy text-lead text-muted">If people listen when you say where the party is, you can earn from it.</p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="earn-step">
                <div className="flex items-center justify-between">
                  <span className="contact-icon">
                    <HugeiconsIcon icon={s.icon} strokeWidth={2} aria-hidden />
                  </span>
                  <span className="type-number text-heading text-brand-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-6 type-heading">{s.title}</h3>
                <p className="mt-2 text-body text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <Button asChild className="mt-10">
            <a href={`${APP_URL}/affiliate/auth/signup`}>
              Start earning <Arrow />
            </a>
          </Button>
        </section>

        <div id="hosts" className="scroll-mt-24">
          <Affiliates onAffiliatesPage />
        </div>

        <section aria-labelledby="aff-faq-title" className="container-page section layout-aside">
          <div>
            <h2 id="aff-faq-title" className="type-title">
              Questions, answered
            </h2>
            <p className="mt-5 max-w-narrow text-lead text-muted">
              For affiliates and organisers. Something else?{" "}
              <Link href="/contact" className="link">
                Talk to us
              </Link>
              .
            </p>
          </div>
          <Accordion items={answers} />
        </section>
      </main>
      <Footer />
    </>
  );
}
