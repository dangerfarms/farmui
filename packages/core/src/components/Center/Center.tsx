import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../utils";

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  /** Use inline-flex instead of flex (shrink to content). */
  inline?: boolean;
}

/** Center — centers its single child on both axes. */
export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  { inline, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("fui-Center-root", className)}
      data-inline={inline || undefined}
      {...rest}
    />
  );
});
