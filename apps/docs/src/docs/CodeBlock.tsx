"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";
import classes from "./CodeBlock.module.css";

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const read = () => {
      const scheme = getComputedStyle(document.documentElement).colorScheme;
      setDark(scheme.includes("dark") && !scheme.includes("light dark"));
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", read);
    return () => {
      obs.disconnect();
      mq.removeEventListener("change", read);
    };
  }, []);
  return dark;
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const dark = useIsDark();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`${classes.wrap} ${className ?? ""}`}>
      <button className={classes.copy} onClick={copy} type="button">
        {copied ? "Copied" : "Copy"}
      </button>
      <Highlight
        code={code.trim()}
        language={language}
        theme={dark ? themes.vsDark : themes.github}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={classes.pre}>
            {tokens.map((line, i) => (
              <span
                key={i}
                {...getLineProps({ line })}
                className={classes.line}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
