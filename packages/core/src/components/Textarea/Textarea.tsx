"use client";

import { forwardRef } from "react";
import type { TextareaHTMLAttributes, ReactNode } from "react";
import { cx, resolveRadius, type FarmUIRadius } from "../../utils";
import { Field } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /** Field label rendered above the textarea. */
  label?: ReactNode;
  /** Helper text rendered below the label. */
  description?: ReactNode;
  /** Error message; its presence puts the field in an invalid state. */
  error?: ReactNode;
  /** Border radius token. @default "md" */
  radius?: FarmUIRadius;
  /** Mark the field as required (adds an asterisk to the label). */
  withAsterisk?: boolean;
  /** Number of visible text rows. @default 3 */
  rows?: number;
  /** Root wrapper class (applied to the Field root in the labelled form). */
  wrapperClassName?: string;
}

/** Props for the bare textarea box (the part Field.Control composes). */
export type TextareaControlProps = Omit<
  TextareaProps,
  "label" | "description" | "error" | "withAsterisk" | "wrapperClassName"
>;

/**
 * The bare, composable multi-line field: the bordered box and
 * the `<textarea>`. Forwards `id` / `aria-*` straight to the `<textarea>`.
 */
const TextareaControl = forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  function TextareaControl(
    {
      radius = "md",
      rows = 3,
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
        className="fui-Textarea-field"
        data-disabled={disabled || undefined}
        style={
          {
            "--_radius": resolveRadius(radius),
            ...style,
          } as React.CSSProperties
        }
      >
        <textarea
          ref={ref}
          className={cx("fui-Textarea-textarea", className)}
          rows={rows}
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
      </div>
    );
  },
);

/**
 * A labelled multi-line text field.
 *
 * Like {@link Input}, the `label`/`description`/`error` props compose the
 * {@link Field} primitive; without them only the field box renders.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
        <TextareaControl ref={ref} id={id} required={required} {...control} />
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
          render={
            <TextareaControl ref={ref} required={required} {...control} />
          }
        />
        {error && <Field.Error>{error}</Field.Error>}
      </Field.Root>
    );
  },
);

export { TextareaControl };
