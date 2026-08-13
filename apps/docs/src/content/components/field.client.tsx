"use client";

import { Field, Input } from "@farmui/core";

export function FieldComposeDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Description>
          We&apos;ll only use this to reply.
        </Field.Description>
        <Input placeholder="you@example.com" />
      </Field.Root>
    </div>
  );
}

export function FieldErrorDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input defaultValue="not-an-email" />
        <Field.Error>
          Enter an email address in the correct format, like name@example.com
        </Field.Error>
      </Field.Root>
    </div>
  );
}

export function FieldOptionalDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label optional>Company</Field.Label>
        <Input placeholder="Acme Inc." />
      </Field.Root>
    </div>
  );
}

export function FieldCustomControlDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Amount</Field.Label>
        <Field.Description>
          A bare native input, not a FarmUI control.
        </Field.Description>
        <Field.Control
          render={(props) => <input {...props} inputMode="decimal" />}
        />
      </Field.Root>
    </div>
  );
}
