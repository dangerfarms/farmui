import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx, type FarmUISize } from "../../utils";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Control size. @default "md" */
  size?: FarmUISize;
  /** The key(s) to display, e.g. "⌘" or "Enter". */
  children?: ReactNode;
}

/**
 * Kbd — a styled keyboard key for documenting shortcuts.
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { size = "md", className, children, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cx("fui-Kbd-root", className)}
      data-size={size}
      {...rest}
    >
      {children}
    </kbd>
  );
});
