"use client";

import { cloneElement, useId, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { cx } from "../../utils";

export interface TooltipProps {
  /** The floating label shown on hover/focus. */
  label: ReactNode;
  /** Which side of the target the tooltip appears on. @default "top" */
  position?: "top" | "bottom" | "left" | "right";
  /** Render a small pointer arrow toward the target. */
  withArrow?: boolean;
  /** Extra class for the wrapper span. */
  className?: string;
  /** The single element the tooltip describes. */
  children: ReactElement<{ "aria-describedby"?: string }>;
}

/**
 * Tooltip — a small floating label revealed on hover and keyboard focus.
 *
 * Wraps a single interactive child and links to it via `aria-describedby`
 * so screen readers announce the label.
 */
export function Tooltip({
  label,
  position = "top",
  withArrow,
  className,
  children,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const child = cloneElement(children, {
    "aria-describedby": open
      ? cx(children.props["aria-describedby"], id) || id
      : children.props["aria-describedby"],
  });

  return (
    <span
      className={cx("fui-Tooltip-root", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      {child}
      <span
        id={id}
        role="tooltip"
        className={"fui-Tooltip-bubble"}
        data-position={position}
        data-open={open || undefined}
        data-arrow={withArrow || undefined}
      >
        {label}
      </span>
    </span>
  );
}
