"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GETTING_STARTED, componentsByCategory } from "./nav";
import classes from "./Sidebar.module.css";

/**
 * The documentation navigation groups (Getting started + components by
 * category). Shared by the desktop Sidebar and the mobile Drawer so the two
 * never drift. `onNavigate` fires when a link is chosen — the Drawer uses it
 * to close on selection.
 */
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = componentsByCategory();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div className={classes.group}>
        <p className={classes.groupTitle}>Getting started</p>
        <ul>
          {GETTING_STARTED.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className={classes.link}
                data-active={isActive(g.href) || undefined}
                onClick={onNavigate}
              >
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {groups.map((group) => (
        <div key={group.category} className={classes.group}>
          <p className={classes.groupTitle}>{group.category}</p>
          <ul>
            {group.items.map((item) => {
              const href = `/docs/components/${item.slug}`;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={classes.link}
                    data-active={isActive(href) || undefined}
                    onClick={onNavigate}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
