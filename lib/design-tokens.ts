/**
 * Mirror of the colour tokens in app/globals.css (@theme), for places that
 * can't read CSS variables: the generated OG image, viewport themeColor, and
 * public/site.webmanifest (static, update by hand). Keep these in sync.
 */
export const TOKENS = {
  bg: "#080D1A",
  nav: "#0B1220",
  surface: "#111827",
  line: "#1E293B",
  fg: "#F8FAFC",
  muted: "#94A3B8",
  subtle: "#7C8BA1",
  brand: "#3B82F6",
  accent: "#38BDF8",
  ok: "#10B981",
  gradientPrimary: "linear-gradient(120deg, #101B32 0%, #1D4ED8 55%, #38BDF8 100%)",
} as const;
