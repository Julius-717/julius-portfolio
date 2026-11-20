import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader, Todo } from "@/components/ui";
import { CREDENTIALS } from "@/lib/content/credentials";
import photo from "@/public/images/me.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "From mobile engineering to AWS security and ownership of the secure SDLC. MSc Cyber Security at the University of Essex, with research interests in cloud IAM attack-path analysis and DevSecOps.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const JOURNEY = [
  {
    stage: "01",
    title: "Mobile and software engineering",
    body: (
      <>
        I started out building mobile apps with Ionic, Angular and Capacitor: shipping to the app stores, working
        through release-test bug rounds and hotfixes, managing signing certificates, upgrading Google Play Billing, and
        fixing vulnerable dependencies.
      </>
    ),
  },
  {
    stage: "02",
    title: "AWS security and SOC 2 remediation",
    body: (
      <>
        In 2026 I moved into AWS security, starting with SOC 2 control remediation: logging and monitoring, threat
        detection, network isolation, edge protection, data protection, EC2 hardening and IAM hygiene. I also ran an
        account-wide IAM least-privilege review and moved engineer access from SSH keys and jumpboxes to SSM Session
        Manager.
      </>
    ),
  },
  {
    stage: "03",
    title: "Owning the secure SDLC",
    body: (
      <>
        Since September 2026 I&apos;ve owned the secure software development lifecycle. I rebuilt security scanning as
        scheduled, infrastructure-as-code build projects that all write to one evidence store. See{" "}
        <Link href="/case-studies/secure-sdlc-pipeline">the pipeline case study</Link>.
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="cat about.md"
        title="About"
        lede="I build and secure systems across the lifecycle, and I treat security tooling as engineered, versioned, evidence-producing systems."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_220px]">
        <div>
          <section aria-labelledby="journey-title">
            <h2 id="journey-title" className="text-2xl font-semibold text-fg">
              How I got here
            </h2>
            <ol className="mt-8 space-y-10">
              {JOURNEY.map((j) => (
                <li key={j.stage} className="grid gap-2 sm:grid-cols-[3rem_1fr]">
                  <span aria-hidden="true" className="font-mono text-sm text-accent">
                    {j.stage}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-fg">{j.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
                      {j.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="method-title" className="mt-16">
            <h2 id="method-title" className="text-2xl font-semibold text-fg">
              Working method
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              I use AI-assisted engineering (Claude Code) for AWS work under one rule:{" "}
              <strong className="font-medium text-fg">prepare, human applies, verify from read-only output.</strong>{" "}
              The assistant helps prepare a change; a human applies it; the result is then checked using read-only
              commands.
            </p>
          </section>

          <section id="education" aria-labelledby="education-title" className="mt-16 scroll-mt-24">
            <h2 id="education-title" className="text-2xl font-semibold text-fg">
              Education and credentials
            </h2>

            <div className="mt-6 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h3 className="text-lg font-semibold text-fg">MSc Cyber Security</h3>
              <p className="mt-1 text-muted">
                University of Essex · current <Todo>start date and expected completion</Todo>
              </p>
            </div>

            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <li key={c.name} className="flex gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
                  <Image src={c.image} alt="" width={56} height={56} sizes="56px" className="h-14 w-14 shrink-0 object-contain" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-fg">{c.name}</h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {c.issuer} · {c.year}
                    </p>
                    {c.credentialUrl ? (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex min-h-9 items-center text-sm text-accent hover:text-accent-strong"
                      >
                        Verify credential<span className="sr-only"> for {c.name} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="research-title" className="mt-16">
            <h2 id="research-title" className="text-2xl font-semibold text-fg">
              Research interests
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-line-strong">
              <li>
                <span className="text-fg">Cloud and IAM attack-path analysis:</span> how combinations of permissions,
                trust relationships and conditions add up to paths that no single policy reveals.
              </li>
              <li>
                <span className="text-fg">DevSecOps:</span> security controls that are versioned, tested and produce
                evidence, including proving that a gate actually blocks.
              </li>
            </ul>
            <p className="mt-4 text-muted">
              Independent research and writing will appear under{" "}
              <Link href="/notes" className="text-accent underline underline-offset-4">
                Notes
              </Link>
              , kept separate from professional work.
            </p>
          </section>
        </div>

        <aside className="order-first lg:order-last">
          <Image
            src={photo}
            alt="Portrait of Julius Gachuhi"
            placeholder="blur"
            sizes="(min-width: 1024px) 220px, 160px"
            className="h-40 w-40 rounded-xl border border-line object-cover lg:h-auto lg:w-full"
            priority
          />
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="font-mono text-xs text-subtle">based in</dt>
              <dd className="text-fg">Nairobi, Kenya · remote</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-subtle">focus</dt>
              <dd className="text-fg">AWS · IAM · Application Security</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Container>
  );
}
