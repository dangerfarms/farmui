"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { cx } from "../../utils";

export interface ModalProps {
  /** Whether the modal is visible. */
  opened: boolean;
  /** Called when the user requests to close (overlay click, Escape, close button). */
  onClose: () => void;
  /** Heading rendered in the modal header. */
  title?: ReactNode;
  /** Panel width. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render the header close (×) button. @default true */
  withCloseButton?: boolean;
  /** Extra class for the panel. */
  className?: string;
  /** Body content. */
  children?: ReactNode;
}

/**
 * Modal — a controlled, focus-trapping dialog rendered in a portal.
 *
 * Closes on overlay click and Escape, locks body scroll while open, and
 * moves focus into the panel so keyboard users land inside the dialog.
 */
export function Modal({
  opened,
  onClose,
  title,
  size = "md",
  withCloseButton = true,
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Escape to close.
  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [opened, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!opened) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [opened]);

  // Move focus into the panel on open.
  useEffect(() => {
    if (opened) panelRef.current?.focus();
  }, [opened]);

  if (!opened || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={"fui-Modal-overlay"}
      data-open
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={cx("fui-Modal-panel", className)}
        data-size={size}
        data-open
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        {(title || withCloseButton) && (
          <header className={"fui-Modal-header"}>
            {title ? (
              <h2 id={titleId} className={"fui-Modal-title"}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {withCloseButton && (
              <button
                type="button"
                className={"fui-Modal-close"}
                onClick={onClose}
                aria-label="Close"
              >
                <span aria-hidden>×</span>
              </button>
            )}
          </header>
        )}
        <div className={"fui-Modal-body"}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
