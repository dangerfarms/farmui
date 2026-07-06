import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /** Field label rendered above the textarea. */
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
  /** Number of visible text rows. @default 3 */
  rows?: number;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

const radiusVar: Record<NonNullable<TextareaProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

/**
 * Textarea — a labelled multi-line text field with description and error states.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      description,
      error,
      size = "md",
      radius = "md",
      withAsterisk,
      rows = 3,
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
    const fieldId = id ?? autoId;
    const descId = description ? `${fieldId}-desc` : undefined;
    const errId = error ? `${fieldId}-err` : undefined;
    const invalid = Boolean(error);

    return (
      <div className={cx("fui-Textarea-wrapper", wrapperClassName)}>
        {label && (
          <label className={"fui-Textarea-label"} htmlFor={fieldId}>
            {label}
            {(withAsterisk || required) && (
              <span className={"fui-Textarea-required"} aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        {description && (
          <span className={"fui-Textarea-description"} id={descId}>
            {description}
          </span>
        )}
        <div
          className={"fui-Textarea-field"}
          data-size={size}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
          style={{ "--_radius": radiusVar[radius] } as React.CSSProperties}
        >
          <textarea
            ref={ref}
            id={fieldId}
            className={cx("fui-Textarea-textarea", className)}
            rows={rows}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={cx(descId, errId) || undefined}
            {...rest}
          />
        </div>
        {error && (
          <span className={"fui-Textarea-error"} id={errId} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);
