"use client";

import { useState } from "react";
import { Field, Slider, SliderControl } from "@farmui/core";

export function SliderValueDemo() {
  const [volume, setVolume] = useState(70);
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Slider
        label={`Volume: ${volume}`}
        value={volume}
        onChange={(e) => setVolume(e.target.valueAsNumber)}
      />
    </div>
  );
}

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
