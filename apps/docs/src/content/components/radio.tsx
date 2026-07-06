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
    {
      title: "Sizes",
      code: `<Radio size="sm" label="Small" name="sizes" defaultChecked />
<Radio size="md" label="Medium" name="sizes" />
<Radio size="lg" label="Large" name="sizes" />`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Radio size="sm" label="Small" name="radio-sizes" defaultChecked />
          <Radio size="md" label="Medium" name="radio-sizes" />
          <Radio size="lg" label="Large" name="radio-sizes" />
        </div>
      ),
    },
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
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Radio / RadioGroup: control size.",
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
