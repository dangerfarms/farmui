import { Alert } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "alert",
  name: "Alert",
  category: "Feedback",
  description:
    "A prominent message box whose status comes from its context.",
  importLine: `import { Alert } from "@farmui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Alert has no color or variant props. Declare --fui-context on a one-element wrapper region — a style query is answered by ancestors, never by the element that declares the property — and the status colours follow. See the Contextualism guide.",
      code: `<div style={{ "--fui-context": "info" }}>
  <Alert title="Heads up">A new version is available.</Alert>
</div>
<div style={{ "--fui-context": "success" }}>
  <Alert title="Saved">Your changes have been stored.</Alert>
</div>
<div style={{ "--fui-context": "warning" }}>
  <Alert title="Low storage">Only 5% of your quota remains.</Alert>
</div>
<div style={{ "--fui-context": "danger" }}>
  <Alert title="Deploy failed">Check the build logs.</Alert>
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <div style={{ "--fui-context": "info" } as CSSProperties}>
            <Alert title="Heads up">A new version is available.</Alert>
          </div>
          <div style={{ "--fui-context": "success" } as CSSProperties}>
            <Alert title="Saved">Your changes have been stored.</Alert>
          </div>
          <div style={{ "--fui-context": "warning" } as CSSProperties}>
            <Alert title="Low storage">Only 5% of your quota remains.</Alert>
          </div>
          <div style={{ "--fui-context": "danger" } as CSSProperties}>
            <Alert title="Deploy failed">Check the build logs.</Alert>
          </div>
        </div>
      ),
    },
    {
      title: "Inherited from a region",
      description:
        "--fui-context inherits, so an alert inside a region that already declares its meaning needs nothing of its own — the nearest ancestor that sets the property wins.",
      code: `<section style={{ "--fui-context": "warning" }}>
  <Alert title="Scheduled maintenance tonight." />
</section>`,
      render: () => (
        <div
          style={
            {
              "--fui-context": "warning",
              inlineSize: "100%",
            } as CSSProperties
          }
        >
          <Alert title="Scheduled maintenance tonight." />
        </div>
      ),
    },
    {
      title: "With icon",
      description: "Pass any node as the leading icon.",
      code: `<div style={{ "--fui-context": "info" }}>
  <Alert icon={<span>ℹ</span>} title="Did you know?">
    You can theme every alert with a single CSS variable.
  </Alert>
</div>`,
      render: () => (
        <div
          style={
            { "--fui-context": "info", inlineSize: "100%" } as CSSProperties
          }
        >
          <Alert icon={<span aria-hidden>ℹ</span>} title="Did you know?">
            You can theme every alert with a single CSS variable.
          </Alert>
        </div>
      ),
    },
    {
      title: "Title only",
      description: "Body content is optional.",
      code: `<div style={{ "--fui-context": "success" }}>
  <Alert title="All systems operational." />
</div>`,
      render: () => (
        <div
          style={
            { "--fui-context": "success", inlineSize: "100%" } as CSSProperties
          }
        >
          <Alert title="All systems operational." />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Bold heading rendered above the body.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Icon rendered to the inline-start of the content.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Alert body content.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description:
        "All native <div> props are forwarded, including style for the custom property below.",
    },
    {
      name: "--fui-context",
      type: `"primary" | "danger" | "success" | "warning" | "info"`,
      description:
        "The alert's status. Declare it on an ancestor — a one-element wrapper for a single alert, or any region — because a style query is answered by ancestors, not by the declaring element; the property inherits.",
    },
  ],
};

export default doc;
