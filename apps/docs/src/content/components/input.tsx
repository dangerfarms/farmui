import { Input } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "input",
  name: "Input",
  category: "Inputs",
  description: "A labelled text field with description and error states.",
  importLine: `import { Input } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Input label="Email" placeholder="you@example.com" />`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input label="Email" placeholder="you@example.com" />
        </div>
      ),
    },
    {
      title: "Description & required",
      code: `<Input
  label="Username"
  description="This will be your public handle."
  placeholder="ada_lovelace"
  withAsterisk
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input
            label="Username"
            description="This will be your public handle."
            placeholder="ada_lovelace"
            withAsterisk
          />
        </div>
      ),
    },
    {
      title: "Error state",
      code: `<Input
  label="Email"
  defaultValue="not-an-email"
  error="Please enter a valid email address."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input
            label="Email"
            defaultValue="not-an-email"
            error="Please enter a valid email address."
          />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "20rem",
            inlineSize: "100%",
          }}
        >
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      ),
    },
    {
      title: "With sections",
      code: `<Input leftSection="@" placeholder="handle" />
<Input rightSection=".dev" placeholder="yoursite" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "20rem",
            inlineSize: "100%",
          }}
        >
          <Input leftSection="@" placeholder="handle" />
          <Input rightSection=".dev" placeholder="yoursite" />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the input.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text rendered below the label.",
    },
    {
      name: "error",
      type: "ReactNode",
      description: "Error message; puts the field in an invalid state.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size.",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"md"`,
      description: "Border radius token.",
    },
    {
      name: "leftSection",
      type: "ReactNode",
      description: "Content inside the field, before the input.",
    },
    {
      name: "rightSection",
      type: "ReactNode",
      description: "Content inside the field, after the input.",
    },
    {
      name: "withAsterisk",
      type: "boolean",
      description: "Show a required asterisk next to the label.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: "All native <input> props are forwarded.",
    },
  ],
};

export default doc;
