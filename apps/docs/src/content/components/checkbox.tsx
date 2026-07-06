import { Checkbox } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "checkbox",
  name: "Checkbox",
  category: "Inputs",
  description:
    "A styled checkbox with an adjacent label, description and error states.",
  importLine: `import { Checkbox } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Checkbox label="Subscribe to the newsletter" />`,
      render: () => <Checkbox label="Subscribe to the newsletter" />,
    },
    {
      title: "Checked",
      code: `<Checkbox label="Enable email notifications" defaultChecked />`,
      render: () => (
        <Checkbox label="Enable email notifications" defaultChecked />
      ),
    },
    {
      title: "With description",
      code: `<Checkbox
  label="Share anonymised usage data"
  description="Helps us improve the product. You can opt out anytime."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "24rem" }}>
          <Checkbox
            label="Share anonymised usage data"
            description="Helps us improve the product. You can opt out anytime."
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Checkbox label="Unavailable option" disabled />
<Checkbox label="Locked in" defaultChecked disabled />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Checkbox label="Unavailable option" disabled />
          <Checkbox label="Locked in" defaultChecked disabled />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium" defaultChecked />
<Checkbox size="lg" label="Large" defaultChecked />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Checkbox size="sm" label="Small" defaultChecked />
          <Checkbox size="md" label="Medium" defaultChecked />
          <Checkbox size="lg" label="Large" defaultChecked />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered next to the checkbox.",
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
      description: "Control size (box and label size).",
    },
    {
      name: "indeterminate",
      type: "boolean",
      description: "Render the partially-checked (dash) visual state.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: "All native <input> props (except size/type) are forwarded.",
    },
  ],
};

export default doc;
