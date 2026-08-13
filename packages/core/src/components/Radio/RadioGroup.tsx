"use client";

import { useId, useMemo } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import { Fieldset } from "../Fieldset/Fieldset";
import { RadioGroupContext } from "./group-context";
import type { RadioGroupContextValue } from "./group-context";

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
  /** Mark the whole group optional in text rather than with an asterisk. */
  optional?: boolean;
  /** Layout direction of the options. @default "vertical" */
  orientation?: "vertical" | "horizontal";
  /** `<Radio>` elements to render as the group's options. */
  children?: ReactNode;
  /** Root wrapper class. */
  className?: string;
}

/**
 * Labels and lays out a set of mutually exclusive {@link Radio}
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
  optional,
  orientation = "vertical",
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

  return (
    <RadioGroupContext value={ctx}>
      <Fieldset.Root
        // radiogroup (not the fieldset's implicit group): the precise role,
        // and the one ARIA allows aria-invalid on.
        role="radiogroup"
        className={cx("fui-Radio-group", className)}
        aria-describedby={cx(descId, errId) || undefined}
        aria-invalid={invalid || undefined}
      >
        {label && <Fieldset.Legend optional={optional}>{label}</Fieldset.Legend>}
        {description && (
          <span className="fui-Radio-groupDescription" id={descId}>
            {description}
          </span>
        )}
        <div className="fui-Radio-options" data-orientation={orientation}>
          {children}
        </div>
        {error && (
          <span className="fui-Radio-error" id={errId} role="alert">
            <span className="fui-Error-prefix">Error: </span>
            {error}
          </span>
        )}
      </Fieldset.Root>
    </RadioGroupContext>
  );
}
