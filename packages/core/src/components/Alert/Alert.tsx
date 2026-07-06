import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "title"
> {
  /** Bold heading rendered above the body. */
  title?: ReactNode;
  /** Semantic color. @default "info" */
  color?: "info" | "success" | "warning" | "danger";
  /** Visual style. @default "light" */
  variant?: "light" | "filled" | "outline";
  /** Icon rendered to the inline-start of the content. */
  icon?: ReactNode;
  /** Alert body. */
  children?: ReactNode;
}

/**
 * Alert — a prominent, colored message box for conveying status or feedback.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    title,
    color = "info",
    variant = "light",
    icon,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cx("fui-Alert-root", className)}
      data-color={color}
      data-variant={variant}
      {...rest}
    >
      {icon && (
        <span className={"fui-Alert-icon"} aria-hidden>
          {icon}
        </span>
      )}
      <div className={"fui-Alert-body"}>
        {title && <div className={"fui-Alert-title"}>{title}</div>}
        {children && <div className={"fui-Alert-message"}>{children}</div>}
      </div>
    </div>
  );
});
