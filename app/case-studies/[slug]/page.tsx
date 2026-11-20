import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { mdxComponents } from "@/components/mdx";
import { Container, Tag } from "@/components/ui";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  const url = `/case-studies/${slug}`;
  return {
    title: study.meta.title,
    description: study.meta.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: study.meta.title, description: study.meta.summary },
    twitter: { title: study.meta.title, description: study.meta.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  const { meta, content } = study;

  const all = getAllCaseStudies();
  const idx = all.findIndex((s) => s.slug === slug);
  const next = all[(idx + 1) % all.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: meta.title,
    description: meta.summary,
    url: `${SITE.url}/case-studies/${slug}`,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    keywords: meta.tags.join(", "),
  };

  return (
    <Container className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
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
            <Link href="/case-studies" className="hover:text-fg">
              case-studies
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-muted">
            {slug}
          </li>
        </ol>
      </nav>

      <header className="border-b border-line pb-8 pt-6">
        <p className="mb-4 font-mono text-xs text-subtle">{meta.readTime}</p>
        <h1 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">{meta.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{meta.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
          {meta.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
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
          Methods and classes of problem only. No identifiers, counts or open findings from any real environment are
          published here.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Link href="/case-studies" className="text-sm text-muted hover:text-fg">
            ← All case studies
          </Link>
          {next && next.slug !== slug ? (
            <Link href={`/case-studies/${next.slug}`} className="text-sm text-accent hover:text-accent-strong">
              Next: {next.title} →
            </Link>
          ) : null}
        </div>
      </aside>
    </Container>
  );
}
