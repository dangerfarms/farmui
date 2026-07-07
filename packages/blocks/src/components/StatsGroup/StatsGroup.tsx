import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface Stat {
  value: ReactNode;
  label: ReactNode;
}

export interface StatsGroupProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  stats: Stat[];
}

/** StatsGroup — a responsive row of big-number stats with muted labels. */
export function StatsGroup({
  eyebrow,
  title,
  description,
  stats,
  className,
  ...rest
}: StatsGroupProps) {
  return (
    <section className={cx("fui-StatsGroup-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <dl className="fui-StatsGroup-grid">
          {stats.map((stat, i) => (
            <div key={i} className="fui-StatsGroup-item">
              <dt className="fui-StatsGroup-value">{stat.value}</dt>
              <dd className="fui-StatsGroup-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
