import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";

export interface Logo {
  /** Image source (used when `node` is not provided). */
  src?: string;
  /** Accessible label for the logo. */
  alt: string;
  /** Custom node (e.g. inline SVG) rendered instead of an `<img>`. */
  node?: ReactNode;
}

export interface LogoWallProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /** Small centered caption above the logos. @example "Trusted by leading teams" */
  title?: ReactNode;
  logos: Logo[];
}

/** LogoWall — a muted, wrapping row of logos that lift out of grayscale on hover. */
export function LogoWall({ title, logos, className, ...rest }: LogoWallProps) {
  return (
    <section className={cx("fui-LogoWall-root", className)} {...rest}>
      <Container>
        {title != null && <p className="fui-LogoWall-title">{title}</p>}
        <ul className="fui-LogoWall-list">
          {logos.map((logo, i) => (
            <li key={i} className="fui-LogoWall-item">
              {logo.node != null ? (
                <span
                  className="fui-LogoWall-logo"
                  role="img"
                  aria-label={logo.alt}
                >
                  {logo.node}
                </span>
              ) : (
                <img
                  className="fui-LogoWall-logo"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                />
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
