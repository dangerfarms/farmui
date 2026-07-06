import { Textarea } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "textarea",
  name: "Textarea",
  category: "Inputs",
  description:
    "A labelled multi-line text field with description and error states.",
  importLine: `import { Textarea } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Textarea label="Notes" placeholder="Anything to add?" />`,
      render: () => (
        <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
          <Textarea label="Notes" placeholder="Anything to add?" />
        </div>
      ),
    },
    {
      title: "With description",
      code: `<Textarea
  label="Bio"
  description="A short description for your public profile."
  placeholder="Tell us about yourself…"
  withAsterisk
/>`,
      render: () => (
        <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
          <Textarea
            label="Bio"
            description="A short description for your public profile."
            placeholder="Tell us about yourself…"
            withAsterisk
          />
        </div>
      ),
    },
    {
      title: "Error state",
      code: `<Textarea
  label="Message"
  defaultValue="Too short"
  error="Please enter at least 20 characters."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
          <Textarea
            label="Message"
            defaultValue="Too short"
            error="Please enter at least 20 characters."
          />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "24rem",
            inlineSize: "100%",
          }}
        >
          <Textarea size="sm" placeholder="Small" />
          <Textarea size="md" placeholder="Medium" />
          <Textarea size="lg" placeholder="Large" />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the textarea.",
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
      description: "Control size (min height, padding, font size).",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"md"`,
      description: "Border radius token.",
    },
    {
      name: "withAsterisk",
      type: "boolean",
      description: "Show a required asterisk next to the label.",
    },
    {
      name: "rows",
      type: "number",
      default: "3",
      description: "Number of visible text rows.",
    },
    {
      name: "...others",
      type: "TextareaHTMLAttributes",
      description: "All native <textarea> props are forwarded.",
    },
  ],
};

export default doc;
