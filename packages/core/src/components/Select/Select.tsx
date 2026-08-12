"use client";

import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { cx, resolveRadius, type FarmUIRadius } from "../../utils";
import { Field } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

/** An option in a Select — either a bare string or a value/label pair. */
export type SelectItem = string | { value: string; label: string };

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
  /** Border radius token. @default "md" */
  radius?: FarmUIRadius;
  /** Mark the field as required (adds an asterisk to the label). */
  withAsterisk?: boolean;
  /** Non-selectable prompt shown as the first, empty-valued option. */
  placeholder?: string;
  /** The options to render. */
  data?: SelectItem[];
  /** Root wrapper class (applied to the Field root in the labelled form). */
  wrapperClassName?: string;
}

/** Props for the bare select box (the part Field.Control composes). */
export type SelectControlProps = Omit<
  SelectProps,
  "label" | "description" | "error" | "withAsterisk" | "wrapperClassName"
>;

/**
 * The bare, composable select: the styled box, chevron and the
 * native `<select>`. Forwards `id` / `aria-*` straight to the `<select>`.
 */
const SelectControl = forwardRef<HTMLSelectElement, SelectControlProps>(
  function SelectControl(
    {
      radius = "md",
      placeholder,
      data = [],
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
        style={
          {
            "--_radius": resolveRadius(radius),
            ...style,
          } as React.CSSProperties
        }
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
          {children ??
            data.map((item) => {
              const opt =
                typeof item === "string" ? { value: item, label: item } : item;
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
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
    {
      label,
      description,
      error,
      withAsterisk,
      wrapperClassName,
      id,
      required,
      ...control
    },
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
            {(withAsterisk || required) && (
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
