#!/usr/bin/env node
/**
 * Lists every open TODO that needs Julius's input before deploy:
 *   - TODO(julius) comments in code
 *   - <Todo>…</Todo> markers rendered on pages
 * Exits 1 if any remain, so it can gate a deploy.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => /\.(tsx?|mdx?)$/.test(f) && fs.existsSync(f) && !f.startsWith("scripts/"));

const hits = [];
for (const f of files) {
  fs.readFileSync(f, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const c = line.match(/TODO\(julius\):\s*(.*)/);
      const t = line.match(/<Todo>(.*?)<\/Todo>/);
      if (c) hits.push(`${f}:${i + 1}  ${c[1].trim()}`);
      else if (t) hits.push(`${f}:${i + 1}  [on page] ${t[1].trim()}`);
    });
}

if (!hits.length) {
  console.log("No open TODOs.");
  process.exit(0);
}
console.log(`${hits.length} open TODO(s):\n` + hits.map((h) => `  ${h}`).join("\n"));
process.exit(1);
