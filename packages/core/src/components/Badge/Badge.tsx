import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface BadgeProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Visual style. @default "filled" */
  variant?: "filled" | "light" | "outline" | "dot";
  /** Semantic color. @default "primary" */
  color?: "primary" | "gray" | "danger" | "warning" | "info";
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Border radius token. @default "full" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Content rendered before the label. */
  leftSection?: ReactNode;
  /** Content rendered after the label. */
  rightSection?: ReactNode;
  children?: ReactNode;
}

const radiusVar: Record<NonNullable<BadgeProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/**
 * Badge — a compact pill for statuses, counts, and labels.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "filled",
    color = "primary",
    size = "md",
    radius = "full",
    leftSection,
    rightSection,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx("fui-Badge-root", className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      style={
        { "--_radius": radiusVar[radius], ...style } as React.CSSProperties
      }
      {...rest}
    >
      {variant === "dot" && <span className={"fui-Badge-dot"} aria-hidden />}
      {leftSection && (
        <span className={"fui-Badge-section"}>{leftSection}</span>
      )}
      {children}
      {rightSection && (
        <span className={"fui-Badge-section"}>{rightSection}</span>
      )}
    </span>
  );
});
