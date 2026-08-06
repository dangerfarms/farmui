/** Tiny classnames joiner — no dependency needed. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

/** Shared size type used across FarmUI controls. */
export type FarmUISize = "sm" | "md" | "lg";

/** Border-radius token keys shared across FarmUI controls. */
export type FarmUIRadius = "sm" | "md" | "lg" | "xl" | "full";

const RADIUS: Record<FarmUIRadius, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/** Resolve a radius token key to its CSS custom property. */
export function resolveRadius(radius: FarmUIRadius = "md"): string {
  return RADIUS[radius];
}

/**
 * A spacing value: a design token key, a raw CSS length, or a number (px).
 * Used by the layout primitives for gaps, padding and sizes.
 */
export type FarmUISpacing =
  "xs" | "sm" | "md" | "lg" | "xl" | (string & {}) | number;

const SPACE_TOKENS = new Set(["xs", "sm", "md", "lg", "xl"]);

/** Resolve a spacing value to a CSS length (token → var, number → px, else raw). */
export function spacing(value?: FarmUISpacing): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "number") return `${value}px`;
  if (SPACE_TOKENS.has(value)) return `var(--fui-space-${value})`;
  return value;
}

export type FarmUIAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FarmUIJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

const ALIGN: Record<FarmUIAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const JUSTIFY: Record<FarmUIJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export function alignValue(v?: FarmUIAlign): string | undefined {
  return v ? ALIGN[v] : undefined;
}

export function justifyValue(v?: FarmUIJustify): string | undefined {
  return v ? JUSTIFY[v] : undefined;
}
