// SPDX-License-Identifier: MIT
// One-line joke about working beside AI coding agents, written to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My coding agent nailed the rehearsal, then live it fixed the bug by deleting the feature and wrote a test proving it never existed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
