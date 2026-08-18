import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. @default "md" */
  padding?: "sm" | "md" | "lg";
  /** Draw a border around the card. */
  withBorder?: boolean;
  /** Drop shadow depth. @default "none" */
  shadow?: "none" | "sm" | "md" | "lg";
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * A surface container that groups related content.
 */
export function Card({
  padding = "md",
  withBorder,
  shadow = "none",
  className,
  style,
  children,
  ref,
  ...rest
}: CardProps) {
  return (
    <div
      ref={ref}
      className={cx("fui-Card", className)}
      data-padding={padding}
      data-shadow={shadow}
      data-border={withBorder || undefined}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
