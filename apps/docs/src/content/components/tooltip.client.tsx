"use client";

import { Button, Tooltip } from "@farmui/core";

export function TooltipPositions() {
  return (
    <>
      <Tooltip label="Above the button" position="top">
        <Button variant="light">Top</Button>
      </Tooltip>
      <Tooltip label="Below the button" position="bottom">
        <Button variant="light">Bottom</Button>
      </Tooltip>
      <Tooltip label="Left of the button" position="left">
        <Button variant="light">Left</Button>
      </Tooltip>
      <Tooltip label="Right of the button" position="right">
        <Button variant="light">Right</Button>
      </Tooltip>
    </>
  );
}

export function TooltipArrow() {
  return (
    <Tooltip label="Saved just now" withArrow>
      <Button>Hover or focus me</Button>
    </Tooltip>
  );
}

export function TooltipOnText() {
  return (
    <p style={{ maxInlineSize: "24rem", lineHeight: 1.6 }}>
      Every component is fully{" "}
      <Tooltip label="Meets WCAG 2.1 AA out of the box" withArrow>
        <button
          type="button"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            font: "inherit",
            color: "var(--fui-primary)",
            textDecoration: "underline dotted",
            textUnderlineOffset: "2px",
            cursor: "help",
          }}
        >
          accessible
        </button>
      </Tooltip>{" "}
      right out of the box.
    </p>
  );
}
