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
