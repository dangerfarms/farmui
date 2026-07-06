import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, spacing, type FarmUISpacing } from "../../utils";

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Block-size (vertical space). */
  h?: FarmUISpacing;
  /** Inline-size (horizontal space). */
  w?: FarmUISpacing;
}

/** Space — an empty box used to add whitespace between elements. */
export const Space = forwardRef<HTMLDivElement, SpaceProps>(function Space(
  { h, w, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Space-root", className)}
      style={
        {
          "--_h": spacing(h),
          "--_w": spacing(w),
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
});
