import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Regenerate the static stylesheet and prepend the "use client" directive
  // after every build — including `tsup --watch` in dev, which would otherwise
  // leave dist/ without styles.css and without the directive (esbuild strips
  // module-level directives when bundling, so a banner won't stick).
  onSuccess: "node scripts/build-css.mjs",
});
