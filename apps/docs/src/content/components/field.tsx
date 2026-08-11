import type { ComponentDoc } from "@/docs/types";
import {
  FieldComposeDemo,
  FieldErrorDemo,
  FieldOptionalDemo,
} from "./field.client";

const doc: ComponentDoc = {
  slug: "field",
  name: "Field",
  category: "Inputs",
  description:
    "A composable form-field primitive that wires label, description, error and accessibility for any control.",
  importLine: `import { Field } from "@farmui/core";`,
  demos: [
    {
      title: "Composing a field",
      description:
        "Assemble the parts; Field.Root links the label to the control and gathers the description and error into aria-describedby.",
      code: `<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Description>We'll only use this to reply.</Field.Description>
  <Field.Control render={<Input placeholder="you@example.com" />} />
</Field.Root>`,
      render: () => <FieldComposeDemo />,
    },
    {
      title: "Error state",
      description:
        'A Field.Error with content flips the field to invalid and is announced via role="alert".',
      code: `<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Control render={<Input defaultValue="not-an-email" />} />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Root>`,
      render: () => <FieldErrorDemo />,
    },
    {
      title: "Optional field",
      description:
        "Mark optional fields in words (GOV.UK guidance) rather than flagging required ones with an asterisk.",
      code: `<Field.Root>
  <Field.Label optional>Company</Field.Label>
  <Field.Control render={<Input placeholder="Acme Inc." />} />
</Field.Root>`,
      render: () => <FieldOptionalDemo />,
    },
  ],
  whenToUse: [
    "When you need control over a field's structure — reordering the label, description and error, or wrapping a non-standard control.",
    "To give any custom control the same accessible label/description/error wiring the built-in inputs get.",
  ],
  whenNotToUse: [
    "For a plain labelled text box — Input composes Field for you with less markup.",
    "As a layout grid — Field only arranges a single control and its supporting text.",
  ],
  howItWorks: [
    {
      title: "Writing error messages",
      body: "An error message says what happened and how to fix it, in the words of the question itself: if the label asks \u201cHow many hours do you work a week?\u201d, the error is \u201cEnter how many hours you work a week\u201d \u2014 never \u201cThis field is required\u201d. Use an instruction (\u201cEnter your first name\u201d) when the field is empty and a description (\u201cName must be 35 characters or fewer\u201d) when the value breaks a rule. Write in plain, positive language: no \u201cplease\u201d (it implies a choice), no \u201csorry\u201d (it doesn't help), no \u201cvalid/invalid\u201d (vague), no jargon or error codes, no humour. Keep the user's input on screen while showing the error \u2014 never clear the field.",
    },
    {
      title: "One error, one place, one wording",
      body: "The message renders once, inside the field, tied to the control by aria-describedby and announced by role=\u0022alert\u0022 \u2014 the wiring is automatic when Field.Error has content. Keep the wording identical anywhere else it appears so it reads the same out of context.",
    },
  ],
  errors: [
    {
      situation: "The field is empty",
      message: "Enter [whatever the label asks for]",
    },
    {
      situation: "The value is the wrong format",
      message: "[Label] must be [format], like [example]",
    },
    {
      situation: "The value is too long / too short",
      message: "[Label] must be [N] characters or fewer / or more",
    },
    {
      situation: "The value is out of range",
      message: "[Label] must be between [min] and [max]",
    },
  ],
  accessibility: [
    "Field.Root generates one id and hands it to Field.Label (via htmlFor) and Field.Control (as the control id), so label and control are always associated.",
    "Description and error ids are added to the control's aria-describedby only when those parts are present.",
    'Any Field.Error with content sets aria-invalid on the control and is announced with role="alert".',
    "Field.Control wires accessibility onto whatever you pass, letting you keep semantic, native controls instead of re-implementing them.",
  ],
  props: [
    {
      name: "Field.Root",
      type: "{ id?, ...div }",
      description:
        "Wraps a field and provides context. The invalid state is detected: it is true exactly when a Field.Error with content is rendered.",
    },
    {
      name: "Field.Label",
      type: "{ optional?, ...label }",
      description:
        "Label tied to the control. `optional` appends an “(optional)” hint.",
    },
    {
      name: "Field.Description",
      type: "{ ...p }",
      description: "Helper text, linked via aria-describedby.",
    },
    {
      name: "Field.Control",
      type: "{ render }",
      description:
        "Renders the control (an element to clone or a function) and wires id, aria-describedby and aria-invalid onto it.",
    },
    {
      name: "Field.Error",
      type: "{ ...p }",
      description:
        'Error message with role="alert"; sets the invalid state when it has content.',
    },
  ],
};

export default doc;
