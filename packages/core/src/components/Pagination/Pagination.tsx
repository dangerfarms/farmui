"use client";

import type { HTMLAttributes } from "react";
import { cx } from "../../utils";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  /** Total number of pages. */
  total: number;
  /** Currently active page (1-based). */
  value: number;
  /** Called with the new page when a control is activated. */
  onChange: (page: number) => void;
  /**
   * Number of sibling pages shown on each side of the active page.
   * @default 1
   */
  siblings?: number;
  /** Show first/last page buttons at the edges. */
  withEdges?: boolean;
  /** Accessible label for the navigation region. @default "Pagination" */
  "aria-label"?: string;
}

const DOTS = "dots" as const;
type PageItem = number | typeof DOTS;

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

/** Build the list of page numbers with ellipsis gaps. */
function getPaginationItems(
  total: number,
  active: number,
  siblings: number,
): PageItem[] {
  // Pages we always show plus the sibling window; if that's most of them,
  // just render every page.
  const totalToShow = siblings * 2 + 5; // first, last, active, 2 dots
  if (totalToShow >= total) return range(1, total);

  const leftSibling = Math.max(active - siblings, 1);
  const rightSibling = Math.min(active + siblings, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = siblings * 2 + 3;
    return [...range(1, leftCount), DOTS, total];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = siblings * 2 + 3;
    return [1, DOTS, ...range(total - rightCount + 1, total)];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, total];
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
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
      <polyline
        points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
      />
    </svg>
  );
}

function EdgeIcon({ dir }: { dir: "first" | "last" }) {
  return (
    <svg
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
      {dir === "first" ? (
        <>
          <polyline points="17 18 11 12 17 6" />
          <line x1="7" y1="6" x2="7" y2="18" />
        </>
      ) : (
        <>
          <polyline points="7 18 13 12 7 6" />
          <line x1="17" y1="6" x2="17" y2="18" />
        </>
      )}
    </svg>
  );
}

/**
 * Pagination — controlled page navigator.
 *
 * Renders previous/next controls (plus optional first/last edges) and numbered
 * page buttons with ellipsis gaps. The active page carries `aria-current="page"`.
 */
export function Pagination({
  total,
  value,
  onChange,
  siblings = 1,
  withEdges = false,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...rest
}: PaginationProps) {
  const active = Math.min(Math.max(value, 1), Math.max(total, 1));
  const items = getPaginationItems(total, active, siblings);
  const atStart = active <= 1;
  const atEnd = active >= total;

  const go = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), total);
    if (clamped !== active) onChange(clamped);
  };

  return (
    <nav
      aria-label={ariaLabel}
      className={cx("fui-Pagination-root", className)}
      {...rest}
    >
      <ul className={"fui-Pagination-list"}>
        {withEdges && (
          <li>
            <button
              type="button"
              className={"fui-Pagination-control"}
              onClick={() => go(1)}
              disabled={atStart}
              aria-label="First page"
            >
              <EdgeIcon dir="first" />
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            className={"fui-Pagination-control"}
            onClick={() => go(active - 1)}
            disabled={atStart}
            aria-label="Previous page"
          >
            <ChevronIcon dir="left" />
          </button>
        </li>

        {items.map((item, index) => {
          if (item === DOTS) {
            return (
              <li key={`dots-${index}`} aria-hidden="true">
                <span className={"fui-Pagination-dots"}>…</span>
              </li>
            );
          }
          const isActive = item === active;
          return (
            <li key={item}>
              <button
                type="button"
                className={"fui-Pagination-page"}
                data-active={isActive || undefined}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${item}`}
                onClick={() => go(item)}
              >
                {item}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className={"fui-Pagination-control"}
            onClick={() => go(active + 1)}
            disabled={atEnd}
            aria-label="Next page"
          >
            <ChevronIcon dir="right" />
          </button>
        </li>
        {withEdges && (
          <li>
            <button
              type="button"
              className={"fui-Pagination-control"}
              onClick={() => go(total)}
              disabled={atEnd}
              aria-label="Last page"
            >
              <EdgeIcon dir="last" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
