import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTime } from "@/lib/reading-time";

const contentDir = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyMeta {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  order: number;
  featured: boolean;
  /** Drafts are excluded from listings, routes and the sitemap. */
  draft: boolean;
  readTime: string;
}

function parse(filename: string) {
  const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx$/, "");
  if (data.slug && data.slug !== slug) {
    throw new Error(`Case study ${filename}: frontmatter slug "${data.slug}" does not match filename`);
  }
  const meta: CaseStudyMeta = {
    title: data.title,
    slug,
    summary: data.summary,
    tags: data.tags ?? [],
    order: data.order ?? 99,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    readTime: readingTime(content),
  };
  return { meta, content };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parse(f).meta)
    .filter((m) => !m.draft)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((s) => s.featured).slice(0, 3);
}

export function getCaseStudyBySlug(slug: string): { meta: CaseStudyMeta; content: string } | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(contentDir, file))) return null;
  const study = parse(file);
  return study.meta.draft ? null : study;
}
