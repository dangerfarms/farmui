import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. @default "md" */
  padding?: "sm" | "md" | "lg";
  /** Border radius token. @default "lg" */
  radius?: "sm" | "md" | "lg" | "xl";
  /** Draw a border around the card. */
  withBorder?: boolean;
  /** Drop shadow depth. @default "none" */
  shadow?: "none" | "sm" | "md" | "lg";
  children?: ReactNode;
}

const radiusVar: Record<NonNullable<CardProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
};

/**
 * Card — a surface container that groups related content.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    padding = "md",
    radius = "lg",
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
      style={
        { "--_radius": radiusVar[radius], ...style } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
});
