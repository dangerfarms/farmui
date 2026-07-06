import { Switch } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "switch",
  name: "Switch",
  category: "Inputs",
  description: "Toggle a single setting on or off.",
  importLine: `import { Switch } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Switch />`,
      render: () => <Switch aria-label="Toggle" />,
    },
    {
      title: "Checked",
      description: "The track fills with the primary color when on.",
      code: `<Switch defaultChecked />`,
      render: () => <Switch defaultChecked aria-label="Toggle on" />,
    },
    {
      title: "With label",
      code: `<Switch label="Enable notifications" defaultChecked />
<Switch label="Label on the left" labelPosition="start" />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Switch label="Enable notifications" defaultChecked />
          <Switch label="Label on the left" labelPosition="start" />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Switch label="Off & disabled" disabled />
<Switch label="On & disabled" defaultChecked disabled />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Switch label="Off & disabled" disabled />
          <Switch label="On & disabled" defaultChecked disabled />
        </div>
      ),
    },
    {
      title: "Sizes",
      code: `<Switch size="sm" label="Small" defaultChecked />
<Switch size="md" label="Medium" defaultChecked />
<Switch size="lg" label="Large" defaultChecked />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Switch size="sm" label="Small" defaultChecked />
          <Switch size="md" label="Medium" defaultChecked />
          <Switch size="lg" label="Large" defaultChecked />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered beside the toggle.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size.",
    },
    {
      name: "labelPosition",
      type: `"start" | "end"`,
      default: `"end"`,
      description: "Which side of the toggle the label sits on.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="checkbox"> props are forwarded.',
    },
  ],
};

export default doc;
