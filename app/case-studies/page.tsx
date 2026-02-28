import Link from 'next/link';
import { getAllCaseStudies } from '@/lib/case-studies';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Case Studies | Julius Gachuhi',
  description: 'Technical case studies on mobile security, AWS hardening, DevSecOps, and SOC 2 compliance.',
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main className="min-h-screen bg-[#FAFAF9] dark:bg-[#0A0A0F] pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-sm text-[#6B7280] dark:text-[#94A3B8] hover:text-cyan-600 dark:hover:text-cyan-400 transition mb-8 inline-block"
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-[#F1F5F9] mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8]">
            Deep dives into security engineering, platform architecture, and
            production infrastructure decisions.
          </p>
        </div>

        {/* Case study list */}
        <div className="space-y-6">
          {studies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="block group p-8 bg-white dark:bg-[#111118]
                         border border-[#E5E7EB] dark:border-[#1E1E2E]
                         rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-500
                         transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {study.tags.map((tag) => (
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

                  {/* Title */}
                  <h2 className="text-xl font-bold text-[#111827] dark:text-[#F1F5F9]
                                 group-hover:text-cyan-600 dark:group-hover:text-cyan-400
                                 transition-colors mb-2">
                    {study.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Meta */}
                  <p className="text-sm text-[#9CA3AF] dark:text-[#64748B] mt-4">
                    {study.date} · {study.readTime}
                  </p>
                </div>

                <ArrowRight
                  className="text-[#D1D5DB] dark:text-[#374151]
                             group-hover:text-cyan-500
                             group-hover:translate-x-1
                             transition-all duration-200 mt-1 shrink-0"
                  size={20}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
