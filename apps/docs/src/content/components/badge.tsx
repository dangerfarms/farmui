import { Badge } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "badge",
  name: "Badge",
  category: "Data display",
  description: "A compact pill for statuses, counts, and labels.",
  importLine: `import { Badge } from "@farmui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Badges are neutral by default. There are no variant or color props — declare --fui-context on a one-element wrapper region (a style query is answered by ancestors, never by the declaring element itself), or let it inherit from a larger region. See the Contextualism guide.",
      code: `<Badge>Neutral</Badge>
<span style={{ "--fui-context": "primary" }}><Badge>Primary</Badge></span>
<span style={{ "--fui-context": "success" }}><Badge>Success</Badge></span>
<span style={{ "--fui-context": "warning" }}><Badge>Warning</Badge></span>
<span style={{ "--fui-context": "danger" }}><Badge>Danger</Badge></span>
<span style={{ "--fui-context": "info" }}><Badge>Info</Badge></span>`,
      render: () => (
        <>
          <Badge>Neutral</Badge>
          <span style={{ "--fui-context": "primary" } as CSSProperties}>
            <Badge>Primary</Badge>
          </span>
          <span style={{ "--fui-context": "success" } as CSSProperties}>
            <Badge>Success</Badge>
          </span>
          <span style={{ "--fui-context": "warning" } as CSSProperties}>
            <Badge>Warning</Badge>
          </span>
          <span style={{ "--fui-context": "danger" } as CSSProperties}>
            <Badge>Danger</Badge>
          </span>
          <span style={{ "--fui-context": "info" } as CSSProperties}>
            <Badge>Info</Badge>
          </span>
        </>
      ),
    },
    {
      title: "Sizes",
      code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
      render: () => (
        <>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </>
      ),
    },
    {
      title: "Status dot",
      description:
        "Add dot to show a status dot before the label — it takes the context's colour, so the badge reads at a glance even before the text.",
      code: `<span style={{ "--fui-context": "success" }}><Badge dot>Live</Badge></span>
<span style={{ "--fui-context": "warning" }}><Badge dot>Pending</Badge></span>
<span style={{ "--fui-context": "danger" }}><Badge dot>Offline</Badge></span>
<Badge dot>Draft</Badge>`,
      render: () => (
        <>
          <span style={{ "--fui-context": "success" } as CSSProperties}>
            <Badge dot>Live</Badge>
          </span>
          <span style={{ "--fui-context": "warning" } as CSSProperties}>
            <Badge dot>Pending</Badge>
          </span>
          <span style={{ "--fui-context": "danger" } as CSSProperties}>
            <Badge dot>Offline</Badge>
          </span>
          <Badge dot>Draft</Badge>
        </>
      ),
    },
    {
      title: "Icons (composed as children)",
      description:
        "No leftSection / rightSection props — an svg child is detected via :has(svg) and gets a gap and 1em sizing, exactly like Button.",
      code: `<span style={{ "--fui-context": "success" }}>
  <Badge>
    <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
      <path d="M5.5 12.5L10.167 17L19.5 8" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Verified
  </Badge>
</span>`,
      render: () => (
        <span style={{ "--fui-context": "success" } as CSSProperties}>
          <Badge>
            <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
              <path
                d="M5.5 12.5L10.167 17L19.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified
          </Badge>
        </span>
      ),
    },
  ],
  props: [
    {
      name: "dot",
      type: "boolean",
      description:
        "Show a status dot before the label, coloured by the context.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (height, padding, font size).",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"full"`,
      description: "Border radius token.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "The badge content — label, and any composed icons.",
    },
    {
      name: "...others",
      type: "SpanHTMLAttributes",
      description:
        "All native <span> props are forwarded, including style for the custom property below.",
    },
    {
      name: "--fui-context",
      type: `"primary" | "danger" | "success" | "warning" | "info"`,
      description:
        "The badge's status. Declare it on an ancestor — a one-element span wrapper for a single badge, or any region — because a style query is answered by ancestors, not by the declaring element; the property inherits.",
    },
  ],
};

export default doc;
