"use client";

import { useState, type ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import classes from "./Preview.module.css";

type Tab = "preview" | "code" | "css";

export function Preview({
  code,
  css,
  children,
}: {
  code: string;
  /** The component's real, complete stylesheet (plain, zero-runtime CSS). */
  css?: string;
  children: ReactNode;
}) {
  const [tab, setTab] = useState<Tab>("preview");

  return (
    <div className={classes.wrap}>
      <div className={classes.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={tab === "preview"}
          className={classes.tab}
          data-active={tab === "preview" || undefined}
          onClick={() => setTab("preview")}
          type="button"
        >
          Preview
        </button>
        <button
          role="tab"
          aria-selected={tab === "code"}
          className={classes.tab}
          data-active={tab === "code" || undefined}
          onClick={() => setTab("code")}
          type="button"
        >
          Code
        </button>
        {css && (
          <button
            role="tab"
            aria-selected={tab === "css"}
            className={classes.tab}
            data-active={tab === "css" || undefined}
            onClick={() => setTab("css")}
            type="button"
          >
            CSS
          </button>
        )}
        {css && <span className={classes.badge}>0&nbsp;kb runtime</span>}
      </div>

      {tab === "preview" && <div className={classes.stage}>{children}</div>}
      {tab === "code" && <CodeBlock code={code} className={classes.code} />}
      {tab === "css" && css && (
        <CodeBlock code={css} language="css" className={classes.code} />
      )}
    </div>
  );
}
