import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // The "use client" directive is added post-build (scripts/build-css.mjs):
  // esbuild strips module-level directives when bundling, so a banner won't stick.
});
