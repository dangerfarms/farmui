import { Button } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "button",
  name: "Button",
  category: "Inputs",
  description: "Trigger an action or event with a single click.",
  importLine: `import { Button } from "@farmui/core";`,
  demos: [
    {
      title: "Variants",
      description: "Four visual styles for different emphasis levels.",
      code: `<Button>Filled</Button>
<Button variant="light">Light</Button>
<Button variant="outline">Outline</Button>
<Button variant="subtle">Subtle</Button>`,
      render: () => (
        <>
          <Button>Filled</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
        </>
      ),
    },
    {
      title: "Sizes",
      code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      render: () => (
        <>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </>
      ),
    },
    {
      title: "Colors",
      description: "Use the danger color for destructive actions.",
      code: `<Button color="danger">Delete</Button>
<Button color="danger" variant="light">Delete</Button>
<Button color="danger" variant="outline">Delete</Button>`,
      render: () => (
        <>
          <Button color="danger">Delete</Button>
          <Button color="danger" variant="light">
            Delete
          </Button>
          <Button color="danger" variant="outline">
            Delete
          </Button>
        </>
      ),
    },
    {
      title: "With sections & loading",
      code: `<Button leftSection={<span>↓</span>}>Download</Button>
<Button rightSection={<span>→</span>} variant="light">Next</Button>
<Button loading>Saving</Button>`,
      render: () => (
        <>
          <Button leftSection={<span aria-hidden>↓</span>}>Download</Button>
          <Button rightSection={<span aria-hidden>→</span>} variant="light">
            Next
          </Button>
          <Button loading>Saving</Button>
        </>
      ),
    },
    {
      title: "Full width & radius",
      code: `<Button fullWidth>Full width</Button>
<Button radius="full">Pill</Button>`,
      render: () => (
        <div style={{ inlineSize: "100%", display: "grid", gap: "0.75rem" }}>
          <Button fullWidth>Full width</Button>
          <Button radius="full">Pill</Button>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "variant",
      type: `"filled" | "light" | "outline" | "subtle"`,
      default: `"filled"`,
      description: "Visual style of the button.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (height, padding, font size).",
    },
    {
      name: "color",
      type: `"primary" | "danger"`,
      default: `"primary"`,
      description: "Semantic color.",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"md"`,
      description: "Border radius token.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      description: "Stretch the button to fill its container.",
    },
    {
      name: "loading",
      type: "boolean",
      description: "Show a spinner and disable interaction.",
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
      type: "ButtonHTMLAttributes",
      description: "All native <button> props are forwarded.",
    },
  ],
};

export default doc;
