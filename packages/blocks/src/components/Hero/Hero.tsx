import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { ActionButton, type BlockAction } from "../../internal/ActionButton";

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Small overline above the title. */
  eyebrow?: ReactNode;
  /** Main headline (rendered as an `<h1>`). */
  title: ReactNode;
  /** Supporting paragraph. */
  description?: ReactNode;
  /** Call-to-action buttons. */
  actions?: BlockAction[];
  /** Optional media beside the copy (image, illustration, a Card…). */
  media?: ReactNode;
  /** Layout alignment. Defaults to "center" when there's no media. */
  align?: "start" | "center";
}

/** Hero — a landing-page headline section with actions and optional media. */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  align,
  className,
  ...rest
}: HeroProps) {
  const centered = align === "center" || (!media && align !== "start");
  return (
    <section
      className={cx("fui-Hero-root", className)}
      data-centered={centered || undefined}
      {...rest}
    >
      <Container>
        <div className="fui-Hero-inner">
          <div className="fui-Hero-content">
            {eyebrow != null && <p className="fui-Hero-eyebrow">{eyebrow}</p>}
            <h1 className="fui-Hero-title">{title}</h1>
            {description != null && (
              <p className="fui-Hero-description">{description}</p>
            )}
            {actions && actions.length > 0 && (
              <div className="fui-Hero-actions">
                {actions.map((action, i) => (
                  <ActionButton key={i} size="lg" {...action} />
                ))}
              </div>
            )}
          </div>
          {media != null && <div className="fui-Hero-media">{media}</div>}
        </div>
      </Container>
    </section>
  );
}
