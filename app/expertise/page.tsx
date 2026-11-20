import type { Metadata } from "next";
import { DOMAINS, type Proficiency } from "@/lib/content/expertise";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Cloud Security & SOC 2, IAM & Access, DevSecOps Pipelines, AppSec & Vulnerability Management, Infrastructure as Code and Software Engineering, with professional and developing proficiency marked honestly.",
  alternates: { canonical: "/expertise" },
  openGraph: { url: "/expertise" },
};

function Level({ level }: { level: Proficiency }) {
  const pro = level === "professional";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[0.7rem] ${
        pro ? "border-accent/40 text-accent" : "border-warn/40 text-warn"
      }`}
    >
      {pro ? "professional" : "developing"}
    </span>
  );
}

export default function ExpertisePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="cat expertise.md"
        title="Expertise"
        lede="Six domains, with each skill marked as professional (done in production) or developing (in progress, in review, or a research interest)."
      >
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <dt>
              <Level level="professional" />
            </dt>
            <dd className="text-muted">done in production, with evidence</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt>
              <Level level="developing" />
            </dt>
            <dd className="text-muted">in progress, in review, or research</dd>
          </div>
        </dl>
      </PageHeader>

      <nav aria-label="Domains" className="mt-8">
        <ul className="flex flex-wrap gap-2 text-sm">
          {DOMAINS.map((d) => (
            <li key={d.slug}>
              <a
                href={`#${d.slug}`}
                className="inline-flex min-h-9 items-center rounded-md border border-line px-3 text-muted hover:border-line-strong hover:text-fg"
              >
                {d.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 space-y-6">
        {DOMAINS.map((d) => (
          <section
            key={d.slug}
            id={d.slug}
            aria-labelledby={`${d.slug}-title`}
            className="scroll-mt-24 rounded-xl border border-line bg-surface p-5 sm:p-7"
          >
            <h2 id={`${d.slug}-title`} className="text-xl font-semibold text-fg">
              {d.title}
            </h2>
            <p className="mt-2 text-muted">{d.summary}</p>
            <ul className="mt-5 divide-y divide-line border-t border-line">
              {d.skills.map((s) => (
                <li key={s.name} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <p className="font-medium text-fg">{s.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.detail}</p>
                  </div>
                  <Level level={s.level} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
