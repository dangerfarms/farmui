"use client";

import { forwardRef } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { cx, resolveRadius, type FarmUIRadius } from "../../utils";
import { Field } from "../Field/Field";

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
type SelectControlProps = Omit<
  SelectProps,
  "label" | "description" | "error" | "withAsterisk" | "wrapperClassName"
>;

/**
 * SelectControl — the bare, composable select: the styled box, chevron and the
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
      ...rest
    },
    ref,
  ) {
    // With a placeholder and no explicit value, default to the empty option.
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
 * Select — a styled wrapper around a native `<select>`; accessible and zero-JS.
 *
 * With no `label`/`description`/`error` it renders just the bare control; with
 * any of them it composes the accessible {@link Field} primitive.
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
              <span className="fui-Select-required" aria-hidden>
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
