import { Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { APP_URL } from "@/lib/events";
import { Arrow, Logo, QrCode } from "./brand";
import { Button } from "./ui/button";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-page pt-28 pb-24">
      <Reveal className="mx-auto max-w-6xl">
        <div
          className="ticket grain relative grid overflow-hidden rounded-[36px] bg-brand text-white md:grid-cols-[1fr_auto]"
          style={{ ["--notch" as string]: "22px", ["--notch-y" as string]: "50%" }}
        >
          <div className="p-8 sm:p-14">
            <h2 id="cta-title" className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.92] font-black tracking-[-0.03em] uppercase">
              Your next event
              <br />
              starts with <span className="text-night">Smooth.</span>
            </h2>
            <p className="mt-5 max-w-md text-lead text-white/80">Everything you need to get started is right here.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="night">
                <a href={`${APP_URL}/auth/signup`}>
                  Create Your Event <Arrow />
                </a>
              </Button>
            </div>
          </div>
          {/* stub */}
          <div className="relative hidden flex-col items-center justify-center gap-4 border-l-0 px-14 md:flex">
            <div className="perf-y absolute top-8 bottom-8 left-0 text-white/40" />
            <div className="rounded-2xl bg-white p-3 text-night">
              <QrCode seed="your-event" className="size-32" />
            </div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/70">NO. 000001</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const CONTACT_EMAIL = "hello@smooth.africa";

const columns = [
  {
    title: "Product",
    links: [
      ["Discover Events", `${APP_URL}/discovery`],
      ["Create an Event", `${APP_URL}/auth/signup`],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Affiliates",
    links: [
      ["Smooth Affiliates", "/affiliates"],
      ["Become an affiliate", `${APP_URL}/affiliate/auth/signup`],
      ["Affiliate login", `${APP_URL}/affiliate/auth/login`],
    ],
  },
  {
    title: "Company",
    links: [
      ["Contact", `mailto:${CONTACT_EMAIL}`],
      ["Organiser login", `${APP_URL}/auth/login`],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "https://www.smoothballot.com/privacy"],
      ["Terms", "https://www.smoothballot.com/terms"],
    ],
  },
] as const;

const socials = [
  { label: "Smooth on X", href: "https://x.com/SmoothBallot", icon: NewTwitterIcon },
  { label: "Smooth on LinkedIn", href: "https://www.linkedin.com/company/smooth-ballot/", icon: Linkedin01Icon },
] as const;

export function Footer() {
  return (
    // Ticket-perforated top edge, like the hero's bottom edge.
    <footer className="torn-top overflow-hidden bg-night pt-20 text-white">
      <div className="mx-auto max-w-6xl px-page">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-xs">
            <Logo onDark />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Online event ticketing for African organisers. Create events, sell tickets and grow sales with affiliates.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 inline-block text-sm font-semibold text-lime hover:underline">
              {CONTACT_EMAIL}
            </a>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    rel="noopener"
                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-lime hover:text-night"
                  >
                    <HugeiconsIcon icon={s.icon} size={18} strokeWidth={1.8} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">{col.title}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-white/75 transition-colors hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs text-white/40">© {new Date().getFullYear()} Smooth Africa. All rights reserved.</p>
      </div>

      {/* Art: the wordmark stretched to the container width, its base just cropped by the page's bottom edge. */}
      <div aria-hidden className="mx-auto mt-10 max-w-6xl px-page">
        <svg viewBox="0 0 1000 150" className="block w-full translate-y-[14%]">
          <text
            x="0"
            y="140"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-brand font-display text-[172px] font-black uppercase"
          >
            smoothtickets
          </text>
        </svg>
      </div>
    </footer>
  );
}
