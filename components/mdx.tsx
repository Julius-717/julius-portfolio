import type { ReactNode } from "react";
import { Todo } from "@/components/ui";

/** Wraps any snippet or diagram that is not production configuration. */
export function Illustrative({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <figure className="not-prose my-8">
      <figcaption className="mb-2 flex items-center gap-2 font-mono text-xs text-warn">
        <span aria-hidden="true" className="rounded border border-warn/40 px-1.5 py-0.5">
          illustrative
        </span>
        <span className="text-subtle">
          {note ?? "Simplified example. Not production configuration; no real identifiers."}
        </span>
      </figcaption>
      <div className="prose prose-invert prose-case max-w-none [&_pre]:my-0">{children}</div>
    </figure>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = "default",
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: "default" | "accent" | "ok" | "warn";
  dashed?: boolean;
}) {
  const stroke = {
    default: "stroke-line-strong",
    accent: "stroke-accent",
    ok: "stroke-ok",
    warn: "stroke-warn",
  }[tone];
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={`fill-surface-2 ${stroke}`}
        strokeWidth={1.25}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <text
        x={x + w / 2}
        y={sub ? cy - 4 : cy + 4.5}
        textAnchor="middle"
        className="fill-fg"
        style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={cy + 12}
          textAnchor="middle"
          className="fill-subtle"
          style={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-subtle" strokeWidth={1.25} markerEnd="url(#arrow)" />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" className="fill-subtle" />
      </marker>
    </defs>
  );
}

function Check({ y, label, sub }: { y: number; label: string; sub: string }) {
  return (
    <g>
      <rect x={20} y={y} width={360} height={34} rx={6} className="fill-surface stroke-line" strokeWidth={1} />
      <text x={34} y={y + 21.5} className="fill-fg" style={{ fontSize: 12.5, fontFamily: "var(--font-sans)" }}>
        {label}
      </text>
      <text x={366} y={y + 21.5} textAnchor="end" className="fill-subtle" style={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}>
        {sub}
      </text>
    </g>
  );
}

/** Case study 2: the scheduled scanning pipeline. */
export function PipelineDiagram() {
  return (
    <Illustrative note="Shape of the pipeline. Categories only; no real names, accounts or schedules beyond those stated.">
      <svg
        viewBox="0 0 400 450"
        role="img"
        aria-labelledby="pipeline-title pipeline-desc"
        className="mx-auto block h-auto w-full max-w-md"
      >
        <title id="pipeline-title">Secure SDLC pipeline</title>
        <desc id="pipeline-desc">
          Scheduled triggers defined in infrastructure as code start five checks: SAST, nightly SCA, weekly gated DAST,
          a weekly dependency-alert report and nightly API smoke tests. Each runs as its own build project with a
          least-privilege role and writes to a single evidence store, which feeds notifications and the product UI.
        </desc>
        <ArrowDefs />
        <Box x={20} y={10} w={360} h={44} label="Scheduled triggers" sub="defined in OpenTofu" tone="accent" />
        <Arrow x1={200} y1={54} x2={200} y2={73} />
        <Check y={76} label="SAST" sub="scheduled" />
        <Check y={118} label="SCA" sub="nightly" />
        <Check y={160} label="DAST" sub="weekly · gated" />
        <Check y={202} label="Dependency alerts report" sub="weekly" />
        <Check y={244} label="API smoke tests" sub="nightly" />
        <text x={200} y={298} textAnchor="middle" className="fill-subtle" style={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}>
          each: own build project + least-privilege role
        </text>
        <Arrow x1={200} y1={306} x2={200} y2={325} />
        <Box x={20} y={328} w={360} h={44} label="Single evidence store" sub="every run, pass or fail" tone="ok" />
        <Arrow x1={110} y1={372} x2={110} y2={395} />
        <Arrow x1={290} y1={372} x2={290} y2={395} />
        <Box x={20} y={398} w={175} h={40} label="Notifications" />
        <Box x={205} y={398} w={175} h={40} label="Product UI" />
      </svg>
    </Illustrative>
  );
}

/** Case study 1: the fail-closed DAST gate. */
export function DastGateDiagram() {
  return (
    <Illustrative note="Decision flow of the gate. Simplified.">
      <svg
        viewBox="0 0 400 440"
        role="img"
        aria-labelledby="gate-title gate-desc"
        className="mx-auto block h-auto w-full max-w-md"
      >
        <title id="gate-title">Fail-closed DAST gate</title>
        <desc id="gate-desc">
          The scan runs, then its raw output and run metadata are written to the evidence store before any decision.
          The gate then requires four checks to pass: output parses, no targets dropped, coverage at least 98 percent,
          and no critical findings. Any failure fails the run closed with a non-zero exit and a notification. A
          self-test mode triggers one harmless critical check to prove the gate blocks.
        </desc>
        <ArrowDefs />
        <Box x={20} y={10} w={360} h={40} label="Run DAST scan" sub="weekly" tone="accent" />
        <Arrow x1={200} y1={50} x2={200} y2={67} />
        <Box x={20} y={70} w={360} h={44} label="Record evidence first" sub="raw output + run metadata" tone="ok" />
        <Arrow x1={200} y1={114} x2={200} y2={131} />
        <rect x={20} y={134} width={360} height={170} rx={8} className="fill-surface stroke-line-strong" strokeWidth={1.25} />
        <text x={34} y={154} className="fill-subtle" style={{ fontSize: 10.5, fontFamily: "var(--font-mono)" }}>
          gate: every check must pass
        </text>
        <Check y={164} label="Output parses" sub="else fail" />
        <Check y={198} label="No targets dropped" sub="else fail" />
        <Check y={232} label="Coverage ≥ 98%" sub="else fail" />
        <Check y={266} label="No critical findings" sub="else fail" />
        <Arrow x1={110} y1={304} x2={110} y2={327} />
        <Arrow x1={290} y1={304} x2={290} y2={327} />
        <Box x={20} y={330} w={175} h={44} label="Pass" sub="all four checks" tone="ok" />
        <Box x={205} y={330} w={175} h={44} label="Fail closed" sub="non-zero exit + notify" tone="warn" />
        <Box x={20} y={388} w={360} h={40} label="Self-test: one harmless critical check" sub="the gate must block" dashed />
      </svg>
    </Illustrative>
  );
}

export const mdxComponents = {
  Illustrative,
  PipelineDiagram,
  DastGateDiagram,
  Todo,
};
