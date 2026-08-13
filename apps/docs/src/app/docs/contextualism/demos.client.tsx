"use client";

import { Field, Input } from "@farmui/core";

/** A field whose invalid state is detected from the rendered error message. */
export function DetectedErrorDemo() {
  return (
    <div style={{ maxInlineSize: "22rem" }}>
      <Field.Root>
        <Field.Label>Workspace name</Field.Label>
        <Input defaultValue="my workspace!" />
        <Field.Error>Names can only contain letters, numbers and dashes.</Field.Error>
      </Field.Root>
    </div>
  );
}
