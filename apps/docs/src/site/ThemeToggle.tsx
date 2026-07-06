"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";
import classes from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("farmui-theme") as Theme | null;
    setTheme(stored ?? systemTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("farmui-theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      className={classes.btn}
      onClick={toggle}
      aria-label="Toggle color scheme"
      title="Toggle color scheme"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
