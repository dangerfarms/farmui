import {
  Children,
  cloneElement,
  forwardRef,
  Fragment,
  isValidElement,
} from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cx } from "../../utils";

export interface BreadcrumbsProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /**
   * Node inserted between each item.
   * @default "/"
   */
  separator?: ReactNode;
  /** The breadcrumb items — links or plain text nodes. */
  children?: ReactNode;
}

/**
 * Breadcrumbs — shows the path to the current page.
 *
 * Renders a `<nav>` labelled "Breadcrumbs" wrapping an ordered list. The last
 * item is marked `aria-current="page"` and styled as the current location.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  function Breadcrumbs({ separator = "/", className, children, ...rest }, ref) {
    const items = Children.toArray(children);
    const lastIndex = items.length - 1;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumbs"
        className={cx("fui-Breadcrumbs-root", className)}
        {...rest}
      >
        <ol className={"fui-Breadcrumbs-list"}>
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            const itemNode =
              isLast && isValidElement(item)
                ? cloneElement(
                    item as ReactElement<{ "aria-current"?: string }>,
                    { "aria-current": "page" },
                  )
                : item;

            return (
              <Fragment key={index}>
                <li
                  className={"fui-Breadcrumbs-item"}
                  data-current={isLast || undefined}
                >
                  {itemNode}
                </li>
                {!isLast && (
                  <li
                    className={"fui-Breadcrumbs-separator"}
                    aria-hidden="true"
                  >
                    {separator}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);
