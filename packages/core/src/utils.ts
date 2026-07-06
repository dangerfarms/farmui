/** Tiny classnames joiner — no dependency needed. */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}

/** Shared size type used across FarmUI controls. */
export type FarmUISize = "sm" | "md" | "lg";
