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
              <Button asChild variant="dark">
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

const footerLinks = [
  ["Discover", `${APP_URL}/discovery`],
  ["Affiliates", "/affiliates"],
  ["Pricing", "/pricing"],
  ["Contact", `mailto:${CONTACT_EMAIL}`],
] as const;

const socials = [
  ["X", "https://x.com/SmoothBallot"],
  ["LinkedIn", "https://www.linkedin.com/company/smooth-ballot/"],
] as const;

const legal = [
  ["Privacy", "https://www.smoothballot.com/privacy"],
  ["Terms", "https://www.smoothballot.com/terms"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line px-page pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {footerLinks.map(([l, h]) => (
              <li key={l}>
                <a href={h} className="hover:text-fg">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Smooth Africa. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {[...socials, ...legal].map(([l, h]) => (
            <li key={l}>
              <a href={h} className="hover:text-fg" rel="noopener">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
