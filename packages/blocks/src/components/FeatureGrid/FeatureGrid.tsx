import type { HTMLAttributes, ReactNode } from "react";
import { Container, SimpleGrid } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface Feature {
  /** Optional icon/emoji (decorative). */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export interface FeatureGridProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  features: Feature[];
  /** Minimum card width; the grid wraps responsively. @default "16rem" */
  minChildWidth?: string;
}

/** FeatureGrid — a responsive grid of icon/title/description features. */
export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  minChildWidth = "16rem",
  className,
  ...rest
}: FeatureGridProps) {
  return (
    <section className={cx("fui-FeatureGrid-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <SimpleGrid minChildWidth={minChildWidth} gap="lg">
          {features.map((feature, i) => (
            <div key={i} className="fui-FeatureGrid-item">
              {feature.icon != null && (
                <div className="fui-FeatureGrid-icon" aria-hidden>
                  {feature.icon}
                </div>
              )}
              <h3 className="fui-FeatureGrid-title">{feature.title}</h3>
              {feature.description != null && (
                <p className="fui-FeatureGrid-desc">{feature.description}</p>
              )}
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}
