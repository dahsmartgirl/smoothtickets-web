import Image from "next/image";
import { Arrow } from "./brand";
import { Button } from "./ui/button";
import { Reveal } from "./Reveal";

const points = [
  {
    title: "Set commissions",
    body: "Choose what affiliates earn on each ticket type.",
    src: "/screens/app/aff-earnings.jpg",
    alt: "Commission earned per ticket type for an event",
  },
  {
    title: "Choose who can promote",
    body: "Open your event to every affiliate, or keep it invite-only.",
    src: "/screens/app/event-info.jpg",
    alt: "Event info screen showing Affiliate Access set to Public",
  },
  {
    title: "Payouts handled",
    body: "Smooth Tickets pays affiliate commission automatically.",
    src: "/screens/app/aff-stats.jpg",
    alt: "Affiliate dashboard with total earnings, tickets sold and clicks",
  },
];

/** Organiser-facing affiliate spotlight: three static cards, each with the real screen behind it. */
export function Affiliates() {
  return (
    <section id="affiliates" aria-labelledby="affiliates-title" className="section grain relative scroll-mt-24 overflow-hidden bg-night text-white">
      <div className="glow -top-40 -left-40 size-128" />
      <div className="container-page relative">
        <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="badge badge-lg">Smooth Affiliates</p>
            <h2 id="affiliates-title" className="mt-5 type-title">
              Let more people sell your tickets
            </h2>
          </div>
          <div>
            <p className="text-subtext text-on-dark-muted">
              Turn your network into event promoters. Set commissions, choose who can promote your event, and let Smooth Tickets
              handle affiliate payouts automatically.
            </p>
            <Button asChild className="mt-6">
              <a href="/affiliates">
                Explore Affiliates <Arrow />
              </a>
            </Button>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
          {points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="aff-card">
                <div className="p-6 sm:p-7">
                  <span className="type-number text-body text-brand">0{i + 1}</span>
                  <h3 className="mt-3 type-heading">{p.title}</h3>
                  <p className="mt-2 text-body text-on-dark-muted">{p.body}</p>
                </div>
                {/* Real screen rising from the card's bottom edge. */}
                <div className="aff-shot">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 320px, 90vw" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
