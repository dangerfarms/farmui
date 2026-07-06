import { Children, cloneElement, isValidElement, useId } from "react";
import type { ChangeEventHandler, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";
import { Radio, type RadioProps } from "./Radio";

/** One option when building a group from a `data` array. */
export type RadioGroupItem = string | { value: string; label?: ReactNode };

export interface RadioGroupProps {
  /** Group label rendered above the options. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
  /** Error message; also puts the group in an invalid state. */
  error?: ReactNode;
  /**
   * Shared `name` for every radio in the group (guarantees native
   * mutual-exclusivity). Auto-generated when omitted.
   */
  name?: string;
  /** Controlled selected value. Pair with `onChange`. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Fires with the newly selected value when a radio is chosen. */
  onChange?: (value: string) => void;
  /** Size applied to every radio in the group. @default "md" */
  size?: FarmUISize;
  /** Layout direction of the options. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** Build the options from an array instead of `<Radio>` children. */
  data?: RadioGroupItem[];
  /** Mark the group as required (adds a red asterisk). */
  withAsterisk?: boolean;
  /** `<Radio>` elements to render as the group's options. */
  children?: ReactNode;
  /** Root wrapper class. */
  className?: string;
}

/**
 * RadioGroup — labels and lays out a set of mutually exclusive {@link Radio}
 * options, sharing a single `name` so native inputs enforce exclusivity.
 *
 * Server-safe: no state is held here. Use uncontrolled (`defaultValue`) for a
 * zero-JS group, or drive it with `value` + `onChange`.
 */
export function RadioGroup({
  label,
  description,
  error,
  name,
  value,
  defaultValue,
  onChange,
  size = "md",
  orientation = "vertical",
  data,
  withAsterisk,
  children,
  className,
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? autoId;
  const labelId = label ? `${autoId}-label` : undefined;
  const descId = description ? `${autoId}-desc` : undefined;
  const errId = error ? `${autoId}-err` : undefined;
  const invalid = Boolean(error);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.currentTarget.value);
  };

  const controlled = value !== undefined;

  const sharedProps = (optionValue: string | undefined) => ({
    name: groupName,
    size,
    onChange: onChange ? handleChange : undefined,
    ...(controlled
      ? { checked: optionValue !== undefined && optionValue === value }
      : optionValue !== undefined
        ? { defaultChecked: optionValue === defaultValue }
        : {}),
  });

  const options = data
    ? data.map((item) => {
        const optValue = typeof item === "string" ? item : item.value;
        const optLabel =
          typeof item === "string" ? item : (item.label ?? item.value);
        return (
          <Radio
            key={optValue}
            value={optValue}
            label={optLabel}
            {...sharedProps(optValue)}
          />
        );
      })
    : Children.map(children, (child) => {
        if (!isValidElement<RadioProps>(child)) return child;
        const optValue =
          typeof child.props.value === "string" ? child.props.value : undefined;
        return cloneElement(child, sharedProps(optValue));
      });

  return (
    <div
      className={cx("fui-Radio-group", className)}
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={cx(descId, errId) || undefined}
      aria-invalid={invalid || undefined}
    >
      {label && (
        <span className={"fui-Radio-groupLabel"} id={labelId}>
          {label}
          {withAsterisk && (
            <span className={"fui-Radio-required"} aria-hidden>
              *
            </span>
          )}
        </span>
      )}
      {description && (
        <span className={"fui-Radio-groupDescription"} id={descId}>
          {description}
        </span>
      )}
      <div className={"fui-Radio-options"} data-orientation={orientation}>
        {options}
      </div>
      {error && (
        <span className={"fui-Radio-error"} id={errId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
