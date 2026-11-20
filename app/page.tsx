import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { DOMAINS } from "@/lib/content/expertise";
import { LINKS, SITE } from "@/lib/site";
import CaseStudyCard from "@/components/CaseStudyCard";
import ContactLinks, { configuredLinkCount } from "@/components/ContactLinks";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | ${SITE.headline}` },
  alternates: { canonical: "/" },
};

const NOW = [
  { label: "role", text: "Owner of the secure SDLC for a production AI platform on AWS" },
  { label: "recent", text: "Scheduled, IaC-managed SAST, SCA and DAST with a single evidence store" },
  { label: "study", text: "MSc Cyber Security, University of Essex" },
];

export default function Home() {
  const featured = getFeaturedCaseStudies();

  return (
    <>
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="bg-gradient-primary absolute inset-x-0 bottom-0 h-px opacity-70" />
        <Container className="relative pb-12 pt-14 sm:pb-16 sm:pt-20">
          <p className="font-mono text-sm text-muted">
            <span aria-hidden="true" className="text-accent">
              ${" "}
            </span>
            whoami <span className="text-fg">{SITE.name}</span>
          </p>
          <h1 id="hero-title" className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] text-fg sm:text-5xl">
            {SITE.role}
          </h1>
          <p className="mt-4 font-mono text-sm text-accent sm:text-base">{SITE.focus}</p>

          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I secure AWS environments for a production AI platform, from SOC 2 control remediation and IAM
              least-privilege review to owning the secure software development lifecycle.
            </p>
            <p>
              I started as a mobile and software engineer, and I build security tooling the same way: engineered,
              versioned in infrastructure as code, and producing evidence.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/case-studies">Read the case studies</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
            {LINKS.cv ? (
              <ButtonLink href={LINKS.cv} variant="secondary">
                Download CV (PDF)
              </ButtonLink>
            ) : null}
          </div>

          {configuredLinkCount() >= 2 ? <ContactLinks className="mt-6" /> : null}
        </Container>
      </section>

      <Container>
        <section aria-labelledby="now-title" className="pb-8 pt-10">
          <h2 id="now-title" className="sr-only">
            At a glance
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {NOW.map((n) => (
              <li key={n.text} className="rounded-lg border border-line bg-surface px-4 py-3 shadow-card">
                <p className="font-mono text-xs text-subtle">{n.label}</p>
                <p className="mt-1 text-sm text-fg">{n.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="featured-title" className="py-10">
          <SectionHeading
            id="featured-title"
            eyebrow="ls ./case-studies --featured"
            title="Featured case studies"
            action={
              <Link href="/case-studies" className="text-sm text-accent hover:text-accent-strong">
                All six case studies →
              </Link>
            }
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {featured.map((s) => (
              <li key={s.slug}>
                <CaseStudyCard study={s} featured maxTags={2} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="expertise-title" className="py-14">
          <SectionHeading
            id="expertise-title"
            eyebrow="cat expertise.md"
            title="Expertise"
            action={
              <Link href="/expertise" className="text-sm text-accent hover:text-accent-strong">
                Skills and proficiency →
              </Link>
            }
          />
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d) => (
              <li key={d.slug} className="bg-surface p-5">
                <h3 className="font-medium text-fg">
                  <Link href={`/expertise#${d.slug}`} className="hover:text-accent">
                    {d.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="approach-title" className="py-10">
          <Eyebrow>cat principles.md</Eyebrow>
          <h2 id="approach-title" className="text-2xl font-semibold text-fg">
            How I work
          </h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            <li>
              <h3 className="font-medium text-fg">Security tooling is software</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Scanners are defined in infrastructure as code, versioned, scheduled and given least-privilege roles
                of their own.
              </p>
            </li>
            <li>
              <h3 className="font-medium text-fg">Evidence first</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every check records what it saw before it decides, and fails closed when it can&apos;t tell.
              </p>
            </li>
            <li>
              <h3 className="font-medium text-fg">Prepare, human applies, verify</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                I use AI-assisted engineering for AWS changes under one rule: the change is prepared, a human applies
                it, and the result is verified from read-only output.
              </p>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
