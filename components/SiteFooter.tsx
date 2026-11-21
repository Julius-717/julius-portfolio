import Link from "next/link";
import { LINKS, NAV, SITE } from "@/lib/site";
import { getSecondaryNav } from "@/lib/notes";

export default function SiteFooter() {
  const external = [
    LINKS.github ? { href: LINKS.github, label: "GitHub" } : null,
    LINKS.linkedin ? { href: LINKS.linkedin, label: "LinkedIn" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="mt-24 border-t border-line bg-nav">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:grid-cols-[1fr_auto] sm:px-8">
        <div>
          <p className="font-medium text-fg">{SITE.name}</p>
          <p className="mt-1 text-sm text-subtle">
            {SITE.role} · {SITE.location}
          </p>
          <p className="mt-4 text-sm text-subtle">© {new Date().getFullYear()} {SITE.name}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            {[...NAV, ...getSecondaryNav()].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-9 items-center text-muted hover:text-fg">
                  {label}
                </Link>
              </li>
            ))}
            {external.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center text-muted hover:text-fg"
                >
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
