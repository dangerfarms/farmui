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
  ],
  whenToUse: [
    "For a single on/off choice (accept terms, stay signed in).",
    "For selecting any number of options from a list — group related checkboxes in a Fieldset.",
    "Inside a Field for full control: <Field.Label><Checkbox /> …</Field.Label>.",
  ],
  whenNotToUse: [
    "For one choice among several mutually exclusive options — use Radio.",
    "For an instant on/off toggle that takes effect immediately — use Switch.",
  ],
  accessibility: [
    'Renders a real <input type="checkbox"> wrapped by its label, so clicking the text toggles it and the state is announced natively.',
    "Supports an indeterminate (mixed) visual for a 'select all' parent, set on the DOM node — remember it is a display state, not a third value.",
    "When placed inside a Field it reads its id, aria-describedby and aria-invalid from context; standalone it wires its own label, description and error.",
    "Group multiple checkboxes under a Fieldset so the legend names the set in the accessibility tree.",
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
      name: "indeterminate",
      type: "boolean",
      description: "Render the partially-checked (dash) visual state.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: "All native <input> props (except type) are forwarded.",
    },
  ],
};

export default doc;
