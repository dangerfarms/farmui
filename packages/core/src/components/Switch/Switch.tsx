"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered beside the toggle. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; its presence puts the field in an invalid state. */
  error?: ReactNode;
  /** Mark the field as required (adds an asterisk to the label). */
  withAsterisk?: boolean;
  /** Which side of the toggle the label sits on. @default "end" */
  labelPosition?: "start" | "end";
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/** The bare toggle (input + track), minus any label. */
export type SwitchControlProps = Omit<
  SwitchProps,
  | "label"
  | "description"
  | "error"
  | "withAsterisk"
  | "labelPosition"
  | "wrapperClassName"
>;

/**
 * The bare track + `<input role="switch">`. When rendered
 * inside a `Field` it reads its id / describedby / invalid from context
 * (`<Field.Label><SwitchControl /> …</Field.Label>`); otherwise it uses its
 * own props.
 */
const SwitchControl = forwardRef<HTMLInputElement, SwitchControlProps>(
  function SwitchControl(
    {
      id,
      className,
      disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedby,
      onBlur,
      onInvalid,
      ...rest
    },
    ref,
  ) {
    const field = useFieldControlProps();

    const { nativeInvalid, checkOnBlur, checkOnInvalid } = useUserInvalid();
    const resolvedAriaInvalid =
      ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined);

    return (
      <span
        className="fui-Switch-control"
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          id={id ?? field.id}
          type="checkbox"
          role="switch"
          className={cx("fui-Switch-input", className)}
          disabled={disabled}
          {...rest}
          aria-invalid={resolvedAriaInvalid}
          aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
          onBlur={(e) => {
            onBlur?.(e);
            checkOnBlur(e);
          }}
          onInvalid={(e) => {
            onInvalid?.(e);
            checkOnInvalid(e);
          }}
        />
        <span className="fui-Switch-track" aria-hidden>
          <span className="fui-Switch-thumb" />
        </span>
      </span>
    );
  },
);

/**
 * An on/off toggle built on a native checkbox with `role="switch"`.
 *
 * Renders an accessible inline row when given `label`/`description`/
 * `error`, or the bare track alone (self-wiring inside a `Field`).
 * Stateless and server-safe: `defaultChecked` uncontrolled, or
 * `checked` + `onChange`.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    description,
    error,
    withAsterisk,
    required,
    labelPosition = "end",
    disabled,
    id,
    wrapperClassName,
    ...control
  },
  ref,
) {
  const autoId = useId();

  if (!label && !description && !error) {
    return (
      <SwitchControl
        ref={ref}
        id={id}
        disabled={disabled}
        required={required}
        {...control}
      />
    );
  }

  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;

  const labelRow = (
    <label
      className={cx(
        "fui-Switch-wrapper",
        !description && !error ? wrapperClassName : undefined,
      )}
      htmlFor={inputId}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      <SwitchControl
        ref={ref}
        id={inputId}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cx(descId, errId) || undefined}
        {...control}
      />
      <span className="fui-Switch-label">
        {label}
        {(withAsterisk || required) && (
          <span className="fui-required" aria-hidden>
            *
          </span>
        )}
      </span>
    </label>
  );

  if (!description && !error) return labelRow;

  return (
    <div
      className={cx("fui-Switch-field", wrapperClassName)}
      data-disabled={disabled || undefined}
    >
      {labelRow}
      {description && (
        <span className="fui-Switch-description" id={descId}>
          {description}
        </span>
      )}
      {error && (
        <span className="fui-Switch-error" id={errId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

export { SwitchControl };
