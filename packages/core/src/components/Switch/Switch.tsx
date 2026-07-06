import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered beside the toggle. */
  label?: ReactNode;
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** Which side of the toggle the label sits on. @default "end" */
  labelPosition?: "start" | "end";
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/**
 * Switch — an on/off toggle built on a native checkbox with `role="switch"`.
 *
 * Server-safe: no state is held here. Use it uncontrolled (`defaultChecked`) or
 * drive it with `checked` + `onChange`.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    size = "md",
    labelPosition = "end",
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

  return (
    <label
      className={cx("fui-Switch-wrapper", wrapperClassName)}
      htmlFor={inputId}
      data-size={size}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        className={cx("fui-Switch-input", className)}
        disabled={disabled}
        {...rest}
      />
      <span className={"fui-Switch-track"} aria-hidden>
        <span className={"fui-Switch-thumb"} />
      </span>
      {label && <span className={"fui-Switch-label"}>{label}</span>}
    </label>
  );
});
