import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "@farmui/core";
import { cx } from "../../internal/cx";

export interface FooterColumn {
  /** The column heading. */
  title: ReactNode;
  /** The links listed under the heading. */
  links: { label: ReactNode; href: string }[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Brand mark or logo shown in the lead column. */
  brand?: ReactNode;
  /** Short supporting line beneath the brand. */
  tagline?: ReactNode;
  /** Grouped navigation link columns. */
  columns: FooterColumn[];
  /** The bottom bar content (e.g. a copyright line). */
  bottom?: ReactNode;
}

/** Footer — a site footer with a brand area, link columns, and a bottom bar. */
export function Footer({
  brand,
  tagline,
  columns,
  bottom,
  className,
  ...rest
}: FooterProps) {
  return (
    <footer className={cx("fui-Footer-root", className)} {...rest}>
      <Container>
        <div className="fui-Footer-inner">
          {(brand != null || tagline != null) && (
            <div className="fui-Footer-brand">
              {brand != null && <div className="fui-Footer-mark">{brand}</div>}
              {tagline != null && (
                <p className="fui-Footer-tagline">{tagline}</p>
              )}
            </div>
          )}
          {columns.length > 0 && (
            <nav className="fui-Footer-nav" aria-label="Footer">
              {columns.map((column, i) => (
                <div key={i} className="fui-Footer-column">
                  <h2 className="fui-Footer-heading">{column.title}</h2>
                  <ul className="fui-Footer-links">
                    {column.links.map((link, j) => (
                      <li key={j} className="fui-Footer-item">
                        <a className="fui-Footer-link" href={link.href}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>
        {bottom != null && <div className="fui-Footer-bottom">{bottom}</div>}
      </Container>
    </footer>
  );
}
