import { Slider } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "slider",
  name: "Slider",
  category: "Inputs",
  description: "Pick a numeric value from a continuous range.",
  importLine: `import { Slider } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Slider defaultValue={40} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider defaultValue={40} aria-label="Value" />
        </div>
      ),
    },
    {
      title: "With label",
      code: `<Slider label="Water level" defaultValue={65} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider label="Water level" defaultValue={65} />
        </div>
      ),
    },
    {
      title: "Steps",
      description: "Snap to increments with the step prop.",
      code: `<Slider label="Fertiliser (kg)" min={0} max={100} step={10} defaultValue={30} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider
            label="Fertiliser (kg)"
            min={0}
            max={100}
            step={10}
            defaultValue={30}
          />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Slider size="sm" defaultValue={30} />
<Slider size="md" defaultValue={50} />
<Slider size="lg" defaultValue={70} />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            maxInlineSize: "22rem",
            inlineSize: "100%",
          }}
        >
          <Slider size="sm" defaultValue={30} aria-label="Small" />
          <Slider size="md" defaultValue={50} aria-label="Medium" />
          <Slider size="lg" defaultValue={70} aria-label="Large" />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Slider label="Locked" defaultValue={50} disabled />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider label="Locked" defaultValue={50} disabled />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the track.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (track height and thumb size).",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Increment between valid values.",
    },
    {
      name: "defaultValue",
      type: "number",
      description: "Initial value for uncontrolled usage.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="range"> props are forwarded.',
    },
  ],
};

export default doc;
