import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

export interface AlertRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  /** Semantic color. @default "info" */
  color?: "info" | "success" | "warning" | "danger";
  /** Visual style. @default "light" */
  variant?: "light" | "filled" | "outline";
}

function AlertRoot({
  color = "info",
  variant = "light",
  className,
  children,
  ...rest
}: AlertRootProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      role="alert"
      className={cx("fui-Alert-root", className)}
      data-color={color}
      data-variant={variant}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface AlertPartProps extends HTMLAttributes<HTMLElement> {}

function AlertIcon({ className, children, ...rest }: AlertPartProps) {
  return (
    <span className={cx("fui-Alert-icon", className)} aria-hidden {...rest}>
      {children}
    </span>
  );
}

function AlertBody({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("fui-Alert-body", className)} {...rest}>
      {children}
    </div>
  );
}

function AlertTitle({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("fui-Alert-title", className)} {...rest}>
      {children}
    </div>
  );
}

function AlertMessage({ className, children, ...rest }: AlertPartProps) {
  return (
    <div className={cx("fui-Alert-message", className)} {...rest}>
      {children}
    </div>
  );
}

export interface AlertProps extends Omit<AlertRootProps, "title"> {
  /** Bold heading rendered above the body. */
  title?: ReactNode;
  /** Icon rendered to the inline-start of the content. */
  icon?: ReactNode;
  /** Alert body. */
  children?: ReactNode;
}

/**
 * Alert — a prominent, colored message box for conveying status or feedback.
 *
 * Compose it from parts, or use the `title`/`icon` convenience props which
 * render the same structure:
 *
 * ```tsx
 * <Alert.Root color="warning">
 *   <Alert.Icon>…</Alert.Icon>
 *   <Alert.Body>
 *     <Alert.Title>Heads up</Alert.Title>
 *     <Alert.Message>A new version is available.</Alert.Message>
 *   </Alert.Body>
 * </Alert.Root>
 * ```
 */
const AlertBase = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { title, icon, children, ...rest },
  ref,
) {
  return (
    <AlertRoot ref={ref} {...rest}>
      {icon && <AlertIcon>{icon}</AlertIcon>}
      <AlertBody>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertMessage>{children}</AlertMessage>}
      </AlertBody>
    </AlertRoot>
  );
});

export const Alert = Object.assign(AlertBase, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Message: AlertMessage,
});
