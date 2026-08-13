import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface LoaderProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Overall size — a token or an explicit pixel number. @default "md" */
  size?: FarmUISize | number;
  /** Accessible label announced to assistive tech. @default "Loading" */
  label?: string;
}

const sizeVar: Record<FarmUISize, string> = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2.25rem",
};

/**
 * An animated indicator for pending, indeterminate work.
 *
 * Coloured by the brand token, so a `--fui-context` region recolours it
 * with no prop; the parts draw with `currentColor`, so a plain `color:`
 * declaration on the loader (or an ancestor's channel) overrides.
 */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(
  { size = "md", label = "Loading", className, style, ...rest },
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
      style={vars}
      {...rest}
    >
      <span className="fui-Loader-spinner" aria-hidden />
      <span className="fui-Loader-srOnly">{label}</span>
    </span>
  );
});
