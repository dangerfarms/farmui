import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { ActionButton, type BlockAction } from "../../internal/ActionButton";

export interface CTASectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /** Headline (rendered as an `<h2>`). */
  title: ReactNode;
  /** Supporting paragraph. */
  description?: ReactNode;
  /** Call-to-action buttons. */
  actions: BlockAction[];
}

/** CTASection — a centered call-to-action band with a tinted background. */
export function CTASection({
  title,
  description,
  actions,
  className,
  ...rest
}: CTASectionProps) {
  return (
    <section className={cx("fui-CTASection-root", className)} {...rest}>
      <Container>
        <div className="fui-CTASection-band">
          <h2 className="fui-CTASection-title">{title}</h2>
          {description != null && (
            <p className="fui-CTASection-description">{description}</p>
          )}
          {actions.length > 0 && (
            <div className="fui-CTASection-actions">
              {actions.map((action, i) => (
                <ActionButton key={i} size="lg" {...action} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
