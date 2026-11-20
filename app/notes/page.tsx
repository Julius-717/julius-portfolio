import type { Metadata } from "next";
import Link from "next/link";
import { Container, EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Independent research, labs and writing on cloud IAM attack-path analysis and DevSecOps, kept separate from professional work.",
  alternates: { canonical: "/notes" },
  openGraph: { url: "/notes" },
};

export default function NotesPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="ls ./notes"
        title="Notes"
        lede="Independent research, lab write-ups and articles. Lab work runs in my own environments and is kept separate from professional work."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
        <EmptyState title="Nothing published yet">
          <p>
            Write-ups will appear here as they&apos;re finished. In the meantime, the{" "}
            <Link href="/case-studies" className="text-accent underline underline-offset-4">
              case studies
            </Link>{" "}
            cover the work in depth.
          </p>
        </EmptyState>

        <aside aria-labelledby="interests-title" className="rounded-xl border border-line bg-surface p-6 shadow-card">
          <h2 id="interests-title" className="font-mono text-xs text-subtle">
            research interests
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-fg">
            <li>Cloud and IAM attack-path analysis</li>
            <li>DevSecOps: tested, evidence-producing controls</li>
          </ul>
        </aside>
      </div>
    </Container>
  );
}
