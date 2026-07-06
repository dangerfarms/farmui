import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, spacing, type FarmUISpacing } from "../../utils";

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<ContainerSize, string> = {
  xs: "33rem",
  sm: "45rem",
  md: "60rem",
  lg: "71.25rem",
  xl: "82.5rem",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max width — a named size, a number (px) or any CSS length. @default "lg" */
  size?: ContainerSize | number | (string & {});
  /** Horizontal padding. @default "lg" */
  padding?: FarmUISpacing;
  /** Remove the max width and stretch to fill. */
  fluid?: boolean;
}

function resolveSize(size: ContainerProps["size"]): string | undefined {
  if (size == null) return undefined;
  if (typeof size === "number") return `${size}px`;
  return SIZES[size as ContainerSize] ?? size;
}

/** Container — centers content and caps its width for readable line lengths. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { size = "lg", padding, fluid, className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cx("fui-Container-root", className)}
        data-fluid={fluid || undefined}
        style={
          {
            "--_size": resolveSize(size),
            "--_px": spacing(padding),
            ...style,
          } as CSSProperties
        }
        {...rest}
      />
    );
  },
);
