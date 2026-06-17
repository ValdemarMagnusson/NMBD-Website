import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const base = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const projects = ["noah-landingpage-2", "landingpage-4", "noah-landingpage-5"];

for (const proj of projects) {
  const svg = join(base, proj, "public", "og-image.svg");
  const png = join(base, proj, "public", "og-image.png");
  const buf = readFileSync(svg);
  await sharp(buf, { density: 150 }).resize(1200, 630).png().toFile(png);
  console.log(`Wrote ${png}`);
}
