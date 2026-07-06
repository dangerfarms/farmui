"use client";

import { useState } from "react";
import { Avatar, Badge, Button, Input, Switch } from "@farmui/core";
import classes from "./home.module.css";

export function InstallSnippet() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("pnpm add @farmui/core");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className={classes.install}>
      <span className={classes.installPrompt}>$</span>
      <span>pnpm add @farmui/core</span>
      <button className={classes.installCopy} onClick={copy} type="button">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/** Interactive "settings" card that shows real FarmUI components in the hero. */
export function HeroShowcase() {
  const [notify, setNotify] = useState(true);
  const [name, setName] = useState("jamie@acme.com");

  return (
    <div className={classes.showcaseCard}>
      <div className={classes.showcaseHead}>
        <Avatar name="Jamie Rivera" />
        <div>
          <div className={classes.showcaseName}>Jamie Rivera</div>
          <div className={classes.showcaseHandle}>Product designer</div>
        </div>
        <div style={{ marginInlineStart: "auto" }}>
          <Badge variant="light">Pro</Badge>
        </div>
      </div>

      <Input
        label="Work email"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={classes.showcaseRow}>
        <span className={classes.showcaseLabel}>Email notifications</span>
        <Switch
          checked={notify}
          onChange={(e) => setNotify(e.currentTarget.checked)}
        />
      </div>
      <div className={classes.showcaseRow}>
        <span className={classes.showcaseLabel}>Plan</span>
        <Badge variant="outline" color="primary">
          {notify ? "Notifications on" : "Muted"}
        </Badge>
      </div>

      <div
        style={{ display: "flex", gap: "0.6rem", marginBlockStart: "0.25rem" }}
      >
        <Button fullWidth>Save changes</Button>
        <Button variant="light">Cancel</Button>
      </div>
    </div>
  );
}
