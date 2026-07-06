import { Progress } from "@farmui/core";
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
      title: "Colors",
      code: `<Progress value={50} color="primary" />
<Progress value={50} color="info" />
<Progress value={50} color="success" />
<Progress value={50} color="warning" />
<Progress value={50} color="danger" />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={50} color="primary" />
          <Progress value={50} color="info" />
          <Progress value={50} color="success" />
          <Progress value={50} color="warning" />
          <Progress value={50} color="danger" />
        </div>
      ),
    },
    {
      title: "Striped & animated",
      description: "Stripes convey ongoing, indeterminate-feeling work.",
      code: `<Progress value={65} striped />
<Progress value={65} animated color="info" />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Progress value={65} striped />
          <Progress value={65} animated color="info" />
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
      name: "color",
      type: `"primary" | "info" | "success" | "warning" | "danger"`,
      default: `"primary"`,
      description: "Semantic color of the filled bar.",
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
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
