import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

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
  /** Error message; also puts the field in an invalid state. */
  error?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Border radius token. @default "md" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Mark the field as required (adds a red asterisk). */
  withAsterisk?: boolean;
  /** Non-selectable prompt shown as the first, empty-valued option. */
  placeholder?: string;
  /** The options to render. */
  data?: SelectItem[];
  /** Root wrapper class. */
  wrapperClassName?: string;
}

const radiusVar: Record<NonNullable<SelectProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/**
 * Select — a styled wrapper around a native `<select>`; accessible and zero-JS.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      description,
      error,
      size = "md",
      radius = "md",
      withAsterisk,
      placeholder,
      data = [],
      disabled,
      required,
      id,
      className,
      wrapperClassName,
      children,
      defaultValue,
      value,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const descId = description ? `${fieldId}-desc` : undefined;
    const errId = error ? `${fieldId}-err` : undefined;
    const invalid = Boolean(error);
    // With a placeholder and no explicit value, default to the empty option.
    const isControlled = value !== undefined;
    const resolvedDefault =
      !isControlled && defaultValue === undefined && placeholder
        ? ""
        : defaultValue;

    return (
      <div className={cx("fui-Select-wrapper", wrapperClassName)}>
        {label && (
          <label className={"fui-Select-label"} htmlFor={fieldId}>
            {label}
            {(withAsterisk || required) && (
              <span className={"fui-Select-required"} aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        {description && (
          <span className={"fui-Select-description"} id={descId}>
            {description}
          </span>
        )}
        <div
          className={"fui-Select-field"}
          data-size={size}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
          style={{ "--_radius": radiusVar[radius] } as React.CSSProperties}
        >
          <select
            ref={ref}
            id={fieldId}
            className={cx("fui-Select-select", className)}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(descId, errId) || undefined}
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
                  typeof item === "string"
                    ? { value: item, label: item }
                    : item;
                return (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
          </select>
          <svg
            className={"fui-Select-chevron"}
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
        {error && (
          <span className={"fui-Select-error"} id={errId} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
