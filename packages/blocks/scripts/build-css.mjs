// Build dist/styles.css: the layer-order header, then every block's CSS
// (and shared internal CSS) wrapped into `farmui.blocks` here — block source
// files contain no `@layer`.
// Import AFTER "@farmui/core/styles.css".
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "src");

const header = `/*!\n * FarmUI — @farmui/blocks\n * Ready-made page sections. Import AFTER @farmui/core/styles.css:\n *   import "@farmui/core/styles.css";\n *   import "@farmui/blocks/styles.css";\n */\n\n`;

/** Recursively collect every .css under a dir except the base styles.css. */
function collect(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collect(full));
    else if (entry.name.endsWith(".css") && full !== join(src, "styles.css"))
      files.push(full);
  }
  return files.sort();
}

let out = header + readFileSync(join(src, "styles.css"), "utf8").trim() + "\n";

const cssFiles = collect(src);
for (const file of cssFiles) {
  const css = readFileSync(file, "utf8").trim();
  if (!css) continue;
  if (css.includes("@layer")) {
    throw new Error(
      `${file} declares @layer — block CSS files must not; the layer is assigned at build time.`,
    );
  }
  out += `\n/* ${file.slice(src.length + 1)} */\n@layer farmui.blocks {\n${css}\n}\n`;
}

mkdirSync(join(pkgRoot, "dist"), { recursive: true });
writeFileSync(join(pkgRoot, "dist", "styles.css"), out);
console.log(
  `build-css: wrote dist/styles.css (${cssFiles.length} files, ${out.length} bytes)`,
);
