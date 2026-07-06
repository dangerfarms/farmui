import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../utils";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Width-to-height ratio, e.g. 16 / 9 or 1. @default 1 */
  ratio?: number;
}

/**
 * AspectRatio — constrains its child to a fixed ratio using the native
 * CSS `aspect-ratio` property. Ideal for images, video and embeds.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = 1, className, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx("fui-AspectRatio-root", className)}
        style={{ "--_ratio": String(ratio), ...style } as CSSProperties}
        {...rest}
      />
    );
  },
);
