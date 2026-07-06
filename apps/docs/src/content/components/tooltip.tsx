import type { ComponentDoc } from "@/docs/types";
import {
  TooltipArrow,
  TooltipOnText,
  TooltipPositions,
} from "./tooltip.client";

const doc: ComponentDoc = {
  slug: "tooltip",
  name: "Tooltip",
  category: "Overlays",
  description: "A small floating label revealed on hover and keyboard focus.",
  importLine: `import { Tooltip } from "@farmui/core";`,
  demos: [
    {
      title: "Positions",
      description:
        "Place the tooltip on any side of its target with the position prop.",
      code: `<Tooltip label="Above the button" position="top">
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
</Tooltip>`,
      render: () => <TooltipPositions />,
    },
    {
      title: "With arrow",
      description: "Add a pointer arrow toward the target with withArrow.",
      code: `<Tooltip label="Saved just now" withArrow>
  <Button>Hover or focus me</Button>
</Tooltip>`,
      render: () => <TooltipArrow />,
    },
    {
      title: "On inline text",
      description:
        "Wrap a focusable inline element to explain a term in place.",
      code: `<p>
  Every component is fully{" "}
  <Tooltip label="Meets WCAG 2.1 AA out of the box" withArrow>
    <button type="button" className="term">accessible</button>
  </Tooltip>{" "}
  right out of the box.
</p>`,
      render: () => <TooltipOnText />,
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "The floating label shown on hover and focus.",
    },
    {
      name: "position",
      type: `"top" | "bottom" | "left" | "right"`,
      default: `"top"`,
      description: "Which side of the target the tooltip appears on.",
    },
    {
      name: "withArrow",
      type: "boolean",
      description: "Render a small pointer arrow toward the target.",
    },
    {
      name: "children",
      type: "ReactElement",
      description:
        "The single element the tooltip describes (receives aria-describedby).",
    },
  ],
};

export default doc;
