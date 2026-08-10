"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered beside the toggle. */
  label?: ReactNode;
  /** Which side of the toggle the label sits on. @default "end" */
  labelPosition?: "start" | "end";
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/** The bare toggle (input + track), minus any label. */
export type SwitchControlProps = Omit<
  SwitchProps,
  "label" | "labelPosition" | "wrapperClassName"
>;

/**
 * SwitchControl — the bare track + `<input role="switch">`. When rendered
 * inside a `Field` it reads its id / describedby / invalid from context (the
 * Base UI pattern: `<Field.Label><SwitchControl /> …</Field.Label>`);
 * otherwise it uses its own props.
 */
const SwitchControl = forwardRef<HTMLInputElement, SwitchControlProps>(
  function SwitchControl(
    {
      id,
      className,
      disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedby,
      onBlur,
      onInvalid,
      ...rest
    },
    ref,
  ) {
    const field = useFieldControlProps();

    const { nativeInvalid, checkOnBlur, checkOnInvalid } = useUserInvalid();
    const resolvedAriaInvalid =
      ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined);

    return (
      <span
        className="fui-Switch-control"
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          id={id ?? field.id}
          type="checkbox"
          role="switch"
          className={cx("fui-Switch-input", className)}
          disabled={disabled}
          aria-invalid={resolvedAriaInvalid}
          aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
          onBlur={(e) => {
            onBlur?.(e);
            checkOnBlur(e);
          }}
          onInvalid={(e) => {
            onInvalid?.(e);
            checkOnInvalid(e);
          }}
          {...rest}
        />
        <span className={"fui-Switch-track"} aria-hidden>
          <span className={"fui-Switch-thumb"} />
        </span>
      </span>
    );
  },
);

/**
 * Switch — an on/off toggle built on a native checkbox with `role="switch"`.
 *
 * With no `label` it renders just the bare control (which self-wires when
 * placed inside a `Field`); with one it renders its own accessible inline
 * label. Server-safe: no state is held here. Use it uncontrolled
 * (`defaultChecked`) or drive it with `checked` + `onChange`.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    labelPosition = "end",
    disabled,
    id,
    wrapperClassName,
    ...control
  },
  ref,
) {
  const autoId = useId();

  if (!label) {
    return (
      <SwitchControl ref={ref} id={id} disabled={disabled} {...control} />
    );
  }

  const inputId = id ?? autoId;
  return (
    <label
      className={cx("fui-Switch-wrapper", wrapperClassName)}
      htmlFor={inputId}
      data-label-position={labelPosition}
      data-disabled={disabled || undefined}
    >
      <SwitchControl ref={ref} id={inputId} disabled={disabled} {...control} />
      <span className={"fui-Switch-label"}>{label}</span>
    </label>
  );
});

export { SwitchControl };
