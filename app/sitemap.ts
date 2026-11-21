import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllNotes, getSecondaryNav } from "@/lib/notes";
import { NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...[...NAV, ...getSecondaryNav()].map((n) => n.href)];
  const studies = getAllCaseStudies().map((s) => `/case-studies/${s.slug}`);
  const notes = getAllNotes().map((n) => `/notes/${n.slug}`);
  return [...pages, ...studies, ...notes].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/case-studies") ? 0.8 : 0.6,
  }));
}
