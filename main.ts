// The One-Line Laugh — one funny line about everyday life.
// Writes the line deterministically to /output/entry.txt (1-200 chars, no newline).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My fitness tracker congratulated me on 10,000 steps — I'd just spent an hour looking for the TV remote.";

// The gate counts Unicode code points: 1-200, and the text must not be only whitespace.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`line is ${length} code points, outside 1-200`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write round-trips byte for byte, so a silent partial write can never pass.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the line");
}
