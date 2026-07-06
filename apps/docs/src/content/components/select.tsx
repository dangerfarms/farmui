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
    {
      title: "Sizes",
      code: `<Select size="sm" data={["United States", "Canada"]} />
<Select size="md" data={["United States", "Canada"]} />
<Select size="lg" data={["United States", "Canada"]} />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "20rem",
            inlineSize: "100%",
          }}
        >
          <Select size="sm" data={["United States", "Canada"]} />
          <Select size="md" data={["United States", "Canada"]} />
          <Select size="lg" data={["United States", "Canada"]} />
        </div>
      ),
    },
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
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (height, padding, font size).",
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
