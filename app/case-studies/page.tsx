import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import CaseStudyCard from "@/components/CaseStudyCard";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Cloud security and DevSecOps case studies: fail-closed DAST gates, a secure SDLC pipeline, IAM least-privilege review, observability and SSM Session Manager.",
  alternates: { canonical: "/case-studies" },
  openGraph: { url: "/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  return (
    <Container>
      <PageHeader
        eyebrow="ls ./case-studies"
        title="Case studies"
        lede={
          <>
            Security engineering work on a production AI platform on AWS. Each one follows the same structure:
            context, problem, risk, approach, validation, outcome and lessons. They describe methods and classes of
            problem, never the environment itself.
          </>
        }
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {studies.map((s) => (
          <li key={s.slug}>
            <CaseStudyCard study={s} headingLevel={2} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
