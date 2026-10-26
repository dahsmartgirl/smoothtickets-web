import { Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { APP_URL } from "@/lib/events";
import { Arrow, Logo, QrCode } from "./brand";
import { Button } from "./ui/button";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="section">
      <Reveal className="container-page">
        <div className="cta-ticket">
          <div className="p-8 sm:p-14">
            <h2 id="cta-title" className="type-display">
              Your next event
              <br />
              starts with <span className="text-night">Smooth.</span>
            </h2>
            <p className="mt-5 max-w-narrow text-lead text-on-dark-muted">Everything you need to get started is right here.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="night">
                <a href={`${APP_URL}/auth/signup`}>
                  Create Your Event <Arrow />
                </a>
              </Button>
            </div>
          </div>
          {/* stub */}
          <div className="cta-stub">
            <div className="perf-y absolute top-8 bottom-8 left-0 text-on-dark-faint" />
            <div className="cta-qr">
              <QrCode seed="your-event" className="size-32" />
            </div>
            <p className="type-caption text-on-dark-muted">No. 000001</p>
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
    <footer className="footer">
      <div className="container-page">
        <div className="layout-aside">
          <div className="max-w-narrow">
            <Logo onDark />
            <p className="mt-5 text-body text-on-dark-muted">
              Online event ticketing for African organisers. Create events, sell tickets and grow sales with affiliates.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    rel="noopener"
                    className="social"
                  >
                    <HugeiconsIcon icon={s.icon} strokeWidth={1.8} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="type-caption text-on-dark-faint">{col.title}</p>
                <ul className="mt-4 space-y-3 text-body">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="footer-link">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t border-line-dark pt-6 text-small text-on-dark-faint">© {new Date().getFullYear()} Smooth Africa. All rights reserved.</p>
      </div>

      {/* Art: the wordmark stretched to the container width, its base just cropped by the page's bottom edge. */}
      <div aria-hidden className="container-page mt-10">
        <svg viewBox="0 0 1000 150" className="wordmark">
          <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs">
            smoothtickets
          </text>
        </svg>
      </div>
    </footer>
  );
}
