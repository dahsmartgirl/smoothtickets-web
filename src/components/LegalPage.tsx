import Link from "next/link";
import { Footer } from "./FinalCta";
import { Nav } from "./Nav";
import { CONTACT_EMAIL } from "@/lib/contact";

export type LegalSection = { id: string; title: string; body: string[] };

/**
 * Privacy and Terms share this layout: navy header, a contents list (sticky beside the text on desktop),
 * then numbered sections. The copy in app/privacy and app/terms is placeholder text in [brackets],
 * to be replaced with the final policies from the team.
 */
export function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <section aria-labelledby="legal-title" className="page-head">
          <div className="container-page intro">
            <h1 id="legal-title" className="type-display">
              {title}
            </h1>
            <p className="mt-5 max-w-copy text-lead text-on-dark-muted">{intro}</p>
            <p className="mt-5 text-body text-on-dark-faint">Last updated: {updated}</p>
          </div>
        </section>

        <div className="container-page section layout-aside">
          <nav aria-label="On this page" className="legal-toc">
            <p className="type-overline text-muted">On this page</p>
            <ol className="mt-4 space-y-2.5">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="legal-toc-link">
                    <span className="type-number text-brand-faint">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div data-stagger className="legal-body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="legal-section">
                <h2 id={`${s.id}-title`} className="type-heading">
                  <span className="type-number text-brand">{String(i + 1).padStart(2, "0")}</span> {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-3 text-lead text-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="legal-section text-lead text-muted">
              Questions about this page? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link">
                {CONTACT_EMAIL}
              </a>{" "}
              or{" "}
              <Link href="/contact" className="link">
                talk to us
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
