import type { ComponentDoc } from "@/docs/types";
import {
  FieldsetCheckboxDemo,
  FieldsetOptionalDemo,
  FieldsetRadioDemo,
} from "./fieldset.client";

const doc: ComponentDoc = {
  slug: "fieldset",
  name: "Fieldset",
  category: "Inputs",
  description:
    "Groups related controls under a shared, semantic label using a native fieldset and legend.",
  importLine: `import { Fieldset } from "@farmui/core";`,
  demos: [
    {
      title: "Grouping checkboxes",
      description:
        "The legend names the group in the accessibility tree — the correct way to label a set of related controls.",
      code: `<Fieldset.Root>
  <Fieldset.Legend>Email notifications</Fieldset.Legend>
  <Checkbox label="Product updates" defaultChecked />
  <Checkbox label="Security alerts" defaultChecked />
  <Checkbox label="Marketing" />
</Fieldset.Root>`,
      render: () => <FieldsetCheckboxDemo />,
    },
    {
      title: "Optional group",
      description:
        "Mark the whole group optional in words rather than with an asterisk (GOV.UK).",
      code: `<Fieldset.Root>
  <Fieldset.Legend optional>Interests</Fieldset.Legend>
  <Checkbox label="Design" />
  <Checkbox label="Engineering" />
</Fieldset.Root>`,
      render: () => <FieldsetOptionalDemo />,
    },
    {
      title: "With a RadioGroup",
      description:
        "RadioGroup renders a Fieldset internally, so a legend labels the set of radios.",
      code: `<RadioGroup
  label="Plan"
  name="plan"
  defaultValue="pro"
  data={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "team", label: "Team" },
  ]}
/>`,
      render: () => <FieldsetRadioDemo />,
    },
  ],
  whenToUse: [
    "To label a set of related controls — a group of checkboxes, or a set of radios — with a single group name.",
    "Whenever a group of inputs needs one shared question or heading above them.",
  ],
  whenNotToUse: [
    "For a single labelled control — use Field (or a control's own label).",
    "As a generic layout box — Fieldset carries grouping semantics, not just spacing.",
  ],
  accessibility: [
    "Renders a native <fieldset> + <legend>: the legend is announced as the group's name when a control inside receives focus.",
    'This is preferred over a <div role="group"> with aria-labelledby — the native semantics are better supported.',
    "The browser's default fieldset border, margin and padding are reset so it composes cleanly with FarmUI's layout.",
  ],
  props: [
    {
      name: "Fieldset.Root",
      type: "{ ...fieldset }",
      description: "Renders a native <fieldset> grouping the controls.",
    },
    {
      name: "Fieldset.Legend",
      type: "{ optional?, ...legend }",
      description:
        "The accessible group label. `optional` appends an “(optional)” hint.",
    },
  ],
};

export default doc;
