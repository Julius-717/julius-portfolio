import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small mono label above a heading, e.g. "~/case-studies". */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-xs tracking-wide text-accent">
      <span aria-hidden="true" className="text-subtle">
        ${" "}
      </span>
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-10 pt-14 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p> : null}
      {children}
    </header>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 id={id} className="text-2xl font-semibold text-fg">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export type Status = "complete" | "in-progress" | "in-acceptance";

const STATUS_LABEL: Record<Status, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  "in-acceptance": "In acceptance",
};

export function StatusBadge({ status }: { status: Status }) {
  const done = status === "complete";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs ${
        done ? "border-ok/30 text-ok" : "border-warn/40 text-warn"
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${done ? "bg-ok" : "bg-warn"}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Honest empty state for sections that have no content yet. */
export function EmptyState({
  title,
  children,
  level = 2,
}: {
  title: string;
  children: ReactNode;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-surface/60 p-6 sm:p-8">
      <p className="font-mono text-xs text-subtle">
        <span aria-hidden="true">$ ls</span> <span className="sr-only">Directory listing:</span>
        <span className="ml-2">0 entries</span>
      </p>
      <Heading className="mt-3 text-lg font-semibold text-fg">{title}</Heading>
      <div className="mt-2 max-w-2xl text-muted">{children}</div>
    </div>
  );
}

/**
 * Visible placeholder for a fact that still needs confirming.
 * Deliberately conspicuous so nothing ships with it by accident;
 * `npm run check:todos` lists every one.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 inline rounded border border-dashed border-warn/60 bg-warn/10 px-1.5 py-0.5 font-mono text-[0.8em] text-warn">
      TODO: {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-brand-strong text-fg shadow-card hover:bg-brand-deep"
      : "border border-line-strong bg-surface/40 text-fg hover:border-brand hover:bg-surface";
  if (external || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a
        href={href}
        className={`${base} ${styles}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
