import type { Metadata } from "next";
import Link from "next/link";
import { Container, EmptyState, PageHeader, Tag } from "@/components/ui";
import { formatDate, getAllNotes, hasNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Independent labs and articles on cloud IAM attack-path analysis and DevSecOps, kept separate from professional work.",
  alternates: { canonical: "/notes" },
  openGraph: { url: "/notes" },
  // Unlinked and kept out of search until the first note is published.
  ...(hasNotes() ? {} : { robots: { index: false, follow: true } }),
};

export default function NotesPage() {
  const notes = getAllNotes();
  return (
    <Container>
      <PageHeader
        eyebrow="ls ./notes"
        title="Notes"
        lede="Independent labs and articles. Lab work runs in my own environments and is kept separate from professional work."
      />

      {notes.length ? (
        <ul className="mt-10 space-y-5">
          {notes.map((n) => (
            <li key={n.slug}>
              <article className="group relative rounded-xl border border-line bg-surface p-6 shadow-card transition hover:border-line-strong hover:shadow-raised">
                <p className="font-mono text-xs text-subtle">
                  <span className="text-accent">{n.kind}</span> · <time dateTime={n.date}>{formatDate(n.date)}</time> ·{" "}
                  {n.readTime}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-fg">
                  <Link href={`/notes/${n.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-strong">
                    {n.title}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{n.summary}</p>
                {n.tags.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
                    {n.tags.slice(0, 4).map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10">
          <EmptyState title="Nothing published yet">
            <p>
              In the meantime, the{" "}
              <Link href="/case-studies" className="text-accent underline underline-offset-4">
                case studies
              </Link>{" "}
              cover the work in depth.
            </p>
          </EmptyState>
        </div>
      )}
    </Container>
  );
}
