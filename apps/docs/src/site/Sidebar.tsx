"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GETTING_STARTED, componentsByCategory } from "./nav";
import classes from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const groups = componentsByCategory();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={classes.sidebar} aria-label="Documentation">
      <div className={classes.group}>
        <p className={classes.groupTitle}>Getting started</p>
        <ul>
          {GETTING_STARTED.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className={classes.link}
                data-active={isActive(g.href) || undefined}
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
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
