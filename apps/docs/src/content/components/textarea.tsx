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
  ],
  whenToUse: [
    "For multi-line, free-form text: messages, comments, addresses, notes.",
    "When the expected input is longer than a single line or the user may want to add line breaks.",
  ],
  whenNotToUse: [
    "For single-line values (names, emails) — use Input.",
    "For a fixed set of options — use Select, Radio or Checkbox.",
  ],
  accessibility: [
    "Composes the Field primitive, so the label, description and error share one accessible wiring (label tied by id, aria-describedby, aria-invalid).",
    'The error uses role="alert" so it is announced when it appears.',
    "Resizes vertically only, so horizontal resize can't break the layout; give enough default rows to hint at the expected length (Polaris).",
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
