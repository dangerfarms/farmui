import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface ProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Fill amount, 0–100. @default 0 */
  value?: number;
  /** Semantic color. @default "primary" */
  color?: "primary" | "info" | "success" | "warning" | "danger";
  /** Track thickness. @default "md" */
  size?: FarmUISize;
  /** Border radius token. @default "full" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Overlay diagonal stripes on the filled bar. */
  striped?: boolean;
  /** Animate the stripes (implies `striped`). */
  animated?: boolean;
  /** Render the percentage as text inside the bar. */
  label?: boolean;
}

const radiusVar: Record<NonNullable<ProgressProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Progress — a horizontal bar showing completion of a task.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      value = 0,
      color = "primary",
      size = "md",
      radius = "full",
      striped,
      animated,
      label,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const pct = clamp(value);
    const rounded = Math.round(pct);
    const showStripes = striped || animated;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cx("fui-Progress-root", className)}
        data-color={color}
        data-size={size}
        style={
          { "--_radius": radiusVar[radius], ...style } as React.CSSProperties
        }
        {...rest}
      >
        <div
          className={"fui-Progress-bar"}
          data-striped={showStripes || undefined}
          data-animated={animated || undefined}
          style={{ inlineSize: `${pct}%` }}
        >
          {label && rounded >= 8 && (
            <span className={"fui-Progress-label"}>{rounded}%</span>
          )}
        </div>
      </div>
    );
  },
);
