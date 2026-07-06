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

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Total number of columns. @default 12 */
  columns?: number;
  /** Gap between columns and rows. @default "md" */
  gutter?: FarmUISpacing;
  /** align-items. */
  align?: FarmUIAlign;
  /** justify-content. */
  justify?: FarmUIJustify;
}

export interface GridColProps extends HTMLAttributes<HTMLDivElement> {
  /** Columns to span (or "auto" to size to content). @default full width */
  span?: number | "auto";
  /** Span once the Grid is ≥ 36rem wide (container query). */
  sm?: number;
  /** Span once the Grid is ≥ 48rem wide. */
  md?: number;
  /** Span once the Grid is ≥ 62rem wide. */
  lg?: number;
  /** Span once the Grid is ≥ 75rem wide. */
  xl?: number;
}

/** A column inside a `<Grid>`. Responsive spans use container queries. */
export const GridCol = forwardRef<HTMLDivElement, GridColProps>(
  function GridCol({ span, sm, md, lg, xl, className, style, ...rest }, ref) {
    const vars: Record<string, string | number> = {};
    if (typeof span === "number") vars["--_span"] = span;
    if (sm !== undefined) vars["--_span-sm"] = sm;
    if (md !== undefined) vars["--_span-md"] = md;
    if (lg !== undefined) vars["--_span-lg"] = lg;
    if (xl !== undefined) vars["--_span-xl"] = xl;

    return (
      <div
        ref={ref}
        className={cx("fui-Grid-col", className)}
        data-auto={span === "auto" || undefined}
        style={{ ...vars, ...style } as CSSProperties}
        {...rest}
      />
    );
  },
);

interface GridComponent extends React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLDivElement>
> {
  Col: typeof GridCol;
}

/**
 * Grid — a responsive 12-column layout. Column spans adapt to the Grid's own
 * width via container queries (`Grid.Col span={12} md={6} lg={4}`).
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 12, gutter = "md", align, justify, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Grid-root", className)}
      style={
        {
          "--_columns": columns,
          "--_gap": spacing(gutter),
          "--_align": alignValue(align),
          "--_justify": justifyValue(justify),
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
}) as GridComponent;

Grid.Col = GridCol;
