"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react";
import { cx } from "../../utils";

interface TabsContextValue {
  value: string | null;
  setValue: (value: string) => void;
  /** Stable id prefix so tab/panel aria wiring links up. */
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>.`);
  }
  return ctx;
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Value of the tab active by default (uncontrolled). */
  defaultValue?: string;
  /** Controlled active tab value. */
  value?: string;
  /** Called with the new value when the active tab changes. */
  onChange?: (value: string) => void;
  children?: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabsTabProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  /** Unique value linking this tab to its panel. */
  value: string;
  /** Content rendered before the label (icon/emoji). */
  leftSection?: ReactNode;
  children?: ReactNode;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Value of the tab this panel belongs to. */
  value: string;
  children?: ReactNode;
}

/**
 * Tabs — switch between related panels of content.
 *
 * Supports uncontrolled (`defaultValue`) and controlled (`value`/`onChange`)
 * usage. Compose with `Tabs.List`, `Tabs.Tab` and `Tabs.Panel`.
 */
export function Tabs({
  defaultValue,
  value: controlled,
  onChange,
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState<string | null>(
    defaultValue ?? null,
  );
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value, setValue, baseId }),
    [value, setValue, baseId],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cx("fui-Tabs-root", className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/** The row of tab controls. */
export function TabsList({ className, children, ...rest }: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ) ?? [],
    );
    if (tabs.length === 0) return;

    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex = current;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = current < 0 ? 0 : (current + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex =
          current < 0
            ? tabs.length - 1
            : (current - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
    }

    event.preventDefault();
    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cx("fui-Tabs-list", className)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}

/** A single tab control. */
export function TabsTab({
  value,
  leftSection,
  disabled,
  className,
  children,
  onClick,
  ...rest
}: TabsTabProps) {
  const { value: active, setValue, baseId } = useTabsContext("Tabs.Tab");
  const selected = active === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cx("fui-Tabs-tab", className)}
      data-active={selected || undefined}
      onClick={(event) => {
        setValue(value);
        onClick?.(event);
      }}
      {...rest}
    >
      {leftSection && <span className={"fui-Tabs-section"}>{leftSection}</span>}
      {children}
    </button>
  );
}

/** The panel shown for its matching tab. */
export function TabsPanel({
  value,
  className,
  children,
  ...rest
}: TabsPanelProps) {
  const { value: active, baseId } = useTabsContext("Tabs.Panel");
  const selected = active === value;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!selected}
      tabIndex={0}
      className={cx("fui-Tabs-panel", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
