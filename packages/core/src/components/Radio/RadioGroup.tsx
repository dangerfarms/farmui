"use client";

import { useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import { Fieldset } from "../Fieldset/Fieldset";
import { Radio } from "./Radio";
import { RadioGroupContext } from "./group-context";
import type { RadioGroupContextValue } from "./group-context";

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
 * Options participate via context (not element cloning), so `<Radio>`s work
 * at any nesting depth inside the group. Holds no state: use uncontrolled
 * (`defaultValue`) or drive it with `value` + `onChange`.
 */
export function RadioGroup({
  label,
  description,
  error,
  name,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
  data,
  withAsterisk,
  children,
  className,
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? autoId;
  const descId = description ? `${autoId}-desc` : undefined;
  const errId = error ? `${autoId}-err` : undefined;
  const invalid = Boolean(error);

  const ctx = useMemo<RadioGroupContextValue>(
    () => ({
      name: groupName,
      value,
      defaultValue,
      onSelect: onChange,
    }),
    [groupName, value, defaultValue, onChange],
  );

  const options =
    data?.map((item) => {
      const optValue = typeof item === "string" ? item : item.value;
      const optLabel =
        typeof item === "string" ? item : (item.label ?? item.value);
      return <Radio key={optValue} value={optValue} label={optLabel} />;
    }) ?? children;

  return (
    <RadioGroupContext.Provider value={ctx}>
      <Fieldset.Root
        className={cx("fui-Radio-group", className)}
        aria-describedby={cx(descId, errId) || undefined}
        aria-invalid={invalid || undefined}
      >
        {label && (
          <Fieldset.Legend>
            {label}
            {withAsterisk && (
              <span className={"fui-Radio-required"} aria-hidden>
                *
              </span>
            )}
          </Fieldset.Legend>
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
      </Fieldset.Root>
    </RadioGroupContext.Provider>
  );
}
