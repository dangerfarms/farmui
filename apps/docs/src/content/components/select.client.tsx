"use client";

import { Field, SelectControl } from "@farmui/core";

export function SelectFieldDemo() {
  return (
    <div style={{ maxInlineSize: "20rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Field.Description>Where you are resident for tax.</Field.Description>
        <Field.Control
          render={
            <SelectControl>
              <option>United States</option>
              <option>Canada</option>
            </SelectControl>
          }
        />
      </Field.Root>
    </div>
  );
}
