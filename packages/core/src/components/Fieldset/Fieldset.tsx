import type { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

/**
 * Groups related controls under a shared, semantic label.
 *
 * Renders a native `<fieldset>` + `<legend>`, which is the accessible way to
 * label a set of checkboxes or radios (the legend names the group in the
 * accessibility tree). Prefer this over a `<div role="group">` with
 * `aria-labelledby`.
 *
 * ```tsx
 * <Fieldset.Root>
 *   <Fieldset.Legend>Notifications</Fieldset.Legend>
 *   …controls…
 * </Fieldset.Root>
 * ```
 */

export interface FieldsetRootProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {}

function FieldsetRoot({ className, children, ...rest }: FieldsetRootProps) {
  return (
    <fieldset className={cx("fui-Fieldset-root", className)} {...rest}>
      {children}
    </fieldset>
  );
}

export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  /** Mark the whole group optional in text rather than with an asterisk. */
  optional?: boolean;
  children?: ReactNode;
}

function FieldsetLegend({
  optional,
  className,
  children,
  ...rest
}: FieldsetLegendProps) {
  return (
    <legend className={cx("fui-Fieldset-legend", className)} {...rest}>
      {children}
      {optional && <span className="fui-Fieldset-optional"> (optional)</span>}
    </legend>
  );
}

export const Fieldset = {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
};
