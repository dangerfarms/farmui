import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";
import { SectionHeader } from "../../internal/SectionHeader";

export interface NewsletterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Placeholder for the email field. @default "you@example.com" */
  placeholder?: string;
  /** Submit button text. @default "Subscribe" */
  buttonLabel?: string;
  /** The form's action URL (where the POST is sent). */
  action?: string;
}

/**
 * Newsletter — a centered email sign-up section.
 *
 * Server-safe: a native `<form action method="post">` with a native email
 * `<input>` and a submit `<button>`. No JS — submission is handled by the
 * `action` endpoint.
 */
export function Newsletter({
  eyebrow,
  title,
  description,
  placeholder = "you@example.com",
  buttonLabel = "Subscribe",
  action,
  className,
  ...rest
}: NewsletterProps) {
  return (
    <section className={cx("fui-Newsletter-root", className)} {...rest}>
      <Container>
        <div className="fui-Newsletter-inner">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <form className="fui-Newsletter-form" action={action} method="post">
            <input
              className="fui-Newsletter-input"
              type="email"
              name="email"
              aria-label="Email address"
              placeholder={placeholder}
              autoComplete="email"
              required
            />
            <button
              type="submit"
              className="fui-Button-root"
              data-variant="filled"
              data-size="md"
            >
              {buttonLabel}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
