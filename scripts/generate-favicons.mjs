/**
 * Generate favicon PNGs and ICO from a 48x48 source PNG.
 * Usage: node scripts/generate-favicons.mjs [publicDir] [sourcePng]
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const publicDir = process.argv[2] ?? join(import.meta.dirname, "..", "public");
const sourcePng =
  process.argv[3] ?? join(publicDir, "icons", "favicon48.png");
const iconsDir = join(publicDir, "icons");

const sizes = [
  { name: "favicon32.png", size: 32 },
  { name: "favicon48.png", size: 48 },
  { name: "favicon192.png", size: 192 },
];

async function main() {
  await readFile(sourcePng);
  await mkdir(iconsDir, { recursive: true });

  const sourcePath = resolve(sourcePng);

  for (const { name, size } of sizes) {
    const dest = join(iconsDir, name);
    if (sourcePath === resolve(dest)) {
      continue;
    }
    await sharp(sourcePath).resize(size, size).png().toFile(dest);
  }

  const png48 = await sharp(sourcePath).resize(48, 48).png().toBuffer();
  const ico = await toIco([png48]);
  await writeFile(join(publicDir, "favicon.ico"), ico);

  console.log(`Generated favicons in ${publicDir} from ${sourcePng}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
