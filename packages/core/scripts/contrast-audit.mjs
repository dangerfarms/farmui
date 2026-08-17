/**
 * WCAG contrast audit over the token palette. The CSS stays the single
 * source: tokens are read from the tokens.css AST (root scope only — the
 * context blocks re-answer tokens per region, which the browser scopes
 * itself), and the label/tint recipes are read back out of the component
 * CSS rather than assumed, so a weight change there is re-audited, not
 * silently trusted. Fails CI on any pair below threshold — and throws on
 * any colour form it cannot resolve exactly (alpha, unknown functions,
 * out-of-sRGB-gamut values), so an unresolvable token can never PASS.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const src = (...p) => join(dirname(fileURLToPath(import.meta.url)), "..", "src", ...p);
const css = readFileSync(src("tokens.css"), "utf8");

// ---- colour math -----------------------------------------------------
// oklch → OKLab → linear sRGB (Ottosson's matrices) → WCAG relative
// luminance. Out-of-gamut values get the CSS gamut-mapping treatment —
// hold lightness and hue, shrink chroma until sRGB contains it — so the
// audited numbers track what a browser actually renders, not a per-channel
// clip of a colour it never shows.
const gam = (u) => (u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055);
const lin = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);

function oklabToLinear([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const inGamut = (rgb) => rgb.every((u) => u >= -1e-6 && u <= 1 + 1e-6);

function oklabToSrgb([L, a, b]) {
  let linear = oklabToLinear([L, a, b]);
  if (!inGamut(linear)) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklabToLinear([L, a * mid, b * mid]))) lo = mid;
      else hi = mid;
    }
    linear = oklabToLinear([L, a * lo, b * lo]);
  }
  return linear.map((u) => gam(Math.min(1, Math.max(0, u))));
}
function srgbToOklab([r, g, b]) {
  const [lr, lg, lb] = [lin(r), lin(g), lin(b)];
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
const oklchToSrgb = (L, C, H) => {
  const h = (H * Math.PI) / 180;
  return oklabToSrgb([L, C * Math.cos(h), C * Math.sin(h)]);
};
const relLum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const contrast = (c1, c2) => {
  const [l1, l2] = [relLum(c1), relLum(c2)];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const mixOklab = (c1, c2, w2) => {
  const [a, b] = [srgbToOklab(c1), srgbToOklab(c2)];
  return oklabToSrgb(a.map((x, i) => x * (1 - w2) + b[i] * w2));
};

// ---- token collection (root scope only) ------------------------------
// The context blocks re-declare tokens inside @container rules; those
// apply per region in the browser and must not shadow the root palette
// here (a flat text scan would let the last block win and audit the
// wrong colours).
const decls = {};
postcss.parse(css).walkDecls(/^--fui-/, (decl) => {
  for (let p = decl.parent; p; p = p.parent) {
    if (p.type === "atrule" && p.name !== "layer") return;
  }
  if (decl.prop in decls) throw new Error(`duplicate root declaration of ${decl.prop}`);
  decls[decl.prop] = decl.value.trim();
});

// ---- token resolution (the subset tokens.css uses) -------------------
function resolve(expr, scheme) {
  expr = expr.trim();
  const ld = expr.match(/^light-dark\(([\s\S]+)\)$/);
  if (ld) {
    const parts = splitTop(ld[1]);
    return resolve(scheme === "light" ? parts[0] : parts[1], scheme);
  }
  const v = expr.match(/^var\((--[\w-]+)\)$/);
  if (v) {
    if (!(v[1] in decls)) throw new Error(`unknown token ${v[1]}`);
    return resolve(decls[v[1]], scheme);
  }
  const ok = expr.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)deg(\s*\/\s*[\d.]+%?)?\)$/);
  if (ok) {
    if (ok[4]) throw new Error(`translucent colour in an audited chain: ${expr} — contrast depends on what shows through, which this audit cannot know`);
    return oklchToSrgb(+ok[1] / 100, +ok[2], +ok[3]);
  }
  const mix = expr.match(/^color-mix\(in oklab,\s*([\s\S]+)\)$/);
  if (mix) {
    const parts = splitTop(mix[1]);
    const pct = (p) => {
      const m2 = p.match(/([\s\S]+?)\s+([\d.]+)%$/);
      return m2 ? [m2[1].trim(), +m2[2] / 100] : [p.trim(), null];
    };
    const [c1e, w1] = pct(parts[0]);
    const [c2e, w2raw] = pct(parts[1]);
    const w2 = w2raw ?? (w1 != null ? 1 - w1 : 0.5);
    return mixOklab(resolve(c1e, scheme), resolve(c2e, scheme), w2);
  }
  throw new Error(`cannot resolve: ${expr}`);
}
function splitTop(s) {
  const out = [];
  let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((x) => x.trim());
}
const T = (name, scheme) => resolve(`var(${name})`, scheme);

// ---- recipes read from component CSS ---------------------------------
// Button/Badge/Alert derive every look from one colour channel, so their
// label colour is a recipe on the channel, not a token. The audit reads
// the weights out of each file: change a weight and the changed pair is
// what gets audited.
function labelWeights(file, channel) {
  const text = readFileSync(src("components", file), "utf8");
  const re = new RegExp(
    String.raw`light-dark\(\s*color-mix\(in oklab,\s*var\(${channel}\)\s+([\d.]+)%,\s*oklch\(0% 0 0deg\)\s*\),\s*color-mix\(in oklab,\s*var\(${channel}\)\s+([\d.]+)%,\s*oklch\(100% 0 0deg\)\s*\)\s*\)`,
  );
  const m = text.match(re);
  if (!m) throw new Error(`label recipe not found in ${file} — update this audit alongside the recipe`);
  return { light: +m[1] / 100, dark: +m[2] / 100 };
}
const labelRecipes = [
  labelWeights("Button/Button.css", "--_color"),
  labelWeights("Badge/Badge.css", "--_color"),
  labelWeights("Alert/Alert.css", "--_accent"),
  labelWeights("ErrorSummary/ErrorSummary.css", "--fui-danger"),
];
for (const r of labelRecipes.slice(1)) {
  if (r.light !== labelRecipes[0].light || r.dark !== labelRecipes[0].dark) {
    throw new Error("label recipes have drifted apart across Button/Badge/Alert/ErrorSummary");
  }
}
const LABEL = labelRecipes[0];
const mixedLabel = (colour, scheme) =>
  scheme === "light"
    ? mixOklab(colour, [0, 0, 0], 1 - LABEL.light)
    : mixOklab(colour, [1, 1, 1], 1 - LABEL.dark);

// Button's rest-state background tint (the first light-dark background in
// the file; the hover tint below it is darker, so rest is the worst case
// for the label).
function buttonTintWeights() {
  const text = readFileSync(src("components", "Button", "Button.css"), "utf8");
  const m = text.match(
    /light-dark\(\s*color-mix\(in oklab,\s*var\(--_color\),\s*var\(--fui-bg\)\s+([\d.]+)%\s*\),\s*color-mix\(in oklab,\s*var\(--_color\),\s*var\(--fui-bg\)\s+([\d.]+)%\s*\)\s*\)/,
  );
  if (!m) throw new Error("Button tint recipe not found — update this audit alongside the recipe");
  return { light: +m[1] / 100, dark: +m[2] / 100 };
}
const TINT = buttonTintWeights();

// ---- the audited pairs ----------------------------------------------
const failures = [];
function check(name, scheme, fg, bg, need) {
  const r = contrast(fg, bg);
  const ok = r >= need;
  if (!ok) failures.push(name);
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}  (≥${need})  [${scheme}] ${name}`);
}

for (const scheme of ["light", "dark"]) {
  const t = (n) => T(n, scheme);
  check("text on bg", scheme, t("--fui-text"), t("--fui-bg"), 4.5);
  check("text-muted on bg", scheme, t("--fui-text-muted"), t("--fui-bg"), 4.5);
  check("text-dim (placeholder) on surface", scheme, t("--fui-text-dim"), t("--fui-surface"), 4.5);
  check("danger text (Field.Error) on bg", scheme, t("--fui-danger"), t("--fui-bg"), 4.5);
  check("fill text on primary-strong", scheme, t("--fui-on-strong"), t("--fui-primary-strong"), 4.5);
  check("fill text on danger-strong", scheme, t("--fui-on-strong"), t("--fui-danger-strong"), 4.5);
  check("fill text on warning-strong", scheme, t("--fui-on-strong"), t("--fui-warning-strong"), 4.5);
  check("fill text on info-strong", scheme, t("--fui-on-strong"), t("--fui-info-strong"), 4.5);
  check("ErrorSummary link on danger-soft", scheme, mixedLabel(t("--fui-danger"), scheme), t("--fui-danger-soft"), 4.5);
  for (const s of ["primary", "danger", "warning", "info"]) {
    const colour = t(`--fui-${s}`);
    const tint = mixOklab(colour, t("--fui-bg"), scheme === "light" ? TINT.light : TINT.dark);
    check(`button ${s} text on its tint`, scheme, mixedLabel(colour, scheme), tint, 4.5);
  }
  check("input border-strong vs surface", scheme, t("--fui-border-strong"), t("--fui-surface"), 3.0);
  // Checked Checkbox/Radio/Switch/Slider paint their glyph (tick, dot,
  // thumb) in --fui-on-strong over the raw primary fill — a non-text
  // state indicator, so the 1.4.11 3:1 bar applies.
  check("checked-control glyph on primary", scheme, t("--fui-on-strong"), t("--fui-primary"), 3.0);
  for (const s of ["primary", "danger", "warning", "info"]) {
    check(`${s} focus ring vs bg`, scheme, t(`--fui-${s}-ring`), t("--fui-bg"), 3.0);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} contrast pair(s) below WCAG threshold.`);
  process.exit(1);
}
console.log("\nAll audited pairs pass.");
