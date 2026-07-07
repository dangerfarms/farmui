import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  // Blocks are server-safe presentational sections — no "use client". They
  // compose @farmui/core (which is client-safe) but ship zero JS themselves.
  external: ["react", "react-dom", "react/jsx-runtime", "@farmui/core"],
});
