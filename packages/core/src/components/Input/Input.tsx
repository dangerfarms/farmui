"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx, resolveRadius, type FarmUIRadius } from "../../utils";
import { Field } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; its presence puts the field in an invalid state. */
  error?: ReactNode;
  /** Border radius token. @default "md" */
  radius?: FarmUIRadius;
  /** Content rendered inside the field, before the input. */
  leftSection?: ReactNode;
  /** Content rendered inside the field, after the input. */
  rightSection?: ReactNode;
  /** Mark the field as required (adds an asterisk to the label). */
  withAsterisk?: boolean;
  /** Root wrapper class (applied to the Field root in the labelled form). */
  wrapperClassName?: string;
}

/** Props for the bare field box (the part Field.Control composes). */
export type InputControlProps = Omit<
  InputProps,
  "label" | "description" | "error" | "withAsterisk" | "wrapperClassName"
>;

/**
 * The bare, composable text field: the bordered box, optional
 * sections and the `<input>`. It forwards `id` / `aria-*` straight to the
 * `<input>`, so it drops cleanly into `<Field.Control render={<InputControl />} />`.
 */
const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  function InputControl(
    {
      radius = "md",
      leftSection,
      rightSection,
      disabled,
      className,
      style,
      "aria-invalid": ariaInvalid,
      onBlur,
      onInvalid,
      ...rest
    },
    ref,
  ) {
    const { nativeInvalid, checkOnBlur, checkOnInvalid } = useUserInvalid();
    return (
      <div
        className="fui-Input-field"
        data-disabled={disabled || undefined}
        style={
          {
            "--_radius": resolveRadius(radius),
            ...style,
          } as React.CSSProperties
        }
      >
        {leftSection && (
          <span className="fui-Input-section">{leftSection}</span>
        )}
        <input
          ref={ref}
          className={cx("fui-Input-input", className)}
          disabled={disabled}
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
        />
        {rightSection && (
          <span className="fui-Input-section">{rightSection}</span>
        )}
      </div>
    );
  },
);

/**
 * A labelled text field.
 *
 * `label`, `description` and `error` compose the accessible {@link Field}
 * primitive under the hood, so that wiring lives in exactly one place;
 * omit all three and only the bordered box renders. For full control over
 * structure, use `Field.*` directly.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
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
    return <InputControl ref={ref} id={id} required={required} {...control} />;
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
        render={<InputControl ref={ref} required={required} {...control} />}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field.Root>
  );
});

export { InputControl };
