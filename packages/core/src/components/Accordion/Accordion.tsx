"use client";

import { createContext, useContext, useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

interface AccordionContextValue {
  /** Shared name for exclusive (single-open) mode; undefined when multiple. */
  name?: string;
}

const AccordionContext = createContext<AccordionContextValue>({});

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Allow more than one item open at a time.
   * @default false
   */
  multiple?: boolean;
  children?: ReactNode;
}

export interface AccordionItemProps extends Omit<
  HTMLAttributes<HTMLDetailsElement>,
  "title"
> {
  /** The summary label shown in the always-visible header. */
  label: ReactNode;
  /** Open this item by default. */
  defaultOpen?: boolean;
  children?: ReactNode;
}

/**
 * Accordion — vertically stacked, expandable sections.
 *
 * Built on native `<details>/<summary>` for zero-JS toggling. In single mode
 * (the default) items share an HTML `name`, so opening one closes the others.
 */
export function Accordion({
  multiple = false,
  className,
  children,
  ...rest
}: AccordionProps) {
  const autoName = useId();
  const name = multiple ? undefined : autoName;

  return (
    <AccordionContext.Provider value={{ name }}>
      <div className={cx("fui-Accordion-root", className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

/** A single expandable section. */
export function AccordionItem({
  label,
  defaultOpen,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const { name } = useContext(AccordionContext);

  return (
    <details
      className={cx("fui-Accordion-item", className)}
      name={name}
      open={defaultOpen}
      {...rest}
    >
      <summary className={"fui-Accordion-summary"}>
        <span className={"fui-Accordion-label"}>{label}</span>
        <svg
          className={"fui-Accordion-chevron"}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className={"fui-Accordion-content"}>{children}</div>
    </details>
  );
}

Accordion.Item = AccordionItem;
