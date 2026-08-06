import { Input } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "input",
  name: "Input",
  category: "Inputs",
  description: "A labelled text field with description and error states.",
  importLine: `import { Input } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Input label="Email" placeholder="you@example.com" />`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input label="Email" placeholder="you@example.com" />
        </div>
      ),
    },
    {
      title: "No size prop",
      description:
        "Padding and font are fluid container-relative tokens — the control adapts to the space it lives in, and always height-aligns with Button, which shares the same derived anatomy. See the Contextualism guide.",
      code: `<div style={{ containerType: "inline-size", inlineSize: "16rem" }}>
  <Input label="In a narrow container" />
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}>
          <div
            style={{
              containerType: "inline-size",
              inlineSize: "16rem",
              maxInlineSize: "100%",
              padding: "0.75rem",
              border: "1px dashed var(--fui-border)",
              borderRadius: "var(--fui-radius-md)",
            }}
          >
            <Input label="In a narrow container" placeholder="you@example.com" />
          </div>
          <div
            style={{
              containerType: "inline-size",
              inlineSize: "30rem",
              maxInlineSize: "100%",
              padding: "0.75rem",
              border: "1px dashed var(--fui-border)",
              borderRadius: "var(--fui-radius-md)",
            }}
          >
            <Input label="In a wide one" placeholder="you@example.com" />
          </div>
        </div>
      ),
    },
    {
      title: "Description & required",
      code: `<Input
  label="Username"
  description="This will be your public handle."
  placeholder="ada_lovelace"
  withAsterisk
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input
            label="Username"
            description="This will be your public handle."
            placeholder="ada_lovelace"
            withAsterisk
          />
        </div>
      ),
    },
    {
      title: "Error state",
      code: `<Input
  label="Email"
  defaultValue="not-an-email"
  error="Please enter a valid email address."
/>`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input
            label="Email"
            defaultValue="not-an-email"
            error="Please enter a valid email address."
          />
        </div>
      ),
    },
    {
      title: "Native validation — no JS, no props",
      description:
        "Constraint validation is detected too: with required or type=\"email\", the field styles itself via :user-invalid after you interact with it — no error prop, no state, nothing running in the browser. Try typing a non-email and tabbing away.",
      code: `<Input label="Work email" type="email" required />`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input label="Work email" type="email" required />
        </div>
      ),
    },
    {
      title: "With sections",
      code: `<Input leftSection="@" placeholder="handle" />
<Input rightSection=".dev" placeholder="yoursite" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "20rem",
            inlineSize: "100%",
          }}
        >
          <Input leftSection="@" placeholder="handle" />
          <Input rightSection=".dev" placeholder="yoursite" />
        </div>
      ),
    },
  ],
  whenToUse: [
    "For short, free-form single-line text: names, emails, search terms, URLs.",
    "When you need a label, helper description and inline error tied together — Input composes the Field primitive for you so the wiring is correct.",
  ],
  whenNotToUse: [
    "For multi-line text — use Textarea.",
    "For choosing from a fixed set of options — use Select, Radio or Checkbox.",
    "When you need full control over the label/description/error structure — compose Field.* directly.",
  ],
  accessibility: [
    "The label is a real <label> tied to the input by id, so clicking it focuses the field and screen readers announce it.",
    "Description and error are linked via aria-describedby, and an error also sets aria-invalid — announced together when the field gains focus.",
    'The error message uses role="alert" so it is announced as it appears.',
    "Following GOV.UK guidance, prefer marking optional fields in words; reserve the required asterisk for genuinely required fields and explain it once per form.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the input.",
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
      name: "leftSection",
      type: "ReactNode",
      description: "Content inside the field, before the input.",
    },
    {
      name: "rightSection",
      type: "ReactNode",
      description: "Content inside the field, after the input.",
    },
    {
      name: "withAsterisk",
      type: "boolean",
      description: "Show a required asterisk next to the label.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: "All native <input> props are forwarded.",
    },
  ],
};

export default doc;
