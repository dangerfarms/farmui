import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import {
  cx,
  spacing,
  alignValue,
  justifyValue,
  type FarmUISpacing,
  type FarmUIAlign,
  type FarmUIJustify,
} from "../../utils";

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between children. @default "md" */
  gap?: FarmUISpacing;
  /** Cross-axis alignment (align-items). @default "center" */
  align?: FarmUIAlign;
  /** Main-axis distribution (justify-content). @default "start" */
  justify?: FarmUIJustify;
  /** Wrap children onto multiple rows. @default true */
  wrap?: boolean;
  /** Make each child grow to fill the row equally. */
  grow?: boolean;
}

/** Group — lays children out horizontally with a consistent gap. */
export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(
  {
    gap = "md",
    align = "center",
    justify,
    wrap = true,
    grow,
    className,
    style,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Group-root", className)}
      data-grow={grow || undefined}
      style={
        {
          "--_gap": spacing(gap),
          "--_align": alignValue(align),
          "--_justify": justifyValue(justify),
          "--_wrap": wrap ? "wrap" : "nowrap",
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
});
