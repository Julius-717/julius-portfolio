import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { formatDate, getAllNotes, getNoteBySlug } from "@/lib/notes";
import { mdxComponents } from "@/components/mdx";
import { ButtonLink, Container, Tag } from "@/components/ui";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  const url = `/notes/${slug}`;
  const { title, summary, date } = note.meta;
  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: summary, publishedTime: date },
    twitter: { title, description: summary },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();
  const { meta, content } = note;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    url: `${SITE.url}/notes/${slug}`,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    keywords: meta.tags.join(", "),
    ...(meta.repo ? { isBasedOn: meta.repo } : {}),
  };

  return (
    <Container className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="pt-10 sm:pt-14">
        <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-subtle">
          <li>
            <Link href="/" className="hover:text-fg">
              ~
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/notes" className="hover:text-fg">
              notes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-muted">
            {slug}
          </li>
        </ol>
      </nav>

      <header className="border-b border-line pb-8 pt-6">
        <p className="mb-4 font-mono text-xs text-subtle">
          <span className="text-accent">{meta.kind}</span> · <time dateTime={meta.date}>{formatDate(meta.date)}</time> ·{" "}
          {meta.readTime}
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">{meta.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{meta.summary}</p>
        {meta.tags.length ? (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
            {meta.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
        {meta.repo ? (
          <div className="mt-6">
            <ButtonLink href={meta.repo} variant="secondary" external>
              View the code on GitHub
            </ButtonLink>
          </div>
        ) : null}
      </header>

      <article className="prose prose-invert prose-case mt-10 max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
        />
      </article>

      <aside className="mt-16 rounded-xl border border-line bg-surface p-6">
        <p className="text-sm text-subtle">
          Independent work, done in my own environments. Nothing here comes from an employer&apos;s systems.
        </p>
        <Link href="/notes" className="mt-5 inline-block text-sm text-muted hover:text-fg">
          ← All notes
        </Link>
      </aside>
    </Container>
  );
}
