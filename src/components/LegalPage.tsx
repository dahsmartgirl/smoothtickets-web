import Link from "next/link";
import { Footer } from "./FinalCta";
import { Nav } from "./Nav";
import { CONTACT_EMAIL } from "@/lib/contact";

/**
 * `body`: one string per numbered clause (1.1, 1.2 …). A string starting with "- " is a sub-item of the clause
 * before it, shown indented and unnumbered; write its own "(a)" label. `**text**` is bold.
 */
export type LegalSection = { id: string; title: string; body: string[] };

/** `**bold**` → <strong>. The only markup the legal copy uses. */
function Rich({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i} className="font-bold">{part}</strong> : part));
}

/** Groups each clause with the "- " sub-items that follow it. */
function clauses(body: string[]) {
  const out: { text: string; items: string[] }[] = [];
  for (const line of body) {
    if (line.startsWith("- ") && out.length) out[out.length - 1].items.push(line.slice(2));
    else out.push({ text: line, items: [] });
  }
  return out;
}

/**
 * Privacy and Terms share this layout: navy header, a contents list (desktop only, sticky beside the text),
 * then numbered sections of numbered clauses. The copy lives in app/privacy and app/terms.
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
                {clauses(s.body).map((c, j) => (
                  <div key={c.text} className="legal-clause">
                    <span className="legal-clause-no">
                      {i + 1}.{j + 1}
                    </span>
                    <div>
                      <p>
                        <Rich text={c.text} />
                      </p>
                      {c.items.length > 0 && (
                        <ul className="legal-items">
                          {c.items.map((item) => (
                            <li key={item}>
                              <Rich text={item} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
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
