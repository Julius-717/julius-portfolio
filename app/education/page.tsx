import type { Metadata } from "next";
import { Container, EmptyState, PageHeader, StatusBadge, Todo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Education & Certifications",
  description: "MSc Cyber Security, University of Essex (in progress).",
  alternates: { canonical: "/education" },
  openGraph: { url: "/education" },
};

/**
 * Certifications: intentionally empty until confirmed.
 * TODO(julius): add certifications here once you've confirmed which to list.
 * Shape: { name, issuer, year, credentialUrl? }
 */
const CERTIFICATIONS: { name: string; issuer: string; year: string; credentialUrl?: string }[] = [];

export default function EducationPage() {
  return (
    <Container>
      <PageHeader eyebrow="cat education.md" title="Education & Certifications" />

      <section aria-labelledby="education-title" className="mt-12">
        <h2 id="education-title" className="text-2xl font-semibold text-fg">
          Education
        </h2>
        <article className="mt-6 rounded-xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-fg">MSc Cyber Security</h3>
            <StatusBadge status="in-progress" />
          </div>
          <p className="mt-1 text-muted">University of Essex</p>
          <p className="mt-3 font-mono text-sm text-subtle">
            <Todo>start date and expected completion</Todo>
          </p>
        </article>
      </section>

      <section aria-labelledby="certs-title" className="mt-14">
        <h2 id="certs-title" className="text-2xl font-semibold text-fg">
          Certifications
        </h2>
        <div className="mt-6">
          {CERTIFICATIONS.length === 0 ? (
            <EmptyState title="None listed yet" level={3}>
              <p>Certifications will be listed here once they are confirmed.</p>
            </EmptyState>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name} className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="font-medium text-fg">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.year}
                  </p>
                  {c.credentialUrl ? (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-accent"
                    >
                      Verify credential<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Container>
  );
}
