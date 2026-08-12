"use client";

import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { Field } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  /** Field label rendered above the select. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; its presence puts the field in an invalid state. */
  error?: ReactNode;
  /** Non-selectable prompt shown as the first, empty-valued option. */
  placeholder?: string;
  /** Root wrapper class (applied to the Field root in the labelled form). */
  wrapperClassName?: string;
}

/** Props for the bare select box (the part Field.Control composes). */
export type SelectControlProps = Omit<
  SelectProps,
  "label" | "description" | "error" | "wrapperClassName"
>;

/**
 * The bare, composable select: the styled box, chevron and the
 * native `<select>`. Forwards `id` / `aria-*` straight to the `<select>`.
 */
const SelectControl = forwardRef<HTMLSelectElement, SelectControlProps>(
  function SelectControl(
    {
      placeholder,
      disabled,
      className,
      style,
      children,
      defaultValue,
      value,
      "aria-invalid": ariaInvalid,
      onBlur,
      onInvalid,
      ...rest
    },
    ref,
  ) {
    const { nativeInvalid, checkOnBlur, checkOnInvalid } = useUserInvalid();
    const isControlled = value !== undefined;
    const resolvedDefault =
      !isControlled && defaultValue === undefined && placeholder
        ? ""
        : defaultValue;

    return (
      <div
        className="fui-Select-field"
        data-disabled={disabled || undefined}
        style={style}
      >
        <select
          ref={ref}
          className={cx("fui-Select-select", className)}
          disabled={disabled}
          value={value}
          defaultValue={resolvedDefault}
          {...rest}
          aria-invalid={ariaInvalid ?? (nativeInvalid || undefined)}
          onBlur={(e) => {
            onBlur?.(e);
            checkOnBlur(e);
          }}
          onInvalid={(e) => {
            onInvalid?.(e);
            checkOnInvalid(e);
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <svg
          className="fui-Select-chevron"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  },
);

/**
 * A styled wrapper around a native `<select>`; accessible and zero-JS.
 *
 * The `label`/`description`/`error` props compose {@link Field}, exactly
 * as Input does; bare, it is the styled box alone.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, description, error, wrapperClassName, id, required, ...control },
    ref,
  ) {
    if (!label && !description && !error) {
      return (
        <SelectControl ref={ref} id={id} required={required} {...control} />
      );
    }

    return (
      <Field.Root className={wrapperClassName} id={id}>
        {label && (
          <Field.Label>
            {label}
            {required && (
              <span className="fui-required" aria-hidden>
                *
              </span>
            )}
          </Field.Label>
        )}
        {description && <Field.Description>{description}</Field.Description>}
        <Field.Control
          render={<SelectControl ref={ref} required={required} {...control} />}
        />
        {error && <Field.Error>{error}</Field.Error>}
      </Field.Root>
    );
  },
);

export { SelectControl };
