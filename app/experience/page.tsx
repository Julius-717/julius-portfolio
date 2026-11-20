import type { Metadata } from "next";
import Link from "next/link";
import { EMPLOYMENT, OTHER_WORK, PHASES } from "@/lib/content/experience";
import { getAllCaseStudies } from "@/lib/case-studies";
import { Container, PageHeader, StatusBadge, Todo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "From mobile platform engineering to cloud security and DevSecOps: SOC 2 remediation on AWS, then ownership of the secure SDLC.",
  alternates: { canonical: "/experience" },
  openGraph: { url: "/experience" },
};

export default function ExperiencePage() {
  const titles = Object.fromEntries(getAllCaseStudies().map((s) => [s.slug, s.title]));

  return (
    <Container>
      <PageHeader
        eyebrow="git log --reverse career"
        title="Experience"
        lede="One employer, one progression: from mobile engineering into AWS security, then ownership of the secure software development lifecycle."
      />

      <article aria-labelledby="employer-title" className="mt-12">
        <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="employer-title" className="text-2xl font-semibold text-fg">
            {EMPLOYMENT.employer}
          </h2>
          <p className="font-mono text-sm text-subtle">
            {EMPLOYMENT.period} · {EMPLOYMENT.location}
          </p>
        </header>

        <ul className="mt-5 space-y-2" aria-label="Roles">
          {EMPLOYMENT.roles.map((r) => (
            <li key={r.title} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className={`font-medium ${r.current ? "text-fg" : "text-muted"}`}>{r.title}</span>
              {r.current ? <span className="font-mono text-xs text-ok">current</span> : <span className="font-mono text-xs text-subtle">prior</span>}
              {r.period ? <span className="font-mono text-xs text-subtle">{r.period}</span> : <Todo>sub-role dates</Todo>}
            </li>
          ))}
        </ul>

        <ol className="relative mt-10 space-y-10 border-l border-line pl-6 sm:pl-8">
          {PHASES.map((p) => (
            <li key={p.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand bg-bg sm:-left-[2.35rem]"
              />
              <p className="font-mono text-sm text-accent">{p.period}</p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-fg">{p.title}</h3>
                {p.status ? <StatusBadge status={p.status} /> : null}
              </div>
              {p.groups.map((g, i) => (
                <div key={i} className="mt-3">
                  {g.label ? <p className="leading-relaxed text-fg">{g.label}:</p> : null}
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-muted marker:text-line-strong">
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {p.caseStudies?.length ? (
                <p className="mt-4 text-sm text-subtle">
                  Case studies:{" "}
                  {p.caseStudies.map((slug, i) => (
                    <span key={slug}>
                      {i > 0 ? " · " : null}
                      <Link href={`/case-studies/${slug}`} className="text-accent hover:text-accent-strong">
                        {titles[slug] ?? slug}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-line-strong bg-bg sm:-left-[2.35rem]"
            />
            <p className="font-mono text-sm text-subtle">Mar 2022 – late 2025</p>
            <p className="mt-2 text-muted">
              <Todo>earlier mobile-platform work: confirm what to include for this period</Todo>
            </p>
          </li>
        </ol>
      </article>

      <section aria-labelledby="other-title" className="mt-16">
        <h2 id="other-title" className="text-2xl font-semibold text-fg">
          Other work in this role
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {OTHER_WORK.map((w) => (
            <li key={w.title} className="rounded-xl border border-line bg-surface p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-fg">{w.title}</h3>
                {w.status ? <StatusBadge status={w.status} /> : null}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.detail}</p>
              {w.caseStudy ? (
                <Link href={`/case-studies/${w.caseStudy}`} className="mt-3 inline-block text-sm text-accent hover:text-accent-strong">
                  Read the case study →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
