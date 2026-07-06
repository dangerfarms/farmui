import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered next to the control. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/**
 * Radio — a single choice within a set of mutually exclusive options.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    size = "md",
    disabled,
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

  return (
    <label
      className={cx("fui-Radio-wrapper", wrapperClassName)}
      htmlFor={inputId}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className={cx("fui-Radio-input", className)}
        disabled={disabled}
        aria-describedby={descId}
        {...rest}
      />
      <span className={"fui-Radio-control"} aria-hidden />
      {(label || description) && (
        <span className={"fui-Radio-body"}>
          {label && <span className={"fui-Radio-label"}>{label}</span>}
          {description && (
            <span className={"fui-Radio-description"} id={descId}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
