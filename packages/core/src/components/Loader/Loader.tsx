import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface LoaderProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Overall size — a token or an explicit pixel number. @default "md" */
  size?: FarmUISize | number;
  /** Semantic color. @default "primary" */
  color?: "primary" | "info" | "success" | "warning" | "danger";
  /** Animation style. @default "spinner" */
  variant?: "spinner" | "dots" | "bars";
  /** Accessible label announced to assistive tech. @default "Loading" */
  label?: string;
}

const sizeVar: Record<FarmUISize, string> = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2.25rem",
};

const colorVar: Record<NonNullable<LoaderProps["color"]>, string> = {
  primary: "var(--fui-primary)",
  info: "var(--fui-info)",
  success: "var(--fui-success)",
  warning: "var(--fui-warning)",
  danger: "var(--fui-danger)",
};

/**
 * Loader — an animated indicator for pending, indeterminate work.
 */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(
  {
    size = "md",
    color = "primary",
    variant = "spinner",
    label = "Loading",
    className,
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = typeof size === "number" ? `${size}px` : sizeVar[size];
  const vars = {
    "--_size": resolvedSize,
    "--_color": colorVar[color],
    ...style,
  } as CSSProperties;

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cx("fui-Loader-root", className)}
      data-variant={variant}
      style={vars}
      {...rest}
    >
      {variant === "spinner" && (
        <span className={"fui-Loader-spinner"} aria-hidden />
      )}
      {variant === "dots" && (
        <span className={"fui-Loader-dots"} aria-hidden>
          <span className={"fui-Loader-dot"} />
          <span className={"fui-Loader-dot"} />
          <span className={"fui-Loader-dot"} />
        </span>
      )}
      {variant === "bars" && (
        <span className={"fui-Loader-bars"} aria-hidden>
          <span className={"fui-Loader-bar"} />
          <span className={"fui-Loader-bar"} />
          <span className={"fui-Loader-bar"} />
        </span>
      )}
      <span className={"fui-Loader-srOnly"}>{label}</span>
    </span>
  );
});
