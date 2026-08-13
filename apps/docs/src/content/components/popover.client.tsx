"use client";

import { Button, Field, Input, Popover } from "@farmui/core";

export function PopoverDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger>Toggle</Popover.Trigger>
      <Popover.Popup>
        <Popover.Title>Anchored panel</Popover.Title>
        <Popover.Description>
          Rendered in the browser&apos;s top layer — click outside or press Escape to close.
        </Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}

export function PopoverLinkTriggerDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger render={<a href="#popover">A link as the trigger</a>} />
      <Popover.Popup>
        <Popover.Description>
          The Trigger&apos;s wiring merged onto the anchor — it opens the popover, and its own href
          still works for open-in-new-tab.
        </Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}

export function PopoverFormDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger>Add product</Popover.Trigger>
      <Popover.Popup>
        <form style={{ display: "grid", gap: "0.75rem" }} onSubmit={(e) => e.preventDefault()}>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input placeholder="Wireless headphones" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price</Field.Label>
            <Input inputMode="decimal" placeholder="49.00" />
          </Field.Root>
          <Button type="submit">Save</Button>
        </form>
      </Popover.Popup>
    </Popover.Root>
  );
}
