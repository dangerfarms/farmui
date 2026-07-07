import type { ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

/** Shared centered header (eyebrow + title + description) used across blocks. */
export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  if (eyebrow == null && title == null && description == null) return null;
  return (
    <div className="fui-SectionHeader">
      {eyebrow != null && (
        <p className="fui-SectionHeader-eyebrow">{eyebrow}</p>
      )}
      {title != null && <h2 className="fui-SectionHeader-title">{title}</h2>}
      {description != null && (
        <p className="fui-SectionHeader-description">{description}</p>
      )}
    </div>
  );
}
