import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTime } from "@/lib/reading-time";

const contentDir = path.join(process.cwd(), "content/notes");

export const NOTE_KINDS = ["Lab", "Article"] as const;
export type NoteKind = (typeof NOTE_KINDS)[number];

export interface NoteMeta {
  title: string;
  slug: string;
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  kind: NoteKind;
  tags: string[];
  /** Public repository for a lab, if there is one. */
  repo?: string;
  /** Drafts are excluded from listings, routes and the sitemap. */
  draft: boolean;
  readTime: string;
}

function parse(filename: string) {
  const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx$/, "");
  const fail = (msg: string) => {
    throw new Error(`Note ${filename}: ${msg}`);
  };
  if (!data.title) fail("missing title");
  if (!data.summary) fail("missing summary");
  // gray-matter turns an unquoted YAML date into a Date object.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`date must be YYYY-MM-DD, got "${date}"`);
  if (!NOTE_KINDS.includes(data.kind)) fail(`kind must be one of ${NOTE_KINDS.join(", ")}`);
  if (data.repo && !/^https:\/\//.test(data.repo)) fail("repo must be an https URL");
  const meta: NoteMeta = {
    title: data.title,
    slug,
    summary: data.summary,
    date,
    kind: data.kind,
    tags: data.tags ?? [],
    repo: data.repo || undefined,
    draft: Boolean(data.draft),
    readTime: readingTime(content),
  };
  return { meta, content };
}

function files() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
}

/** Published notes, newest first. */
export function getAllNotes(): NoteMeta[] {
  return files()
    .map((f) => parse(f).meta)
    .filter((m) => !m.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function hasNotes() {
  return getAllNotes().length > 0;
}

export function getNoteBySlug(slug: string): { meta: NoteMeta; content: string } | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(contentDir, file))) return null;
  const note = parse(file);
  return note.meta.draft ? null : note;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Footer-only links. Notes appears automatically once something is published. */
export function getSecondaryNav(): { href: string; label: string }[] {
  return hasNotes() ? [{ href: "/notes", label: "Notes" }] : [];
}
