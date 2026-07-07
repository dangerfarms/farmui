import type { HTMLAttributes, ReactNode } from "react";
import { Container, SimpleGrid } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";
import { ActionButton, type BlockAction } from "../../internal/ActionButton";

export interface PricingPlan {
  name: ReactNode;
  price: ReactNode;
  /** Billing period, e.g. "/mo" (optional). */
  period?: ReactNode;
  description?: ReactNode;
  /** What's included in the plan. */
  features: ReactNode[];
  /** The plan's call-to-action. */
  action: BlockAction;
  /** Visually emphasize this plan (border + badge). */
  highlighted?: boolean;
}

export interface PricingTableProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** The plans to display. */
  plans: PricingPlan[];
  /** Minimum card width; the grid wraps responsively. @default "17rem" */
  minChildWidth?: string;
}

/** Checkmark shown beside each included feature. */
function CheckIcon() {
  return (
    <svg
      className="fui-PricingTable-check"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="m5 10.5 3.5 3.5L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** PricingTable — a responsive grid of pricing plan cards. */
export function PricingTable({
  eyebrow,
  title,
  description,
  plans,
  minChildWidth = "17rem",
  className,
  ...rest
}: PricingTableProps) {
  return (
    <section className={cx("fui-PricingTable-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <SimpleGrid minChildWidth={minChildWidth} gap="lg">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="fui-PricingTable-card"
              data-highlighted={plan.highlighted || undefined}
            >
              {plan.highlighted && (
                <span className="fui-PricingTable-badge">Popular</span>
              )}
              <h3 className="fui-PricingTable-name">{plan.name}</h3>
              <p className="fui-PricingTable-priceRow">
                <span className="fui-PricingTable-price">{plan.price}</span>
                {plan.period != null && (
                  <span className="fui-PricingTable-period">{plan.period}</span>
                )}
              </p>
              {plan.description != null && (
                <p className="fui-PricingTable-desc">{plan.description}</p>
              )}
              <ul className="fui-PricingTable-features">
                {plan.features.map((feature, j) => (
                  <li key={j} className="fui-PricingTable-feature">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="fui-PricingTable-action">
                <ActionButton
                  variant={plan.highlighted ? "filled" : "outline"}
                  {...plan.action}
                />
              </div>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}
