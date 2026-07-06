import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  /** Visual style. @default "filled" */
  variant?: "filled" | "light" | "outline" | "subtle";
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Semantic color. @default "primary" */
  color?: "primary" | "danger";
  /** Border radius token. @default "md" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  /** Content rendered before the label. */
  leftSection?: ReactNode;
  /** Content rendered after the label. */
  rightSection?: ReactNode;
  children?: ReactNode;
}

const radiusVar: Record<NonNullable<ButtonProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/**
 * Button — the primary way to trigger an action.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "filled",
      size = "md",
      color = "primary",
      radius = "md",
      fullWidth,
      loading,
      leftSection,
      rightSection,
      disabled,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cx("fui-Button-root", className)}
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-full={fullWidth || undefined}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        style={
          { "--_radius": radiusVar[radius], ...style } as React.CSSProperties
        }
        {...rest}
      >
        {loading ? (
          <span className={"fui-Button-spinner"} aria-hidden />
        ) : (
          leftSection && (
            <span className={"fui-Button-section"}>{leftSection}</span>
          )
        )}
        {children}
        {rightSection && !loading && (
          <span className={"fui-Button-section"}>{rightSection}</span>
        )}
      </button>
    );
  },
);
