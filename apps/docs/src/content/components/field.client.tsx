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
        <Field.Control render={<Input placeholder="you@example.com" />} />
      </Field.Root>
    </div>
  );
}

export function FieldErrorDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Control render={<Input defaultValue="not-an-email" />} />
        <Field.Error>Enter a valid email address.</Field.Error>
      </Field.Root>
    </div>
  );
}

export function FieldOptionalDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label optional>Company</Field.Label>
        <Field.Control render={<Input placeholder="Acme Inc." />} />
      </Field.Root>
    </div>
  );
}
