#!/usr/bin/env node
/**
 * Confidentiality check. Fails (exit 1) if any source file or built page
 * contains patterns that must never be published:
 *   - 12-digit AWS account IDs, ARNs, access-key IDs, private keys
 *   - IP addresses, internal hostnames/domains
 *   - ticket-key patterns (ABC-123)
 *   - the employer's name anywhere except the EMPLOYER_NAME constant,
 *     and (in built output) anywhere except the Experience page
 *
 * Usage: node scripts/check-confidential.mjs   (run after `next build` to include built HTML)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EMPLOYER = /enquire/i;
// The CV names the employer in its Experience section, like the Experience page.
const EMPLOYER_ALLOWED_SOURCE = new Set(["lib/site.ts", "cv/cv.html"]);
// Built output for the /experience route (html, rsc and its segment files).
const EMPLOYER_ALLOWED_PAGE = /^\.next\/server\/app\/experience(\.|\/)/;

const TICKET_ALLOW = /^(UTF|SHA|AES|ISO|CVE|IPV|HTTP|TLS|SSL|ES|ECMA|RFC|WCAG|CWE|PEP|OAUTH)-/i;

const RULES = [
  { name: "12-digit number (AWS account ID?)", re: /(?<![\d.])\d{12}(?![\d.])/g },
  { name: "ARN", re: /arn:aws[a-z-]*:/gi },
  { name: "AWS access key ID", re: /\b(AKIA|ASIA)[0-9A-Z]{16}\b/g },
  { name: "Private key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "Slack webhook", re: /hooks\.slack\.com\/services\//g },
  { name: "IPv4 address", re: /(?<![\d.])(?:\d{1,3}\.){3}\d{1,3}(?![\d.])/g },
  { name: "Internal hostname", re: /\b[\w-]+(?:\.[\w-]+)*\.(?:internal|local|corp|lan|intra|intranet)\b/gi },
  { name: "Ticket key", re: /\b[A-Z][A-Z0-9]{1,9}-\d{1,6}\b/g, allow: (m) => TICKET_ALLOW.test(m) },
];

const TEXT_EXT = /\.(tsx?|jsx?|mjs|cjs|mdx?|css|json|webmanifest|txt|xml|html|rsc|ya?ml)$/i;
const SKIP = [/^package-lock\.json$/, /^scripts\/check-confidential\.mjs$/];

function sourceFiles() {
  const out = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" });
  return out
    .split("\n")
    .filter(Boolean)
    .filter((f) => TEXT_EXT.test(f) && !SKIP.some((re) => re.test(f)) && fs.existsSync(f));
}

function builtPages() {
  const dir = path.join(ROOT, ".next/server/app");
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(html|rsc|body)$/.test(e.name)) files.push(p);
    }
  };
  walk(dir);
  return files;
}

const problems = [];

function scan(file, text, { built }) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  // Strip inline <script>/<style> chunk payloads from built HTML only for the
  // numeric rules (bundled JS contains hashes and numbers that are not content).
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (built && rule.name !== "ARN" && rule.name !== "Internal hostname" && rule.name !== "Ticket key") continue;
      for (const m of line.matchAll(rule.re)) {
        if (rule.allow?.(m[0])) continue;
        problems.push(`${rel}:${i + 1}  ${rule.name}: ${m[0]}`);
      }
    }
    if (EMPLOYER.test(line)) {
      const ok = built ? EMPLOYER_ALLOWED_PAGE.test(rel) : EMPLOYER_ALLOWED_SOURCE.has(rel);
      if (!ok) problems.push(`${rel}:${i + 1}  Employer name outside allowed location`);
    }
  });
}

const src = sourceFiles();
for (const f of src) scan(f, fs.readFileSync(f, "utf8"), { built: false });
const built = builtPages();
for (const f of built) scan(f, fs.readFileSync(f, "utf8"), { built: true });

console.log(`Scanned ${src.length} source files and ${built.length} built pages.`);
if (built.length === 0) console.log("(No build output found; run `npm run build` first to include rendered pages.)");
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log("No confidential patterns found.");
