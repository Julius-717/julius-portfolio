import type { Metadata } from "next";
import { Container, EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research & Labs",
  description:
    "Independent research and lab work on cloud IAM attack-path analysis and DevSecOps, kept separate from professional work. In progress.",
  alternates: { canonical: "/research" },
  openGraph: { url: "/research" },
};

export default function ResearchPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="cd ~/research"
        title="Research & Labs"
        lede="Independent work, run in my own lab environments. It is separate from professional work and never uses an employer's systems or data."
      >
        <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-warn/40 bg-warn/5 px-3 py-1.5 font-mono text-xs text-warn">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warn" />
          Section in progress
        </p>
      </PageHeader>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
        <EmptyState title="No published research or labs yet">
          <p>
            This is where lab write-ups and research notes will go as they&apos;re completed. Nothing is listed until it
            exists.
          </p>
        </EmptyState>

        <aside aria-labelledby="interests-title" className="rounded-xl border border-line p-6">
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
