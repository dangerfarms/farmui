import { Button } from "@farmui/core";

/** A call-to-action used by blocks (Hero, CTASection, PricingTable…). */
export interface BlockAction {
  label: string;
  href?: string;
}

/**
 * Renders an action as core's Button composed over a link — blocks stay
 * server-safe (no JS) and the styling comes from the real component, not a
 * copied class name. Appearance is contextual: the block's own CSS declares
 * `--fui-context` on the action region (Hero/CTASection: primary).
 */
export function ActionButton({ label, href = "#" }: BlockAction) {
  return <Button render={<a href={href} />}>{label}</Button>;
}
