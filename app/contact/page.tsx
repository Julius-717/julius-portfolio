import type { Metadata } from "next";
import ContactLinks from "@/components/ContactLinks";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to Cloud Security, DevSecOps, IAM and AppSec engineering roles, and to collaboration on research.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const ROLES = ["Cloud Security Engineering", "DevSecOps Engineering", "IAM Engineering", "AppSec Engineering"];

export default function ContactPage() {
  return (
    <Container>
      <PageHeader eyebrow="mail julius" title="Contact" lede="The best way to reach me is by email or LinkedIn." />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section aria-labelledby="roles-title">
          <h2 id="roles-title" className="text-xl font-semibold text-fg">
            Roles I&apos;m interested in
          </h2>
          <ul className="mt-4 space-y-2">
            {ROLES.map((r) => (
              <li key={r} className="flex items-center gap-3 text-muted">
                <span aria-hidden="true" className="font-mono text-accent">
                  &gt;
                </span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="collab-title">
          <h2 id="collab-title" className="text-xl font-semibold text-fg">
            Collaboration and research
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            I&apos;m also happy to hear about collaboration and research in cloud IAM attack-path analysis and
            DevSecOps.
          </p>
        </section>
      </div>

      <section aria-labelledby="links-title" className="mt-14 rounded-xl border border-line bg-surface p-6">
        <h2 id="links-title" className="font-mono text-xs text-subtle">
          links
        </h2>
        <ContactLinks className="mt-2" showTodos />
      </section>
    </Container>
  );
}
