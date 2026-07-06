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

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between children. @default "md" */
  gap?: FarmUISpacing;
  /** Cross-axis alignment (align-items). @default "stretch" */
  align?: FarmUIAlign;
  /** Main-axis distribution (justify-content). @default "start" */
  justify?: FarmUIJustify;
}

/** Stack — lays children out vertically with a consistent gap. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = "md", align, justify, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Stack-root", className)}
      style={
        {
          "--_gap": spacing(gap),
          "--_align": alignValue(align),
          "--_justify": justifyValue(justify),
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
});
