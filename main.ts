// Five Seconds to Explain the Glass — the cat's defence, in its own voice.
// Writes exactly one sentence (71 chars, no trailing newline) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Erasable TypeScript, stdlib only.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "You throw things for the dog all day, and I threw one thing for myself.";

function main(): void {
  const outDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
  if (outDir === undefined || outDir === "") {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error("line must be 1-200 characters, got " + LINE.length);
    process.exit(1);
  }
  if (LINE.length !== 71) {
    console.error("line must be exactly 71 characters, got " + LINE.length);
    process.exit(1);
  }
  if (LINE.trim() === "") {
    console.error("line must not be only whitespace");
    process.exit(1);
  }
  if (LINE.indexOf("\n") !== -1 || LINE.indexOf("\r") !== -1) {
    console.error("line must be a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target: string = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back: string = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: file does not equal the line");
    process.exit(1);
  }
}

main();
