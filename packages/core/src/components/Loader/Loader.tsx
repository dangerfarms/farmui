import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface LoaderProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Overall size — a token or an explicit pixel number. @default "md" */
  size?: FarmUISize | number;
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

/**
 * Loader — an animated indicator for pending, indeterminate work.
 *
 * Draws with `currentColor` — it inherits its parent's text colour, so it
 * picks up contextual colour (a button's channel, a `color:` declaration)
 * with no prop of its own.
 */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(
  {
    size = "md",
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
