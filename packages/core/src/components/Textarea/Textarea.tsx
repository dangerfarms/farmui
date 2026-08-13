"use client";

import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { useUserInvalid } from "../../use-user-invalid";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Number of visible text rows. @default 3 */
  rows?: number;
}

/**
 * The bordered multi-line field: a native `<textarea>` in the shared
 * control box. Label it by composing {@link Field}; the control reads its
 * wiring from the surrounding `Field.Root`.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    rows = 3,
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
    <div className="fui-Textarea-field" data-disabled={disabled || undefined} style={style}>
      <textarea
        ref={ref}
        className={cx("fui-Textarea-textarea", className)}
        rows={rows}
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
    </div>
  );
});
