"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered next to the checkbox. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; its presence puts the field in an invalid state. */
  error?: ReactNode;
  /** Render the "partially checked" (dash) visual state. */
  indeterminate?: boolean;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/** The bare checkbox box + input, minus any label. */
type CheckboxControlProps = Omit<
  CheckboxProps,
  "label" | "description" | "error" | "wrapperClassName"
>;

/**
 * CheckboxControl — the bare box + `<input type="checkbox">`. When rendered
 * inside a `Field` it reads its id / describedby / aria-invalid from context (the
 * Base UI pattern: `<Field.Label><Checkbox /> …</Field.Label>`); otherwise it
 * uses its own props.
 */
const CheckboxControl = forwardRef<HTMLInputElement, CheckboxControlProps>(
  function CheckboxControl(
    {
      indeterminate = false,
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
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const resolvedAriaInvalid = ariaInvalid ?? field["aria-invalid"];
    const resolvedId = id ?? field.id;
    const describedBy = ariaDescribedby ?? field["aria-describedby"];

    return (
      <span className="fui-Checkbox-box">
        <input
          ref={innerRef}
          id={resolvedId}
          type="checkbox"
          className={cx("fui-Checkbox-input", className)}
          disabled={disabled}
          aria-invalid={resolvedAriaInvalid}
          aria-describedby={describedBy}
          {...rest}
        />
        <svg
          className="fui-Checkbox-check"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            className="fui-Checkbox-tick"
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="fui-Checkbox-dash"
            d="M4 8h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  },
);

/**
 * Checkbox — a styled `<input type="checkbox">`.
 *
 * With no `label`/`description`/`error` it renders just the bare control (which
 * self-wires when placed inside a `Field`). With any of them it renders its own
 * accessible inline label, description and error.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      error,
      disabled,
      required,
      id,
      wrapperClassName,
      ...control
    },
    ref,
  ) {
    const autoId = useId();

    if (!label && !description && !error) {
      return (
        <CheckboxControl
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          {...control}
        />
      );
    }

    const fieldId = id ?? autoId;
    const descId = description ? `${fieldId}-desc` : undefined;
    const errId = error ? `${fieldId}-err` : undefined;

    return (
      <div
        className={cx("fui-Checkbox-wrapper", wrapperClassName)}
        data-disabled={disabled || undefined}
      >
        <label className="fui-Checkbox-control" htmlFor={fieldId}>
          <CheckboxControl
            ref={ref}
            id={fieldId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={cx(descId, errId) || undefined}
            {...control}
          />
          <span className="fui-Checkbox-body">
            {label && (
              <span className="fui-Checkbox-label">
                {label}
                {required && (
                  <span className="fui-Checkbox-required" aria-hidden>
                    *
                  </span>
                )}
              </span>
            )}
            {description && (
              <span className="fui-Checkbox-description" id={descId}>
                {description}
              </span>
            )}
          </span>
        </label>
        {error && (
          <span className="fui-Checkbox-error" id={errId} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

export { CheckboxControl };
