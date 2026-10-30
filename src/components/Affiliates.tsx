import Image from "next/image";
import Link from "next/link";
import { APP_URL } from "@/lib/events";
import { Arrow, ArrowOut } from "./brand";
import { Button } from "./ui/button";

const points = [
  {
    title: "Set commissions",
    body: "Choose what affiliates earn on each ticket type.",
    src: "/screens/mockups/aff-promotions.webp",
    alt: "Affiliate My Promotions screen with earnings, tickets sold and clicks",
  },
  {
    title: "Choose who can promote",
    body: "Open your event to every affiliate, or keep it invite-only.",
    src: "/screens/mockups/event-info.webp",
    alt: "Event info screen showing Affiliate Access set to Public",
  },
  {
    title: "Payouts handled",
    body: "Smooth Tickets pays affiliate commission automatically.",
    src: "/screens/mockups/aff-earnings.webp",
    alt: "Affiliate My Earnings screen with balance, payouts and tickets sold",
  },
];

/**
 * Organiser-facing affiliate spotlight: three static cards, each with the real screen behind it.
 * `onAffiliatesPage`: the button creates an event instead of linking back to /affiliates.
 * `eyebrow`: replaces the "Smooth Affiliates" badge text.
 */
export function Affiliates({ onAffiliatesPage = false, eyebrow = "Smooth Affiliates" }: { onAffiliatesPage?: boolean; eyebrow?: string }) {
  return (
    <section id="affiliates" aria-labelledby="affiliates-title" className="section grain relative scroll-mt-24 overflow-hidden bg-night text-white">
      <div className="glow -top-40 -left-40 size-128" />
      <div data-stagger className="container-page relative">
        <div data-stagger-group className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="badge badge-lg">{eyebrow}</p>
            <h2 id="affiliates-title" className="mt-5 type-title">
              Let more people sell your tickets
            </h2>
          </div>
          <div>
            <p className="text-lead text-on-dark-muted">
              Turn your network into event promoters. Set commissions, choose who can promote your event, and let Smooth Tickets
              handle affiliate payouts automatically.
            </p>
            <Button asChild className="mt-6">
              {onAffiliatesPage ? (
                <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
                  Create an Event <ArrowOut />
                </a>
              ) : (
                <Link href="/affiliates">
                  Explore Affiliates <Arrow />
                </Link>
              )}
            </Button>
          </div>
        </div>

        <ol data-stagger-group className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
          {points.map((p, i) => (
            <li key={p.title}>
              <div className="aff-card">
                <div className="p-6 sm:p-7">
                  <span className="type-number text-body text-brand">0{i + 1}</span>
                  <h3 className="mt-3 type-heading">{p.title}</h3>
                  <p className="mt-2 text-body text-on-dark-muted">{p.body}</p>
                </div>
                {/* Real screen rising from the card's bottom edge. */}
                <div className="aff-shot">
                  <div>
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 340px, 90vw" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
