"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-nav/95 backdrop-blur supports-[backdrop-filter]:bg-nav/80">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-fg hover:text-accent"
          aria-label="Julius Gachuhi, home"
        >
          <span aria-hidden="true" className="text-accent">
            ~/
          </span>
          julius-gachuhi
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-2.5 py-2 text-sm transition-colors hover:text-fg ${
                      active ? "text-fg" : "text-muted"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line-strong bg-surface text-fg hover:border-brand md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Primary"
        hidden={!open}
        className="border-t border-line bg-nav md:hidden"
      >
        <ul className="mx-auto max-w-5xl px-5 py-3 sm:px-8">
          {NAV.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center border-b border-line/60 text-base last:border-0 ${
                    active ? "text-accent" : "text-fg"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
