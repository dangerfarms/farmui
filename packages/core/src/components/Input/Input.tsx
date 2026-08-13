"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Content rendered inside the field, before the input. */
  leftSection?: ReactNode;
  /** Content rendered inside the field, after the input. */
  rightSection?: ReactNode;
}

/**
 * The bordered text box: sections and a native `<input>`.
 *
 * Label it by composing {@link Field} — the control reads its id,
 * description and error wiring from the surrounding `Field.Root`:
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Email</Field.Label>
 *   <Input type="email" autoComplete="email" />
 *   <Field.Error>{error}</Field.Error>
 * </Field.Root>
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    leftSection,
    rightSection,
    disabled,
    className,
    style,
    id,
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
  return (
    <div className="fui-Input-field" data-disabled={disabled || undefined} style={style}>
      {leftSection && <span className="fui-Input-section">{leftSection}</span>}
      <input
        ref={ref}
        className={cx("fui-Input-input", className)}
        disabled={disabled}
        id={id ?? field.id}
        {...rest}
        aria-invalid={ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined)}
        aria-describedby={ariaDescribedby ?? field["aria-describedby"]}
        onBlur={(e) => {
          onBlur?.(e);
          checkOnBlur(e);
        }}
        onInvalid={(e) => {
          onInvalid?.(e);
          checkOnInvalid(e);
        }}
      />
      {rightSection && <span className="fui-Input-section">{rightSection}</span>}
    </div>
  );
});
