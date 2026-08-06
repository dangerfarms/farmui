import { Select } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Japan",
];

const doc: ComponentDoc = {
  slug: "select",
  name: "Select",
  category: "Inputs",
  description:
    "A styled wrapper around a native select — accessible and zero-JS.",
  importLine: `import { Select } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Select
  label="Country"
  data={["United States", "Canada", "United Kingdom", "Germany", "Japan"]}
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Select label="Country" data={countries} />
        </div>
      ),
    },
    {
      title: "With placeholder",
      description: "Pass a placeholder to render an empty prompt option first.",
      code: `<Select
  label="Country"
  placeholder="Pick a country"
  data={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ]}
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Select
            label="Country"
            placeholder="Pick a country"
            data={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "uk", label: "United Kingdom" },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Error state",
      code: `<Select
  label="Country"
  placeholder="Pick a country"
  data={["United States", "Canada", "United Kingdom"]}
  error="Please choose a country."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Select
            label="Country"
            placeholder="Pick a country"
            data={["United States", "Canada", "United Kingdom"]}
            error="Please choose a country."
          />
        </div>
      ),
    },
  ],
  whenToUse: [
    "For choosing one option from a longer list (roughly 5+) where showing them all would take too much space.",
    "When the options are familiar and the user doesn't need to compare them side by side.",
  ],
  whenNotToUse: [
    "For a small set of options the user should see at once — use Radio (GOV.UK: avoid selects where radios fit).",
    "For yes/no or on/off — use Checkbox or Switch.",
    "For free-form input — use Input.",
  ],
  accessibility: [
    "Wraps a native <select>, so keyboard interaction, typeahead and the mobile picker come from the platform.",
    'Composes the Field primitive: label, description and error are wired via id / aria-describedby / aria-invalid with the error as role="alert".',
    "A placeholder renders as a disabled first option so it is never a selectable value.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the select.",
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
      name: "placeholder",
      type: "string",
      description: "Non-selectable prompt shown as the first, empty option.",
    },
    {
      name: "data",
      type: "Array<string | { value: string; label: string }>",
      description: "The options to render.",
    },
    {
      name: "...others",
      type: "SelectHTMLAttributes",
      description: "All native <select> props are forwarded.",
    },
  ],
};

export default doc;
