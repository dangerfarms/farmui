import { Progress } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "progress",
  name: "Progress",
  category: "Feedback",
  description: "A horizontal bar showing completion of a task.",
  importLine: `import { Progress } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description: "Set value 0–100. Add label to show the percentage.",
      code: `<Progress value={45} />
<Progress value={72} label />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={45} />
          <Progress value={72} label />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" label />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={60} size="sm" />
          <Progress value={60} size="md" />
          <Progress value={60} size="lg" label />
        </div>
      ),
    },
    {
      title: "Contexts",
      description:
        "There is no color prop. Declare --fui-context on a one-element wrapper region (a style query is answered by ancestors, never by the declaring element itself), or let it inherit from a region that already means something. See the Contextualism guide.",
      code: `<Progress value={50} />
<div style={{ "--fui-context": "warning" }}>
  <Progress value={88} />
</div>
<div style={{ "--fui-context": "danger" }}>
  <Progress value={98} />
</div>
<div style={{ "--fui-context": "success" }}>
  <Progress value={100} />
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={50} />
          <div style={{ "--fui-context": "warning" } as CSSProperties}>
            <Progress value={88} />
          </div>
          <div style={{ "--fui-context": "danger" } as CSSProperties}>
            <Progress value={98} />
          </div>
          <div style={{ "--fui-context": "success" } as CSSProperties}>
            <Progress value={100} />
          </div>
        </div>
      ),
    },
    {
      title: "Striped & animated",
      description: "Stripes convey ongoing, indeterminate-feeling work.",
      code: `<Progress value={65} striped />
<Progress value={65} animated />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={65} striped />
          <Progress value={65} animated />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Fill amount, 0–100 (clamped).",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Track thickness.",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"full"`,
      description: "Border radius token.",
    },
    {
      name: "striped",
      type: "boolean",
      description: "Overlay diagonal stripes on the filled bar.",
    },
    {
      name: "animated",
      type: "boolean",
      description: "Animate the stripes (implies striped).",
    },
    {
      name: "label",
      type: "boolean",
      description: "Render the percentage as text inside the bar.",
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
        "The bar's status colour. Declare it on an ancestor — a one-element wrapper for a single bar, or any region — because a style query is answered by ancestors, not by the declaring element; the property inherits.",
    },
  ],
};

export default doc;
