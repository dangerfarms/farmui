"use client";

import { Field, Textarea } from "@farmui/core";

export function TextareaBasicDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Notes</Field.Label>
        <Textarea placeholder="Anything to add?" />
      </Field.Root>
    </div>
  );
}

export function TextareaDescriptionDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Field.Description>
          A short description for your public profile.
        </Field.Description>
        <Textarea placeholder="Tell us about yourself…" required />
      </Field.Root>
    </div>
  );
}

export function TextareaErrorDemo() {
  return (
    <div style={{ maxInlineSize: "24rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Message</Field.Label>
        <Textarea defaultValue="Too short" />
        <Field.Error>Message must be 20 characters or more</Field.Error>
      </Field.Root>
    </div>
  );
}
