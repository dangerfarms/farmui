import { Switch } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";
import { SwitchFieldDemo } from "./switch.client";

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
      title: "Composed inside a Field",
      description:
        "The bare SwitchControl self-wires from Field context — label association and description linking come from the Field, the Base UI composition pattern shared by all form controls.",
      code: `<Field.Root>
  <Field.Label>
    <SwitchControl defaultChecked /> Email notifications
  </Field.Label>
  <Field.Description>Sent at most once a day.</Field.Description>
</Field.Root>`,
      render: () => <SwitchFieldDemo />,
    },
  ],
  whenToUse: [
    "For an instant on/off setting that takes effect immediately, with no separate save step (notifications, dark mode).",
    "When the two states are clearly opposite and the control acts like a physical switch.",
  ],
  whenNotToUse: [
    "When the change only applies after submitting a form — use a Checkbox instead (Polaris).",
    "For selecting among more than two states — use Radio or Select.",
  ],
  accessibility: [
    'Renders a native checkbox exposed with role="switch", so it is operable by keyboard and announced as on/off.',
    "The label is tied to the control; the whole row is clickable.",
    "State is conveyed by more than colour (the thumb position), so it remains clear in forced-colors and for colour-blind users.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Label rendered beside the toggle.",
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
    {
      name: "SwitchControl",
      type: "component",
      description:
        "The bare toggle without a label — composes inside Field and reads its wiring (id, aria-describedby, aria-invalid) from context.",
    },
  ],
};

export default doc;
