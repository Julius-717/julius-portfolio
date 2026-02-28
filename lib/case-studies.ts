import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/case-studies');

export interface CaseStudyMeta {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(contentDir, filename), 'utf-8');
      const { data } = matter(raw);
      return data as CaseStudyMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudyBySlug(slug: string): { meta: CaseStudyMeta; content: string } {
  const filepath = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  return { meta: data as CaseStudyMeta, content };
}
