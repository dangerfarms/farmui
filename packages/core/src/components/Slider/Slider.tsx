import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Field label rendered above the track. */
  label?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/**
 * Slider — a styled `<input type="range">` for choosing a value from a range.
 *
 * Server-safe: no state is held here. Use it uncontrolled (`defaultValue`) or
 * drive it with `value` + `onChange`.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    label,
    size = "md",
    min = 0,
    max = 100,
    step = 1,
    disabled,
    id,
    className,
    wrapperClassName,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div
      className={cx("fui-Slider-wrapper", wrapperClassName)}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      {label && (
        <label className={"fui-Slider-label"} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type="range"
        className={cx("fui-Slider-input", className)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
});
