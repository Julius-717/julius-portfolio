#!/usr/bin/env node
/**
 * Crawls a running site from "/" and checks every internal link, fragment
 * and asset returns 200 (following redirects). External links are listed,
 * not fetched.
 *
 * Usage: npm run build && npm start   (in another terminal)
 *        node scripts/check-links.mjs [baseUrl]   default http://localhost:3000
 */
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const seen = new Map(); // path -> status
const pages = new Map(); // path -> html
const external = new Set();
const fragments = []; // [fromPath, targetPath, id]
const queue = ["/", "/sitemap.xml", "/robots.txt", "/opengraph-image", "/site.webmanifest"];

function extract(html) {
  const out = [];
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) out.push(m[1].replaceAll("&amp;", "&"));
  return out;
}

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  const res = await fetch(new URL(p, base), { redirect: "follow" });
  seen.set(p, res.status);
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) continue;
  const html = await res.text();
  pages.set(p, html);
  for (const link of extract(html)) {
    if (/^(mailto:|tel:|data:|javascript:)/.test(link)) continue;
    const u = new URL(link, new URL(p, base));
    if (u.origin !== base.origin) {
      external.add(u.href);
      continue;
    }
    if (u.pathname.startsWith("/_next/")) {
      if (!seen.has(u.pathname + u.search)) queue.push(u.pathname + u.search);
      continue;
    }
    if (u.hash) fragments.push([p, u.pathname, decodeURIComponent(u.hash.slice(1))]);
    if (!seen.has(u.pathname)) queue.push(u.pathname);
  }
}

const broken = [...seen].filter(([, s]) => s !== 200);
const badFragments = fragments.filter(([, target, id]) => {
  const html = pages.get(target);
  return html && !html.includes(`id="${id}"`);
});

const htmlPages = [...pages.keys()].sort();
console.log(`Crawled ${seen.size} URLs (${htmlPages.length} HTML pages):`);
for (const p of htmlPages) console.log(`  ${seen.get(p)}  ${p}`);
console.log(`\nExternal links (not fetched): ${external.size}`);
for (const e of [...external].sort()) console.log(`  ${e}`);

if (broken.length || badFragments.length) {
  console.error("\nBroken:");
  for (const [p, s] of broken) console.error(`  ${s}  ${p}`);
  for (const [from, target, id] of badFragments) console.error(`  missing #${id} on ${target} (linked from ${from})`);
  process.exit(1);
}
console.log("\nAll internal links, fragments and assets OK.");
