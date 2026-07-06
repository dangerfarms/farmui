import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils";

type AvatarSize = "sm" | "md" | "lg" | number;

export interface AvatarProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  /** Image source. When set, renders an <img>. */
  src?: string;
  /** Alt text for the image (falls back to `name`). */
  alt?: string;
  /** Person's name; used for initials and, if no `alt`, the image alt. */
  name?: string;
  /** Size token or explicit pixel size. @default "md" */
  size?: AvatarSize;
  /** Border radius token. @default "full" */
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  /** Background color for the initials/fallback state. @default "primary" */
  color?: "primary" | "gray" | "danger" | "warning" | "info";
  children?: ReactNode;
}

const radiusVar: Record<NonNullable<AvatarProps["radius"]>, string> = {
  sm: "var(--fui-radius-sm)",
  md: "var(--fui-radius-md)",
  lg: "var(--fui-radius-lg)",
  xl: "var(--fui-radius-xl)",
  full: "var(--fui-radius-full)",
};

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
      className={"fui-Avatar-glyph"}
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
 * Avatar — an image, initials, or fallback glyph representing a user.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    src,
    alt,
    name,
    size = "md",
    radius = "full",
    color = "primary",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const numericSize = typeof size === "number";
  const initials = name ? initialsFrom(name) : "";

  let content: ReactNode;
  if (children) {
    content = children;
  } else if (src) {
    content = (
      <img className={"fui-Avatar-img"} src={src} alt={alt ?? name ?? ""} />
    );
  } else if (initials) {
    content = <span className={"fui-Avatar-initials"}>{initials}</span>;
  } else {
    content = <UserGlyph />;
  }

  return (
    <span
      ref={ref}
      className={cx("fui-Avatar-root", className)}
      data-size={numericSize ? undefined : size}
      data-color={color}
      role={src ? undefined : "img"}
      aria-label={src ? undefined : (name ?? alt)}
      style={
        {
          "--_radius": radiusVar[radius],
          ...(numericSize ? { "--_size": `${size}px` } : {}),
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {content}
    </span>
  );
});

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Overlap amount between avatars. @default "0.5rem" */
  spacing?: string;
  children?: ReactNode;
}

/**
 * AvatarGroup — overlaps a row of avatars with a surface-colored ring.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { spacing = "0.5rem", className, style, children, ...rest },
    ref,
  ) {
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
  },
);
