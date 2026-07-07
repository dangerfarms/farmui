import type { HTMLAttributes, ReactNode } from "react";
import { Avatar, Container, SimpleGrid } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface Testimonial {
  /** The quote body. */
  quote: ReactNode;
  /** Who said it. */
  author: ReactNode;
  /** Their role/company (optional). */
  role?: ReactNode;
  /** Optional avatar image URL. */
  avatar?: string;
}

export interface TestimonialsProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** The testimonials to display. */
  items: Testimonial[];
  /** Minimum card width; the grid wraps responsively. @default "20rem" */
  minChildWidth?: string;
}

/** Testimonials — a responsive grid of customer quote cards. */
export function Testimonials({
  eyebrow,
  title,
  description,
  items,
  minChildWidth = "20rem",
  className,
  ...rest
}: TestimonialsProps) {
  return (
    <section className={cx("fui-Testimonials-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <SimpleGrid minChildWidth={minChildWidth} gap="lg">
          {items.map((item, i) => (
            <figure key={i} className="fui-Testimonials-card">
              <blockquote className="fui-Testimonials-quote">
                {item.quote}
              </blockquote>
              <figcaption className="fui-Testimonials-person">
                <Avatar
                  className="fui-Testimonials-avatar"
                  name={
                    typeof item.author === "string" ? item.author : undefined
                  }
                  src={item.avatar}
                />
                <span className="fui-Testimonials-meta">
                  <span className="fui-Testimonials-author">{item.author}</span>
                  {item.role != null && (
                    <span className="fui-Testimonials-role">{item.role}</span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}
