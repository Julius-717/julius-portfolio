import { LINKS } from "@/lib/site";
import { SHOW_TODOS, Todo } from "@/components/ui";

/** How many contact links are configured; the hero hides a lone link. */
export function configuredLinkCount() {
  return [LINKS.github, LINKS.linkedin, LINKS.email].filter(Boolean).length;
}

/**
 * GitHub / LinkedIn / email as plain text links. With showTodos, links that
 * aren't configured show a TODO marker in dev (nothing in production).
 */

export default function ContactLinks({ className = "", showTodos = false }: { className?: string; showTodos?: boolean }) {
  const items = [
    { label: "GitHub", href: LINKS.github, external: true },
    { label: "LinkedIn", href: LINKS.linkedin, external: true },
    { label: "Email", href: LINKS.email ? `mailto:${LINKS.email}` : null, external: false },
  ];

  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm ${className}`}>
      {items.map(({ label, href, external }) =>
        href ? (
          <li key={label}>
            <a
              href={href}
              className="inline-flex min-h-11 items-center text-muted underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-accent"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
              {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          </li>
        ) : showTodos && SHOW_TODOS ? (
          <li key={label}>
            <Todo>{label} link: set NEXT_PUBLIC_{label.toUpperCase()}</Todo>
          </li>
        ) : null,
      )}
    </ul>
  );
}
