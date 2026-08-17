import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "../../utils";
import { renderWithProps } from "../../render";
import type { RenderProp } from "../../render";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /**
   * Render as a different element — e.g. a link that looks like a button:
   * `<Button render={<a href="/signup">Get started</a>} />`. The
   * Button's classes and attributes merge onto the element it renders.
   */
  render?: RenderProp<Record<string, unknown>>;
  ref?: Ref<HTMLButtonElement>;
}

/**
 * The primary way to trigger an action.
 *
 * Intentionally minimal: it renders a native `<button>` and takes children.
 * Appearance is decided by CONTEXT, not props (see the Contextualism guide):
 *
 * ```tsx
 * <Button>Neutral by default</Button>
 * <p style={{ "--fui-context": "primary" }}>
 *   <Button>The main action of this region</Button>
 * </p>
 * <section style={{ "--fui-context": "danger" }}>
 *   <Button>Delete</Button>                                  // danger region
 * </section>
 * <Button render={<a href="/signup">Get started</a>} /> // as a link
 * ```
 *
 * Size is fluid (container-relative tokens) — there is no size prop, and
 * narrow containers make the button full width automatically. Width is the
 * parent's decision: a grid or stacked-flex region stretches its buttons
 * natively, a row shrink-wraps them. Icons are
 * detected (`:has(svg)`) — compose them as children, no slot props. An
 * icon-only button is detected from its accessible name: give it an
 * `aria-label` (required for accessibility anyway) and it becomes square.
 * For a one-off colour set the public `--fui-button-color` property; for a
 * house style, wrap it (the SecondaryButton pattern).
 */
export function Button({ render, className, children, ref, ...rest }: ButtonProps) {
  if (render) {
    return (
      <>
        {renderWithProps(render, {
          ref,
          className: cx("fui-Button-root", className),
          children,
          ...rest,
        })}
      </>
    );
  }
  return (
    // type="button" unless overridden: a bare <button> inside a form is a
    // native submit, so "Cancel" buttons would submit the form.
    <button ref={ref} type="button" className={cx("fui-Button-root", className)} {...rest}>
      {children}
    </button>
  );
}
