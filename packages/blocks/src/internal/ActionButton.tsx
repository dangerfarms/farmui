import type { FarmUISize } from "@farmui/core";

/** A call-to-action used by blocks (Hero, CTASection, PricingTable…). */
export interface BlockAction {
  label: string;
  href?: string;
  variant?: "filled" | "light" | "outline" | "subtle";
}

/**
 * Renders an action as a link styled with FarmUI's Button CSS. Using an anchor
 * keeps blocks server-safe (no JS) — the Button's static classes do the styling.
 */
export function ActionButton({
  label,
  href = "#",
  variant = "filled",
  size = "md",
}: BlockAction & { size?: FarmUISize }) {
  return (
    <a
      className="fui-Button-root"
      data-variant={variant}
      data-size={size}
      href={href}
    >
      {label}
    </a>
  );
}
