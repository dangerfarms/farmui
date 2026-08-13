"use client";

import { useState } from "react";
import { Field, Slider } from "@farmui/core";

export function SliderFieldDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Volume</Field.Label>
        <Field.Description>Applies to alerts only.</Field.Description>
        <Slider defaultValue={70} />
      </Field.Root>
    </div>
  );
}

export function SliderStepsDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Fertiliser (kg)</Field.Label>
        <Slider min={0} max={100} step={10} defaultValue={30} />
      </Field.Root>
    </div>
  );
}

export function SliderDisabledDemo() {
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Locked</Field.Label>
        <Slider defaultValue={50} disabled />
      </Field.Root>
    </div>
  );
}

export function SliderValueDemo() {
  const [volume, setVolume] = useState(70);
  return (
    <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
      <Field.Root>
        <Field.Label>Volume: {volume}</Field.Label>
        <Slider
          value={volume}
          onChange={(e) => setVolume(e.target.valueAsNumber)}
        />
      </Field.Root>
    </div>
  );
}
