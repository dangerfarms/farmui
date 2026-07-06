import { forwardRef } from "react";
import type { TableHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Shade alternating body rows. */
  striped?: boolean;
  /** Highlight the row under the pointer. */
  highlightOnHover?: boolean;
  /** Draw vertical borders between columns. */
  withColumnBorders?: boolean;
  /** Which side to place a <caption>. @default "top" */
  captionSide?: "top" | "bottom";
  /** Standard thead/tbody/tr/th/td markup. */
  children?: ReactNode;
}

/**
 * Table — a styled data table. Compose with native
 * thead/tbody/tr/th/td. Scrolls horizontally on overflow.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    striped,
    highlightOnHover,
    withColumnBorders,
    captionSide = "top",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div className={"fui-Table-scroll"}>
      <table
        ref={ref}
        className={cx("fui-Table-root", className)}
        data-striped={striped || undefined}
        data-hover={highlightOnHover || undefined}
        data-col-borders={withColumnBorders || undefined}
        data-caption-side={captionSide}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
});
