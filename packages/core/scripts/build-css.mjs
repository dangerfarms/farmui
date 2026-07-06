// Concatenate the base stylesheet (tokens + reset + layer order) with every
// component's plain CSS into a single, importable dist/styles.css.
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "src");
const componentsDir = join(src, "components");

const header = `/*!\n * FarmUI — @farmui/core\n * The complete, static stylesheet. Import once at your app root:\n *   import "@farmui/core/styles.css";\n * Nothing runs at runtime — no CSS-in-JS.\n */\n\n`;

let out = header + readFileSync(join(src, "styles.css"), "utf8").trim() + "\n";

const names = readdirSync(componentsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

let count = 0;
for (const name of names) {
  const cssPath = join(componentsDir, name, `${name}.css`);
  try {
    const css = readFileSync(cssPath, "utf8").trim();
    if (css) {
      out += `\n/* ${name} */\n${css}\n`;
      count++;
    }
  } catch {
    // component has no stylesheet — skip
  }
}

mkdirSync(join(pkgRoot, "dist"), { recursive: true });
writeFileSync(join(pkgRoot, "dist", "styles.css"), out);
console.log(
  `build-css: wrote dist/styles.css (${count} components, ${out.length} bytes)`,
);

// FarmUI ships as a client-safe package (like @mantine/core): prepend the
// "use client" directive so every component can be imported directly from a
// React Server Component. esbuild strips this when bundling, so we add it here.
const entry = join(pkgRoot, "dist", "index.js");
const js = readFileSync(entry, "utf8");
if (!js.startsWith('"use client"')) {
  writeFileSync(entry, `"use client";\n${js}`);
  console.log('build-css: prepended "use client" to dist/index.js');
}

