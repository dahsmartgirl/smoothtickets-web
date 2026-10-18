"use client";

import { AppPhone } from "./Devices";
import { Arrow } from "./ui";
import { Reveal } from "./Reveal";
import { useCycle } from "./useCycle";

const steps = [
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

export function Affiliates() {
  const { active, playing, select } = useCycle(steps.length);

  return (
    <section id="affiliates" aria-labelledby="affiliates-title" className="grain relative scroll-mt-24 overflow-hidden bg-night py-28 text-white">
      <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-brand/30 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 font-display text-[11px] font-bold tracking-[0.2em] text-night uppercase">
              Smooth Affiliates
            </p>
            <h2 id="affiliates-title" className="mt-5 font-display text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-5xl">
              Let more people <span className="text-lime">sell your</span>{" "}
              <span className="font-serif font-normal normal-case italic">tickets.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Turn your network into event promoters. Set commissions, choose who can promote your event, and let Smooth Tickets
              handle affiliate payouts automatically.
            </p>
          </Reveal>

          <ol className="mt-8 space-y-1" role="tablist" aria-label="How affiliates work">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => select(i)}
                    className={`relative flex w-full gap-4 overflow-hidden rounded-2xl px-4 py-4 text-left transition-colors ${
                      on ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-colors ${
                        on ? "bg-lime text-night" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className={`block font-display text-sm font-bold ${on ? "" : "text-white/70"}`}>{s.title}</span>
                      <span className={`mt-1 block text-sm ${on ? "text-white/75" : "text-white/45"}`}>{s.body}</span>
                    </span>
                    {on && playing && <span key={active} className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progress bg-lime/60" />}
                  </button>
                </li>
              );
            })}
          </ol>

          <a
            href="/affiliates"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-night transition-colors hover:bg-[#d6ff5c]"
          >
            Explore Affiliates <Arrow />
          </a>
        </div>

        <Reveal delay={0.1}>
          <div className="relative h-[520px] overflow-hidden rounded-[36px] bg-white/5 ring-1 ring-white/10 sm:h-[600px]">
            <div className="absolute top-1/4 left-1/2 size-80 -translate-x-1/2 rounded-full bg-lime/20 blur-[90px]" />
            <AppPhone screens={steps} active={active} className="absolute top-12 left-1/2 w-[280px] -translate-x-1/2 sm:w-[310px]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
