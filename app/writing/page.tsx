import type { Metadata } from "next";
import Link from "next/link";
import { Container, EmptyState, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles on cloud security, IAM and DevSecOps. None published yet.",
  alternates: { canonical: "/writing" },
  openGraph: { url: "/writing" },
};

export default function WritingPage() {
  return (
    <Container>
      <PageHeader eyebrow="ls ./writing" title="Writing" lede="Articles on cloud security, IAM and DevSecOps." />
      <div className="mt-10">
        <EmptyState title="Nothing published yet">
          <p>
            Articles will appear here once they&apos;re written. In the meantime, the{" "}
            <Link href="/case-studies" className="text-accent underline underline-offset-4">
              case studies
            </Link>{" "}
            cover the work in depth.
          </p>
        </EmptyState>
      </div>
    </Container>
  );
}
