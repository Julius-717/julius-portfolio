import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/case-studies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MDXContent from '@/components/MDXContent';

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta } = getCaseStudyBySlug(slug);
    return {
      title: `${meta.title} | Julius Gachuhi`,
      description: meta.summary,
    };
  } catch {
    return { title: 'Case Study | Julius Gachuhi' };
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let meta, content;
  try {
    ({ meta, content } = getCaseStudyBySlug(slug));
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAFAF9] dark:bg-[#0A0A0F] pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/case-studies"
          className="text-sm text-[#6B7280] dark:text-[#94A3B8]
                     hover:text-cyan-600 dark:hover:text-cyan-400
                     transition mb-10 inline-block"
        >
          ← All case studies
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {meta!.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full
                           bg-[#F3F4F6] dark:bg-[#1E1E2E]
                           text-[#374151] dark:text-[#E2E8F0]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold
                         text-[#111827] dark:text-[#F1F5F9] mb-4 leading-tight">
            {meta!.title}
          </h1>

          <p className="text-[#6B7280] dark:text-[#94A3B8] text-lg mb-4">
            {meta!.summary}
          </p>

          <p className="text-sm text-[#9CA3AF] dark:text-[#64748B]">
            {meta!.date} · {meta!.readTime}
          </p>

          <div className="mt-8 border-t border-[#E5E7EB] dark:border-[#1E1E2E]" />
        </div>

        {/* MDX Content */}
        <article className="prose prose-neutral dark:prose-invert
                            prose-headings:font-bold
                            prose-headings:text-[#111827] dark:prose-headings:text-[#F1F5F9]
                            prose-p:text-[#374151] dark:prose-p:text-[#CBD5E1]
                            prose-code:text-cyan-600 dark:prose-code:text-cyan-400
                            prose-pre:bg-[#111118] prose-pre:border
                            prose-pre:border-[#1E1E2E]
                            prose-a:text-cyan-600 dark:prose-a:text-cyan-400
                            prose-strong:text-[#111827] dark:prose-strong:text-white
                            prose-li:text-[#374151] dark:prose-li:text-[#CBD5E1]
                            max-w-none">
          <MDXContent source={content!} />
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-[#E5E7EB] dark:border-[#1E1E2E]">
          <p className="text-[#6B7280] dark:text-[#94A3B8] mb-4">
            Interested in working together on security-critical infrastructure?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-cyan-600
                       hover:bg-cyan-700 rounded-lg text-white font-medium transition"
          >
            Get in touch
          </Link>
        </div>

      </div>
    </main>
  );
}
