import { ArrowUpRight01Icon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { APP_URL } from "@/lib/events";
import { ArrowOut, Logo, QrCode } from "./brand";
import { Confetti } from "./Confetti";
import { UncoverSection } from "./Uncover";
import { Button } from "./ui/button";

/**
 * Full-width ticket band. It looks pinned under the page (UncoverSection), so the content above slides up
 * off it as you scroll down, and back over it as you scroll up. Wrap everything above it in `.above-cta`.
 * The homepage copy is the default; other pages pass their own.
 */
export function FinalCta({
  title = (
    <>
      Your next event
      <br />
      starts with <span className="text-night">Smooth.</span>
    </>
  ),
  body = "Everything you need to get started is right here.",
  actions = (
    <Button asChild variant="night">
      <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
        Create an Event <ArrowOut />
      </a>
    </Button>
  ),
}: {
  title?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <UncoverSection aria-labelledby="cta-title" className="cta-frame" contentClassName="cta">
      <div className="container-page cta-inner">
        <div className="cta-body">
          <h2 id="cta-title" className="type-display">
            {title}
          </h2>
          <p className="mt-5 max-w-narrow text-lead text-on-dark-muted">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
        </div>
        {/* stub */}
        <div className="cta-stub">
          <div className="perf-y absolute top-0 bottom-0 left-0 text-on-dark-faint" />
          <div className="cta-qr">
            <QrCode seed="your-event" className="size-32" />
          </div>
          <p className="type-caption text-on-dark-muted">No. 000001</p>
        </div>
      </div>
    </UncoverSection>
  );
}

/** `external`: another site, new tab. `out`: sign-up in the app, new tab with ↗ like the buttons. */
type FooterLink = { label: string; href: string; external?: boolean; out?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Discover Events", href: "/discovery" },
      { label: "Create an Event", href: `${APP_URL}/auth/signup`, out: true },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Affiliates",
    links: [
      { label: "Smooth Affiliates", href: "/affiliates" },
      { label: "Become an affiliate", href: `${APP_URL}/affiliate/auth/signup`, out: true },
      { label: "Affiliate login", href: `${APP_URL}/affiliate/auth/login` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "https://smooth.africa", external: true },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Smooth on X", href: "https://x.com/SmoothBallot", icon: NewTwitterIcon },
  { label: "Smooth on LinkedIn", href: "https://www.linkedin.com/company/smooth-ballot/", icon: Linkedin01Icon },
] as const;

/** `torn`: ticket-perforated top edge. Off on the homepage, where the final CTA's band runs straight into it. */
export function Footer({ torn = true }: { torn?: boolean }) {
  return (
    <footer className={`footer ${torn ? "torn-top" : ""}`}>
      <Confetti />
      <div data-stagger className="container-page footer-content">
        <div data-stagger-group className="layout-aside">
          <div className="max-w-narrow">
            <Logo onDark />
            <p className="mt-5 text-body text-on-dark-muted">
              Online event ticketing for African organisers. Create events, sell tickets and grow sales with affiliates.
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="social">
                    <HugeiconsIcon icon={s.icon} strokeWidth={1.8} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="type-overline text-on-dark-faint">{col.title}</p>
                <ul className="mt-4 space-y-3 text-body">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="footer-link"
                        {...(l.external && { target: "_blank", rel: "noopener noreferrer" })}
                        {...(l.href.startsWith(APP_URL) && { target: "_blank", rel: "noopener" })}
                      >
                        {l.label}
                        {(l.external || l.out) && <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} aria-hidden />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 rule-top rule-on-dark pt-6 text-small text-on-dark-faint">© {new Date().getFullYear()} Smooth Africa. All rights reserved.</p>
      </div>

      {/* Art: the logo in outline across the full width, rising from below the page's bottom edge; the
          lower part sits under a soft blur, and confetti bursts up from behind it (Confetti covers the footer). */}
      <div aria-hidden className="footer-art">
        <svg viewBox="0 0 1000 140" className="footer-lockup">
          {/* logomark from public/logo.svg (30x30), scaled to 132 */}
          <g className="lockup-mark" transform="translate(0 4) scale(4.4)">
            <path d="M27.8914 7.48715C27.3257 7.25572 26.6871 7.56215 26.2907 8.02929C26.2635 8.06215 26.2357 8.09358 26.2071 8.12358C25.7688 8.59805 25.1929 8.92335 24.5603 9.0538C23.9276 9.18425 23.27 9.11329 22.6798 8.85091C22.0895 8.58852 21.5962 8.14787 21.2692 7.59082C20.9422 7.03377 20.7978 6.3883 20.8564 5.74501C20.91 5.15572 20.7021 4.51287 20.1664 4.26215L19.2364 3.82715C18.7299 3.61679 18.161 3.61444 17.6528 3.8206C17.1446 4.02676 16.7381 4.42483 16.5214 4.92858L9.67925 20.7279L8.65068 23.07C8.43953 23.5764 8.43652 24.1457 8.6423 24.6543C8.84808 25.163 9.24607 25.57 9.74997 25.7872L19.26 29.8393C19.7669 30.051 20.3369 30.054 20.8461 29.8478C21.3553 29.6416 21.7625 29.2427 21.9793 28.7379L29.8478 10.5257C30.0439 10.0388 30.0491 9.49589 29.8624 9.00532C29.6757 8.51475 29.3108 8.11265 28.8407 7.87929L27.8914 7.48715Z" />
            <path d="M3.63212 4.27286C3.23141 3.81 2.59498 3.50143 2.02926 3.73715L1.12926 4.10572C0.671474 4.33383 0.31633 4.72592 0.134479 5.20397C-0.0473727 5.68203 -0.0426048 6.21102 0.147834 6.68572L6.48212 21.3429L7.22569 19.6564L14.0571 3.87V3.86572L14.1707 3.62358L13.1357 1.23C12.9237 0.739574 12.5274 0.352139 12.0323 0.151294C11.5372 -0.0495509 10.983 -0.0477051 10.4893 0.156433L9.60855 0.570005C9.07283 0.820719 8.86498 1.46358 8.91212 2.05286C8.94807 2.48418 8.89028 2.91817 8.74269 3.32504C8.59511 3.73192 8.36123 4.10204 8.05712 4.41001C7.76568 4.70665 7.41598 4.93976 7.03003 5.09464C6.64409 5.24952 6.23026 5.32283 5.8146 5.30994C5.39894 5.29706 4.99045 5.19827 4.61484 5.01978C4.23923 4.8413 3.90463 4.58699 3.63212 4.27286Z" />
          </g>
          <text x="160" y="104" textLength="840" lengthAdjust="spacingAndGlyphs">
            smoothtickets
          </text>
        </svg>
        <div className="footer-veil" />
      </div>
    </footer>
  );
}

