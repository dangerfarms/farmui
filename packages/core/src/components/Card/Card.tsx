import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. @default "md" */
  padding?: "sm" | "md" | "lg";
  /** Draw a border around the card. */
  withBorder?: boolean;
  /** Drop shadow depth. @default "none" */
  shadow?: "none" | "sm" | "md" | "lg";
  children?: ReactNode;
}

/**
 * A surface container that groups related content.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    padding = "md",
    withBorder,
    shadow = "none",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Card-root", className)}
      data-padding={padding}
      data-shadow={shadow}
      data-border={withBorder || undefined}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});
