"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";
import { COMPONENTS, GETTING_STARTED } from "./nav";
import classes from "./CommandMenu.module.css";

interface Result {
  label: string;
  hint: string;
  href: string;
}

const ALL: Result[] = [
  ...GETTING_STARTED.map((g) => ({
    label: g.name,
    hint: "Guide",
    href: g.href,
  })),
  ...COMPONENTS.map((c) => ({
    label: c.name,
    hint: c.category,
    href: `/docs/components/${c.slug}`,
  })),
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ALL;
    return ALL.filter((r) => r.label.toLowerCase().includes(term));
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <>
      <button
        type="button"
        className={classes.trigger}
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
      >
        <SearchIcon width={16} height={16} />
        <span className={classes.triggerLabel}>Search…</span>
        <kbd className={classes.kbd}>⌘K</kbd>
      </button>

      {open && (
        <div
          className={classes.overlay}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className={classes.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={classes.searchRow}>
              <SearchIcon width={18} height={18} />
              <input
                ref={inputRef}
                className={classes.input}
                placeholder="Search components and guides…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <ul className={classes.results}>
              {results.length === 0 && (
                <li className={classes.empty}>No results for “{q}”.</li>
              )}
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    type="button"
                    className={classes.result}
                    data-active={i === active || undefined}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                  >
                    <span>{r.label}</span>
                    <span className={classes.hint}>{r.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
