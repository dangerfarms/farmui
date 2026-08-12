import { Select } from "@farmui/core";
import type { ComponentContent } from "@/renderer/types";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Japan",
];

const doc: ComponentContent = {
  slug: "select",
  lead: "A styled wrapper around a native select, accessible and zero-JS.",
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
  error="Select a country"
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Select
            label="Country"
            placeholder="Pick a country"
            data={["United States", "Canada", "United Kingdom"]}
            error="Select a country"
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
    "For a small set of options the user should see at once: use Radio (GOV.UK: avoid selects where radios fit).",
    "For yes/no or on/off: use Checkbox or Switch.",
    "For free-form input: use Input.",
  ],
  howItWorks: [
    {
      title: "Start without a value",
      body: "Pass placeholder to render a disabled, empty first option, so the field starts unanswered and required validation catches an untouched select. Without it the first real option is pre-selected, and users who skip the field silently submit an answer they never chose.",
    },
    {
      title: "Order the options",
      body: "List options alphabetically so users can predict where an answer sits in a long menu, the reason to use a Select at all. Depart only for an order that is genuinely more useful in the domain, like months in calendar order or years newest-first.",
    },
    {
      title: "A select conceals its options",
      body: "Until opened, the menu shows one value and hides every alternative, so users can't survey or compare the choices. That is the cost that makes RadioGroup the better control for small sets. Reserve Select for long lists of familiar answers users recognise rather than weigh up.",
    },
  ],
  errors: [
    {
      situation: "Nothing is selected",
      message: "Select [whatever the label asks for]",
    },
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
