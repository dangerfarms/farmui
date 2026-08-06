"use client";

import { Field, SliderControl } from "@farmui/core";

export function SliderFieldDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Volume</Field.Label>
        <Field.Description>Applies to alerts only.</Field.Description>
        <Field.Control render={<SliderControl defaultValue={70} />} />
      </Field.Root>
    </div>
  );
}
