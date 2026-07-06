import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; also puts the field in an invalid state. */
  error?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Border radius token. @default "md" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Content rendered inside the field, before the input. */
  leftSection?: ReactNode;
  /** Content rendered inside the field, after the input. */
  rightSection?: ReactNode;
  /** Mark the field as required (adds a red asterisk). */
  withAsterisk?: boolean;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

const radiusVar: Record<NonNullable<InputProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/**
 * Input — a labelled text field with description and error states.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    description,
    error,
    size = "md",
    radius = "md",
    leftSection,
    rightSection,
    withAsterisk,
    disabled,
    required,
    id,
    className,
    wrapperClassName,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errId = error ? `${inputId}-err` : undefined;
  const invalid = Boolean(error);

  return (
    <div className={cx("fui-Input-wrapper", wrapperClassName)}>
      {label && (
        <label className={"fui-Input-label"} htmlFor={inputId}>
          {label}
          {(withAsterisk || required) && (
            <span className={"fui-Input-required"} aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      {description && (
        <span className={"fui-Input-description"} id={descId}>
          {description}
        </span>
      )}
      <div
        className={"fui-Input-field"}
        data-size={size}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        style={{ "--_radius": radiusVar[radius] } as React.CSSProperties}
      >
        {leftSection && (
          <span className={"fui-Input-section"}>{leftSection}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cx("fui-Input-input", className)}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={cx(descId, errId) || undefined}
          {...rest}
        />
        {rightSection && (
          <span className={"fui-Input-section"}>{rightSection}</span>
        )}
      </div>
      {error && (
        <span className={"fui-Input-error"} id={errId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
