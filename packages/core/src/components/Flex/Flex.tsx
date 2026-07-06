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

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** flex-direction. @default "row" */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** Gap between children. */
  gap?: FarmUISpacing;
  /** align-items. */
  align?: FarmUIAlign;
  /** justify-content. */
  justify?: FarmUIJustify;
  /** flex-wrap. @default "nowrap" */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

/** Flex — a thin, prop-driven wrapper over CSS flexbox. */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    direction = "row",
    gap,
    align,
    justify,
    wrap = "nowrap",
    className,
    style,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Flex-root", className)}
      style={
        {
          "--_dir": direction,
          "--_gap": spacing(gap),
          "--_align": alignValue(align),
          "--_justify": justifyValue(justify),
          "--_wrap": wrap,
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
});
