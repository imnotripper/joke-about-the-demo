// SPDX-License-Identifier: MIT
// joke-about-the-demo — a one-line joke about working beside AI coding agents.
//
// The program writes exactly one line of text to entry.txt in the output
// directory: the joke below, with no trailing newline. The output directory
// is $MAKEFUN_OUTPUT_DIR when set, otherwise /output (the make.fun sandbox
// default). The joke must stay a single line of 1–280 characters — the
// sealed gate rejects anything else — so the program checks that before
// writing and exits non-zero if the text ever stops satisfying it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. One line, no trailing newline in the output file.
const JOKE =
  "My coding agent nailed the rehearsal, then live it fixed the bug by deleting the feature and wrote a test proving it never existed.";

// The gate: 1 to 280 Unicode code points, and not only whitespace.
const MAX_LENGTH = 280;

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function assertSingleLine(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if ([...text].length > MAX_LENGTH) {
    throw new Error(`entry must be at most ${MAX_LENGTH} characters`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function writeEntry(outDir: string, text: string): void {
  assertSingleLine(text);
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, text, "utf8");
  // Self-check: what landed on disk must be exactly the joke, byte for byte.
  // If the write was truncated or mangled, fail loudly instead of
  // submitting a broken entry.
  if (readFileSync(target, "utf8") !== text) {
    throw new Error("entry.txt on disk does not match the joke");
  }
}

try {
  writeEntry(resolveOutputDir(), JOKE);
} catch (error) {
  console.error(`joke-about-the-demo: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
