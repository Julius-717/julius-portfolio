#!/usr/bin/env node
/**
 * Renders cv/cv.html to public/pdf/Julius_Gachuhi_CV.pdf with headless Chrome/Edge.
 * Set CHROME_PATH to use a specific browser; defaults to Microsoft Edge on Windows.
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const browser =
  process.env.CHROME_PATH ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const src = pathToFileURL(path.resolve("cv/cv.html")).href;
const out = path.resolve("public/pdf/Julius_Gachuhi_CV.pdf");

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${out}`,
  src,
], { stdio: "inherit" });
console.log(`Wrote ${out}`);
