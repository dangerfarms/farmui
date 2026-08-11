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
  howItWorks: [
    {
      title: "Asking for numbers",
      body: 'Never use type="number": scroll wheels and arrow keys silently change the value, and browsers give poor feedback when the input is invalid. Pass inputMode="numeric" for whole numbers or inputMode="decimal" for amounts — both forward straight to the native input — so touch devices raise a number pad while the field keeps normal text behaviour.',
      code: `<Input label="Account number" inputMode="numeric" />
<Input label="Weight in kilograms" inputMode="decimal" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            maxInlineSize: "20rem",
            inlineSize: "100%",
          }}
        >
          <Input label="Account number" inputMode="numeric" />
          <Input label="Weight in kilograms" inputMode="decimal" />
        </div>
      ),
    },
    {
      title: "Codes and references",
      body: "Values users copy rather than compose — booking references, invoice numbers, licence keys — are not words, so set spellCheck={false} to stop browsers underlining a correct value as a mistake. A digits-only reference also takes inputMode=\"numeric\".",
    },
    {
      title: "Autofill and input purpose",
      body: 'Any field asking for something about the user gets the matching autoComplete value — "name", "email", "postal-code", "bday-day" and the rest of the HTML autofill set, forwarded straight through. This is WCAG 1.3.5 (Identify Input Purpose): it lets browsers fill the answer correctly and lets assistive tech present the field in the user’s own terms.',
      code: `<Input label="Email" type="email" autoComplete="email" />`,
      render: () => (
        <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
          <Input label="Email" type="email" autoComplete="email" />
        </div>
      ),
    },
    {
      title: "Placeholders are not labels",
      body: "A placeholder vanishes the moment the user types, is skipped by some assistive technology, and its dimmed colour fails contrast as instruction text. The label prop is the shortest path through this API — use it for what the field is, and put format hints in description, which stays visible and is announced. Reserve placeholder for a genuinely disposable example.",
    },
    {
      title: "Width belongs to the container",
      body: "The field fills whatever it is placed in — there is no size or width prop. Width is information: a four-character reference in a page-wide box reads as a harder question than it is, so put the field in a container sized to the expected answer.",
    },
  ],
  errors: [
    {
      situation: "The field is empty",
      message: "Enter [whatever the label asks for]",
    },
    {
      situation: "The value is the wrong format",
      message: "Enter [a/an] [thing] in the correct format, like [example]",
    },
    {
      situation: "The value is too long / too short",
      message: "[Label] must be [N] characters or fewer / or more",
    },
    {
      situation: "The value contains a disallowed character",
      message: "[Label] must only include [allowed characters]",
    },
    {
      situation: "A number is out of range",
      message: "[Label] must be between [min] and [max]",
    },
  ],
  accessibility: [
    "The label is a real <label> tied to the input by id, so clicking it focuses the field and screen readers announce it.",
    "Description and error are linked via aria-describedby, and an error also sets aria-invalid — announced together when the field gains focus.",
    'The error message uses role="alert" so it is announced as it appears.',
    "leftSection / rightSection render your content beside the input but outside its accessible name. Mark visual content like currency symbols or icons aria-hidden, and carry the unit in the label or description so non-visual users get it too.",
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
