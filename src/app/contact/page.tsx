import { Mail01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = pageMetadata({
  title: "Contact us",
  description: "Talk to the Smooth Tickets team on WhatsApp or by email about your event, tickets, payouts or affiliates.",
  path: "/contact",
});

const channels = [
  {
    icon: WhatsappIcon,
    title: "WhatsApp",
    body: "Chat with the team for quick questions, setup help and support on the day.",
    cta: "Chat on WhatsApp",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Mail01Icon,
    title: "Email",
    body: "For general enquiries, partnerships, payouts and anything that needs a paper trail.",
    cta: "Send an email",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
];

// Point people who don't need a human at the answer first.
const shortcuts = [
  { q: "Bought a ticket?", a: "Your tickets and receipt are in the email you used at checkout.", link: { label: "Find an event", href: "/discovery" } },
  { q: "Hosting an event?", a: "See how fees work before you set your ticket prices.", link: { label: "How pricing works", href: "/pricing" } },
  { q: "Want to promote events?", a: "Share event links and earn commission on every ticket you sell.", link: { label: "Smooth Affiliates", href: "/affiliates" } },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <section aria-labelledby="contact-title" className="page-head">
          <div className="container-page intro">
            <h1 id="contact-title" className="type-display">
              Talk to <span className="text-brand">a real person.</span>
            </h1>
            <p className="mt-5 max-w-copy text-lead text-on-dark-muted">
              Questions about your event, your tickets or getting paid? Reach the Smooth team on WhatsApp or by email.
            </p>
          </div>
        </section>

        <section aria-label="Ways to reach us" className="container-page pt-12 sm:pt-16">
          <ul data-stagger className="grid gap-5 md:grid-cols-2">
            {channels.map((c) => (
              <li key={c.title} className="contact-card">
                <span className="contact-icon">
                  <HugeiconsIcon icon={c.icon} strokeWidth={2} aria-hidden />
                </span>
                <h2 className="mt-6 type-heading">{c.title}</h2>
                <p className="mt-2 text-lead text-muted">{c.body}</p>
                <Button asChild className="mt-6">
                  <a href={c.href} {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}>
                    {c.cta} <Arrow />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="shortcuts-title" data-stagger className="container-page section">
          <h2 id="shortcuts-title" className="type-title">
            Might be quicker
          </h2>
          <ul data-stagger-group className="mt-8 grid gap-5 md:grid-cols-3">
            {shortcuts.map((s) => (
              <li key={s.q} className="card">
                <h3 className="type-subheading">{s.q}</h3>
                <p className="mt-2 text-body text-muted">{s.a}</p>
                <Link href={s.link.href} className="mt-4 inline-flex items-center gap-1.5 text-body link">
                  {s.link.label} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
