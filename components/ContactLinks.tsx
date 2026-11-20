import { LINKS } from "@/lib/site";
import { Todo } from "@/components/ui";

/**
 * GitHub / LinkedIn / email as plain text links. Anything not configured is
 * shown as a visible TODO (see lib/site.ts) so it can't be missed before deploy.
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
        ) : showTodos ? (
          <li key={label}>
            <Todo>{label} link: set NEXT_PUBLIC_{label.toUpperCase()}</Todo>
          </li>
        ) : null,
      )}
    </ul>
  );
}
