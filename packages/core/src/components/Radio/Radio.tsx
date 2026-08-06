"use client";

import { forwardRef, useContext, useId } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { RadioGroupContext } from "./group-context";

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /** Label rendered next to the control. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
  /** Root wrapper class. */
  wrapperClassName?: string;
}

/** The bare radio input + control dot, minus any label. */
type RadioControlProps = Omit<
  RadioProps,
  "label" | "description" | "wrapperClassName"
>;

/**
 * RadioControl — the bare `<input type="radio">` + control dot. When rendered
 * inside a `Field` it reads its id / describedby / aria-invalid from context.
 */
const RadioControl = forwardRef<HTMLInputElement, RadioControlProps>(
  function RadioControl(
    {
      id,
      className,
      disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedby,
      ...rest
    },
    ref,
  ) {
    const field = useFieldControlProps();
    const group = useContext(RadioGroupContext);
    const resolvedAriaInvalid = ariaInvalid ?? field["aria-invalid"];
    const resolvedId = id ?? field.id;
    const describedBy = ariaDescribedby ?? field["aria-describedby"];

    // Group participation via context (no cloneElement): shared name and
    // selection state, unless the Radio's own props say otherwise.
    const optionValue = typeof rest.value === "string" ? rest.value : undefined;
    const name = rest.name ?? group?.name;
    const selection =
      group && optionValue !== undefined && rest.checked === undefined
        ? group.value !== undefined
          ? { checked: optionValue === group.value }
          : rest.defaultChecked === undefined &&
              group.defaultValue !== undefined
            ? { defaultChecked: optionValue === group.defaultValue }
            : {}
        : {};
    const onChange =
      group?.onSelect || rest.onChange
        ? (e: ChangeEvent<HTMLInputElement>) => {
            rest.onChange?.(e);
            group?.onSelect?.(e.currentTarget.value);
          }
        : undefined;

    return (
      <>
        <input
          ref={ref}
          id={resolvedId}
          type="radio"
          className={cx("fui-Radio-input", className)}
          disabled={disabled}
          aria-invalid={resolvedAriaInvalid}
          aria-describedby={describedBy}
          {...rest}
          name={name}
          onChange={onChange}
          {...selection}
        />
        <span className="fui-Radio-control" aria-hidden />
      </>
    );
  },
);

/**
 * Radio — a single choice within a set of mutually exclusive options.
 *
 * With no `label`/`description` it renders just the bare control (which
 * self-wires inside a `Field`). Usually rendered inside a {@link RadioGroup}.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    disabled,
    id,
    wrapperClassName,
    ...control
  },
  ref,
) {
  const autoId = useId();

  if (!label && !description) {
    return (
      <RadioControl ref={ref} id={id} disabled={disabled} {...control} />
    );
  }

  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;

  return (
    <label
      className={cx("fui-Radio-wrapper", wrapperClassName)}
      htmlFor={inputId}
      data-disabled={disabled || undefined}
    >
      <RadioControl
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-describedby={descId}
        {...control}
      />
      <span className="fui-Radio-body">
        {label && <span className="fui-Radio-label">{label}</span>}
        {description && (
          <span className="fui-Radio-description" id={descId}>
            {description}
          </span>
        )}
      </span>
    </label>
  );
});

export { RadioControl };
