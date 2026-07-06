import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Inline size (any CSS length). @default "100%" */
  width?: number | string;
  /** Block size (any CSS length). @default "1rem" */
  height?: number | string;
  /** Border radius (any CSS length or token value). @default "var(--fui-radius-md)" */
  radius?: number | string;
  /** Render as a circle (equal width/height, full radius). */
  circle?: boolean;
  /** When false, render `children` instead of the placeholder. @default true */
  visible?: boolean;
  /** Real content, shown once `visible` is false. */
  children?: ReactNode;
}

const toLen = (v: number | string | undefined): string | undefined =>
  typeof v === "number" ? `${v}px` : v;

/**
 * Skeleton — an animated placeholder shown while content loads.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      width,
      height,
      radius,
      circle,
      visible = true,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    if (!visible) return <>{children}</>;

    const size = circle
      ? (toLen(width) ?? toLen(height) ?? "2.5rem")
      : undefined;
    const vars: CSSProperties = {
      "--_w": circle ? size : (toLen(width) ?? "100%"),
      "--_h": circle ? size : (toLen(height) ?? "1rem"),
      "--_radius": circle
        ? "var(--fui-radius-full)"
        : (toLen(radius) ?? "var(--fui-radius-md)"),
      ...style,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={cx("fui-Skeleton-root", className)}
        aria-hidden
        style={vars}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
