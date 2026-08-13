import type { HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";

type AvatarSize = "sm" | "md" | "lg" | number;

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Image source. When set, renders an <img>. */
  src?: string;
  /** Alt text for the image (falls back to `name`). */
  alt?: string;
  /** Person's name; used for initials and, if no `alt`, the image alt. */
  name?: string;
  /** Size token or explicit pixel size. @default "md" */
  size?: AvatarSize;
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

/** Derive up to two uppercase initials from a name. */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!first || !last) return "";
  if (parts.length === 1) return first.slice(0, 2).toUpperCase();
  return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase();
}

/** Fallback user glyph shown when there is no image or name. */
function UserGlyph() {
  return (
    <svg
      className="fui-Avatar-glyph"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.31-3.58-6-8-6Z" />
    </svg>
  );
}

/**
 * An image, initials, or fallback glyph representing a user.
 */
export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
  style,
  children,
  ref,
  ...rest
}: AvatarProps) {
  const numericSize = typeof size === "number";
  const initials = name ? initialsFrom(name) : "";
  // With no name anywhere, an avatar is decorative — hide it rather than
  // expose an unnamed role="img" to assistive technology.
  const accessibleName = name ?? alt;
  const consumerNamed = rest["aria-label"] != null || rest["aria-labelledby"] != null;

  let content: ReactNode;
  if (children) {
    content = children;
  } else if (src) {
    content = <img className="fui-Avatar-img" src={src} alt={alt ?? name ?? ""} />;
  } else if (initials) {
    content = <span className="fui-Avatar-initials">{initials}</span>;
  } else {
    content = <UserGlyph />;
  }

  return (
    <span
      ref={ref}
      className={cx("fui-Avatar-root", className)}
      data-size={numericSize ? undefined : size}
      role={src || (!accessibleName && !consumerNamed) ? undefined : "img"}
      aria-label={src ? undefined : accessibleName}
      aria-hidden={!src && !accessibleName && !consumerNamed ? true : undefined}
      style={
        {
          ...(numericSize ? { "--_size": `${size}px` } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {content}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Overlap amount between avatars. @default "0.5rem" */
  spacing?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Overlaps a row of avatars with a surface-colored ring.
 */
export function AvatarGroup({
  spacing = "0.5rem",
  className,
  style,
  children,
  ref,
  ...rest
}: AvatarGroupProps) {
  return (
    <div
      ref={ref}
      className={cx("fui-Avatar-group", className)}
      style={{ "--_overlap": spacing, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
