"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered next to the checkbox. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; also puts the field in an invalid state. */
  error?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Render the "partially checked" (dash) visual state. */
  indeterminate?: boolean;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/**
 * Checkbox — a styled `<input type="checkbox">` with an adjacent label.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      error,
      size = "md",
      indeterminate = false,
      disabled,
      required,
      id,
      className,
      wrapperClassName,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const autoId = useId();
    const fieldId = id ?? autoId;
    const descId = description ? `${fieldId}-desc` : undefined;
    const errId = error ? `${fieldId}-err` : undefined;
    const invalid = Boolean(error);

    return (
      <div
        className={cx("fui-Checkbox-wrapper", wrapperClassName)}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        <label className={"fui-Checkbox-control"} htmlFor={fieldId}>
          <span
            className={"fui-Checkbox-box"}
            data-invalid={invalid || undefined}
          >
            <input
              ref={innerRef}
              id={fieldId}
              type="checkbox"
              className={cx("fui-Checkbox-input", className)}
              disabled={disabled}
              required={required}
              aria-invalid={invalid || undefined}
              aria-describedby={cx(descId, errId) || undefined}
              {...rest}
            />
            <svg
              className={"fui-Checkbox-check"}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                className={"fui-Checkbox-tick"}
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={"fui-Checkbox-dash"}
                d="M4 8h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {(label || description) && (
            <span className={"fui-Checkbox-body"}>
              {label && (
                <span className={"fui-Checkbox-label"}>
                  {label}
                  {required && (
                    <span className={"fui-Checkbox-required"} aria-hidden>
                      *
                    </span>
                  )}
                </span>
              )}
              {description && (
                <span className={"fui-Checkbox-description"} id={descId}>
                  {description}
                </span>
              )}
            </span>
          )}
        </label>
        {error && (
          <span className={"fui-Checkbox-error"} id={errId} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
