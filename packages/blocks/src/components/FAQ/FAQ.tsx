import type { HTMLAttributes, ReactNode } from "react";
import { Accordion, AccordionItem, Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface FaqItem {
  /** The question shown in the always-visible summary. */
  question: ReactNode;
  /** The answer revealed when the item is expanded. */
  answer: ReactNode;
}

export interface FaqProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** The list of question/answer pairs. */
  items: FaqItem[];
}

/** FAQ — a centered, accordion-driven list of frequently asked questions. */
export function FAQ({
  eyebrow,
  title,
  description,
  items,
  className,
  ...rest
}: FaqProps) {
  return (
    <section className={cx("fui-FAQ-root", className)} {...rest}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="fui-FAQ-inner">
          <Accordion className="fui-FAQ-accordion">
            {items.map((item, i) => (
              <AccordionItem key={i} label={item.question}>
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
