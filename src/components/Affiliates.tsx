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
    <section id="affiliates" aria-labelledby="affiliates-title" className="grain relative scroll-mt-24 overflow-hidden bg-night py-24 text-white sm:py-28">
      <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-brand/30 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-page">
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center rounded-full bg-lime px-3 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-night uppercase">
              Smooth Affiliates
            </p>
            <h2 id="affiliates-title" className="mt-5 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
              Let more people <span className="text-lime">sell your tickets.</span>
            </h2>
          </div>
          <div>
            <p className="text-lead text-white/70">
              Turn your network into event promoters. Set commissions, choose who can promote your event, and let Smooth Tickets
              handle affiliate payouts automatically.
            </p>
            <Button asChild variant="lime" className="mt-6">
              <a href="/affiliates">
                Explore Affiliates <Arrow />
              </a>
            </Button>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
          {points.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white/[0.05]">
                <div className="p-6 sm:p-7">
                  <span className="font-display text-sm font-black text-lime tabular-nums">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{p.body}</p>
                </div>
                {/* Real screen rising from the card's bottom edge. */}
                <div className="relative mx-6 mt-auto h-52 overflow-hidden rounded-t-[22px] bg-white ring-1 ring-white/20 sm:mx-7 sm:h-60">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 320px, 90vw" className="object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/60 to-transparent" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
