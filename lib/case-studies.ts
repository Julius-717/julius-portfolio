import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Status } from "@/components/ui";

const contentDir = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyMeta {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  status: Status;
  order: number;
  featured: boolean;
  readTime: string;
}

function readingTime(body: string) {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
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
    status: data.status ?? "complete",
    order: data.order ?? 99,
    featured: Boolean(data.featured),
    readTime: readingTime(content),
  };
  return { meta, content };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parse(f).meta)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((s) => s.featured).slice(0, 3);
}

export function getCaseStudyBySlug(slug: string): { meta: CaseStudyMeta; content: string } | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(contentDir, file))) return null;
  return parse(file);
}
