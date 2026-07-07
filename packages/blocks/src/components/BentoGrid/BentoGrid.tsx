import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface BentoItem {
  title: ReactNode;
  description?: ReactNode;
  /** Optional icon/emoji (decorative). */
  icon?: ReactNode;
  /** How many columns the card spans. @default 1 */
  span?: 1 | 2;
}

export interface BentoGridProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: BentoItem[];
}

/** BentoGrid — an asymmetric grid of cards; span-2 items stretch across two columns. */
export function BentoGrid({
  eyebrow,
  title,
  description,
  items,
  className,
  ...rest
}: BentoGridProps) {
  return (
    <section className={cx("fui-BentoGrid-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ul className="fui-BentoGrid-grid">
          {items.map((item, i) => (
            <li
              key={i}
              className="fui-BentoGrid-item"
              data-span={item.span === 2 ? 2 : undefined}
            >
              {item.icon != null && (
                <div className="fui-BentoGrid-icon" aria-hidden>
                  {item.icon}
                </div>
              )}
              <h3 className="fui-BentoGrid-title">{item.title}</h3>
              {item.description != null && (
                <p className="fui-BentoGrid-desc">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
