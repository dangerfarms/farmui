import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Render a status dot before the label, colored by the context. */
  dot?: boolean;
  children?: ReactNode;
}

/**
 * A compact pill for statuses, counts, and labels.
 *
 * Neutral by default; a --fui-context region colours it. Declare
 * `--fui-context` on a region (an ancestor — a style query never matches
 * the element that declares it, so a one-element region is a wrapper) and
 * the pill's tint and text derive from that status's colour. Icons are
 * composed as svg children and detected — there are no slot props.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { size = "md", dot, className, style, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("fui-Badge-root", className)}
      data-size={size}
      style={style}
      {...rest}
    >
      {dot && <span className="fui-Badge-dot" aria-hidden />}
      {children}
    </span>
  );
});
