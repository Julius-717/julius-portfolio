import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { NAV, SECONDARY_NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...[...NAV, ...SECONDARY_NAV].map((n) => n.href)];
  const studies = getAllCaseStudies().map((s) => `/case-studies/${s.slug}`);
  return [...pages, ...studies].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/case-studies") ? 0.8 : 0.6,
  }));
}
