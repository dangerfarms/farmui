import { Badge } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "badge",
  name: "Badge",
  category: "Data display",
  description: "A compact pill for statuses, counts, and labels.",
  importLine: `import { Badge } from "@farmui/core";`,
  demos: [
    {
      title: "Variants",
      description: "Four visual styles for different emphasis levels.",
      code: `<Badge>Filled</Badge>
<Badge variant="light">Light</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="dot">Dot</Badge>`,
      render: () => (
        <>
          <Badge>Filled</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="dot">Dot</Badge>
        </>
      ),
    },
    {
      title: "Colors",
      description: "Semantic colors map to design tokens.",
      code: `<Badge color="primary" variant="light">Primary</Badge>
<Badge color="gray" variant="light">Gray</Badge>
<Badge color="danger" variant="light">Danger</Badge>
<Badge color="warning" variant="light">Warning</Badge>
<Badge color="info" variant="light">Info</Badge>`,
      render: () => (
        <>
          <Badge color="primary" variant="light">
            Primary
          </Badge>
          <Badge color="gray" variant="light">
            Gray
          </Badge>
          <Badge color="danger" variant="light">
            Danger
          </Badge>
          <Badge color="warning" variant="light">
            Warning
          </Badge>
          <Badge color="info" variant="light">
            Info
          </Badge>
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
      title: "With dot",
      description:
        "The dot variant shows a colored status dot before the label.",
      code: `<Badge variant="dot" color="primary">Live</Badge>
<Badge variant="dot" color="warning">Pending</Badge>
<Badge variant="dot" color="danger">Offline</Badge>
<Badge variant="dot" color="gray">Draft</Badge>`,
      render: () => (
        <>
          <Badge variant="dot" color="primary">
            Live
          </Badge>
          <Badge variant="dot" color="warning">
            Pending
          </Badge>
          <Badge variant="dot" color="danger">
            Offline
          </Badge>
          <Badge variant="dot" color="gray">
            Draft
          </Badge>
        </>
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: `"filled" | "light" | "outline" | "dot"`,
      default: `"filled"`,
      description: "Visual style of the badge.",
    },
    {
      name: "color",
      type: `"primary" | "gray" | "danger" | "warning" | "info"`,
      default: `"primary"`,
      description: "Semantic color.",
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
      name: "leftSection",
      type: "ReactNode",
      description: "Content rendered before the label.",
    },
    {
      name: "rightSection",
      type: "ReactNode",
      description: "Content rendered after the label.",
    },
    {
      name: "...others",
      type: "SpanHTMLAttributes",
      description: "All native <span> props are forwarded.",
    },
  ],
};

export default doc;
