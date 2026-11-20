import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/case-studies";
import { StatusBadge, Tag } from "@/components/ui";

export default function CaseStudyCard({
  study,
  headingLevel = 3,
}: {
  study: CaseStudyMeta;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={study.status} />
        <span className="font-mono text-xs text-subtle">{study.readTime}</span>
      </div>
      <Heading className="text-lg font-semibold leading-snug text-fg">
        <Link
          href={`/case-studies/${study.slug}`}
          className="after:absolute after:inset-0 after:rounded-xl group-hover:text-accent"
        >
          {study.title}
        </Link>
      </Heading>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{study.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
        {study.tags.slice(0, 4).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
