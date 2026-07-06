"use client";

import { cloneElement, useEffect, useId, useRef, useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import { cx } from "../../utils";

/** Props the Popover injects onto the trigger element. */
interface TriggerProps {
  onClick?: (e: ReactMouseEvent) => void;
  "aria-haspopup"?: "dialog";
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export interface PopoverProps {
  /** Element that toggles the panel; gets aria-expanded / aria-haspopup wired on. */
  trigger: ReactElement<TriggerProps>;
  /** Which side the panel opens toward. @default "bottom" */
  position?: "bottom" | "top";
  /** Fixed panel width (any CSS length). Defaults to fit-content. */
  width?: string | number;
  /** Extra class for the dropdown panel. */
  className?: string;
  /** Panel content. */
  children: ReactNode;
}

/**
 * Popover — a click-triggered floating panel anchored to its trigger.
 *
 * Toggles on trigger click, closes on outside click and Escape, and
 * anchors the panel with absolute positioning relative to the wrapper.
 */
export function Popover({
  trigger,
  position = "bottom",
  width,
  className,
  children,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // Outside click + Escape to close.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerEl = cloneElement(trigger, {
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? panelId : undefined,
    onClick: (e: ReactMouseEvent) => {
      trigger.props.onClick?.(e);
      setOpen((v) => !v);
    },
  });

  return (
    <div ref={rootRef} className={"fui-Popover-root"}>
      {triggerEl}
      {open && (
        <div
          id={panelId}
          className={cx("fui-Popover-dropdown", className)}
          data-position={position}
          style={
            width !== undefined
              ? ({
                  "--_w": typeof width === "number" ? `${width}px` : width,
                } as React.CSSProperties)
              : undefined
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}
