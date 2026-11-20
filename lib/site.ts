/**
 * Single source of truth for identity, links and naming.
 *
 * Anything marked TODO(julius) needs confirming before the site is deployed.
 * `npm run check:todos` lists every open TODO in the codebase.
 */

export const SITE = {
  name: "Julius Gachuhi",
  url: "https://www.juliusgachuhi.com",
  role: "Cloud Security & DevSecOps Engineer",
  focus: "AWS · IAM · Application Security",
  /** Full headline, used for the <title> and Open Graph. */
  headline: "Cloud Security & DevSecOps Engineer | AWS · IAM · Application Security",
  location: "Nairobi, Kenya",
  description:
    "Cloud security and DevSecOps engineer. AWS security, IAM least-privilege review, and secure SDLC pipelines built as versioned, evidence-producing systems.",
} as const;

/**
 * Employer display name. Used ONLY in the Experience timeline.
 * Case studies, Expertise and everything else say "a production AI platform on AWS".
 *
 * To anonymise the employer everywhere it appears, change this one value, e.g.:
 *   export const EMPLOYER_NAME = "AI research SaaS company";
 */
export const EMPLOYER_NAME = "Enquire AI";

/** Generic description used anywhere outside the Experience timeline. */
export const PLATFORM_DESCRIPTION = "a production AI platform on AWS";

/**
 * Public contact links. Email and LinkedIn are read from the same Vercel
 * environment variables the previous site used, so nothing personal is
 * committed. A link that is not configured is not rendered.
 */
export const LINKS = {
  email: process.env.NEXT_PUBLIC_EMAIL || null,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/in/julius-gachuhi/",
  // TODO(julius): confirm this is the GitHub profile you want public (taken from this repo's git history).
  github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/Julius-717",
  /** Generated from cv/cv.html with `npm run cv:pdf`. */
  cv: "/pdf/Julius_Gachuhi_CV.pdf" as string | null,
} as const;

export const NAV = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/expertise", label: "Expertise" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer-only links: pages that exist but don't earn a place in the header yet. */
export const SECONDARY_NAV = [{ href: "/notes", label: "Notes" }] as const;
