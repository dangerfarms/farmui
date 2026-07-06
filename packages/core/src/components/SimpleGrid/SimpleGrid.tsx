import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, spacing, type FarmUISpacing } from "../../utils";

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of equal-width columns. @default 3 */
  cols?: number;
  /**
   * Minimum column width. When set, the grid becomes intrinsically responsive
   * — columns wrap automatically with no breakpoints
   * (`repeat(auto-fill, minmax(...))`). Overrides `cols`.
   */
  minChildWidth?: FarmUISpacing;
  /** Gap between items (both axes). @default "md" */
  gap?: FarmUISpacing;
}

/** SimpleGrid — an equal-width CSS grid that can size columns intrinsically. */
export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  function SimpleGrid(
    { cols = 3, minChildWidth, gap = "md", className, style, ...rest },
    ref,
  ) {
    const responsive = minChildWidth != null;
    return (
      <div
        ref={ref}
        className={cx("fui-SimpleGrid-root", className)}
        data-responsive={responsive || undefined}
        style={
          {
            "--_cols": cols,
            "--_min": spacing(minChildWidth),
            "--_gap": spacing(gap),
            ...style,
          } as CSSProperties
        }
        {...rest}
      />
    );
  },
);
