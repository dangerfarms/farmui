import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx, resolveRadius, type FarmUIRadius, type FarmUISize } from "../../utils";

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Border radius token. @default "full" */
  radius?: FarmUIRadius;
  /** Render a status dot before the label, colored by the context. */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * Badge — a compact pill for statuses, counts, and labels.
 *
 * Neutral by default — status is declared by context, not props: declare
 * `--fui-context` on a region (an ancestor — a style query never matches
 * the element that declares it, so a one-element region is a wrapper) and
 * the pill's tint and text derive from that status's colour. Icons are
 * composed as svg children and detected — there are no slot props.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    size = "md",
    radius = "full",
    dot,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("fui-Badge-root", className)}
      data-size={size}
      style={
        { "--_radius": resolveRadius(radius), ...style } as React.CSSProperties
      }
      {...rest}
    >
      {dot && <span className={"fui-Badge-dot"} aria-hidden />}
      {children}
    </span>
  );
});
