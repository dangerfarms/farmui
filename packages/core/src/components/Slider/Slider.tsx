"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Field label rendered above the track. */
  label?: ReactNode;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/** The bare range input, minus any label. */
export type SliderControlProps = Omit<
  SliderProps,
  "label" | "wrapperClassName"
>;

/**
 * The bare `<input type="range">`. When rendered inside a
 * `Field` it reads its id / describedby / invalid from context; otherwise it
 * uses its own props.
 */
const SliderControl = forwardRef<HTMLInputElement, SliderControlProps>(
  function SliderControl(
    {
      min = 0,
      max = 100,
      step = 1,
      id,
      className,
      disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedby,
      ...rest
    },
    ref,
  ) {
    const field = useFieldControlProps();

    return (
      <input
        ref={ref}
        id={id ?? field.id}
        type="range"
        className={cx("fui-Slider-input", className)}
        data-disabled={disabled || undefined}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        // No useUserInvalid here: a range input can never be :user-invalid —
        // every thumb position is a valid value — so only a Field error can
        // mark it invalid.
        aria-invalid={ariaInvalid ?? field["aria-invalid"]}
        aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
        {...rest}
      />
    );
  },
);

/**
 * A styled `<input type="range">` for choosing a value from a range.
 *
 * A `label` adds the labelled wrapper; alone it is just the range input,
 * self-wiring inside a `Field`. No state is held here — uncontrolled via
 * `defaultValue`, or controlled with `value` + `onChange`.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, disabled, id, wrapperClassName, ...control },
  ref,
) {
  const autoId = useId();

  if (!label) {
    return <SliderControl ref={ref} id={id} disabled={disabled} {...control} />;
  }

  const inputId = id ?? autoId;
  return (
    <div
      className={cx("fui-Slider-wrapper", wrapperClassName)}
      data-disabled={disabled || undefined}
    >
      <label className="fui-Slider-label" htmlFor={inputId}>
        {label}
      </label>
      <SliderControl ref={ref} id={inputId} disabled={disabled} {...control} />
    </div>
  );
});

export { SliderControl };
