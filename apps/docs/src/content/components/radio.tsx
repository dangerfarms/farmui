import { Radio, RadioGroup } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "radio",
  name: "Radio",
  category: "Inputs",
  description: "Choose a single option from a mutually exclusive set.",
  importLine: `import { Radio, RadioGroup } from "@farmui/core";`,
  demos: [
    {
      title: "Basic group",
      description:
        "A RadioGroup shares one name so only one option can be selected.",
      code: `<RadioGroup label="Theme" defaultValue="system">
  <Radio value="system" label="System" />
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Theme" defaultValue="system">
          <Radio value="system" label="System" />
          <Radio value="light" label="Light" />
          <Radio value="dark" label="Dark" />
        </RadioGroup>
      ),
    },
    {
      title: "With descriptions",
      description: "Each option can carry helper text under its label.",
      code: `<RadioGroup label="Delivery" defaultValue="standard">
  <Radio
    value="standard"
    label="Standard"
    description="Arrives in 3-5 business days."
  />
  <Radio
    value="express"
    label="Express"
    description="Guaranteed next-day delivery."
  />
</RadioGroup>`,
      render: () => (
        <RadioGroup label="Delivery" defaultValue="standard">
          <Radio
            value="standard"
            label="Standard"
            description="Arrives in 3-5 business days."
          />
          <Radio
            value="express"
            label="Express"
            description="Guaranteed next-day delivery."
          />
        </RadioGroup>
      ),
    },
    {
      title: "Horizontal & from data",
      description:
        "Lay options out in a row, and build them from a data array instead of children.",
      code: `<RadioGroup
  label="Portion size"
  orientation="horizontal"
  defaultValue="m"
  data={[
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
  ]}
/>`,
      render: () => (
        <RadioGroup
          label="Portion size"
          orientation="horizontal"
          defaultValue="m"
          data={[
            { value: "s", label: "Small" },
            { value: "m", label: "Medium" },
            { value: "l", label: "Large" },
          ]}
        />
      ),
    },
    {
      title: "Disabled option & error",
      code: `<RadioGroup
  label="Plan"
  defaultValue="basic"
  error="Please pick an available plan."
>
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="legacy" label="Legacy" disabled />
</RadioGroup>`,
      render: () => (
        <RadioGroup
          label="Plan"
          defaultValue="basic"
          error="Please pick an available plan."
        >
          <Radio value="basic" label="Basic" />
          <Radio value="pro" label="Pro" />
          <Radio value="legacy" label="Legacy" disabled />
        </RadioGroup>
      ),
    },
  ],
  whenToUse: [
    "For choosing exactly one option from a small, visible set (roughly 2–5).",
    "Always inside a RadioGroup, which shares a name and labels the set with a <fieldset>/<legend>.",
  ],
  whenNotToUse: [
    "For many options — a Select is more compact.",
    "For selecting several options — use Checkbox.",
    "For a single on/off — use Checkbox or Switch.",
  ],
  accessibility: [
    "RadioGroup renders a native <fieldset> with a <legend>, the accessible way to name a group — screen readers announce the legend when a radio is focused.",
    "Radios share one name so the browser enforces single-selection and arrow-key navigation natively.",
    "A group error sets aria-describedby and aria-invalid on the fieldset and reflects on the radios' invalid state.",
    "GOV.UK: don't pre-select a radio unless there's a safe, sensible default — an empty group makes the user choose deliberately.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Radio: label rendered next to the control.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Radio: helper text rendered under the label.",
    },
    {
      name: "RadioGroup.label",
      type: "ReactNode",
      description: "Group label (wired via aria-labelledby).",
    },
    {
      name: "RadioGroup.description",
      type: "ReactNode",
      description: "Helper text rendered under the group label.",
    },
    {
      name: "RadioGroup.error",
      type: "ReactNode",
      description: "Error message; marks the group invalid.",
    },
    {
      name: "RadioGroup.name",
      type: "string",
      description: "Shared name for all radios (auto-generated if omitted).",
    },
    {
      name: "RadioGroup.value",
      type: "string",
      description: "Controlled selected value (pair with onChange).",
    },
    {
      name: "RadioGroup.defaultValue",
      type: "string",
      description: "Initial selected value for uncontrolled usage.",
    },
    {
      name: "RadioGroup.onChange",
      type: "(value: string) => void",
      description: "Fires with the newly selected value.",
    },
    {
      name: "RadioGroup.orientation",
      type: `"vertical" | "horizontal"`,
      default: `"vertical"`,
      description: "Layout direction of the options.",
    },
    {
      name: "RadioGroup.data",
      type: "Array<string | { value; label? }>",
      description: "Build options from an array instead of children.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="radio"> props are forwarded.',
    },
  ],
};

export default doc;
