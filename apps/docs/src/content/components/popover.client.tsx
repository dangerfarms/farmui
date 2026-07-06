"use client";

import { Button, Input, Popover } from "@farmui/core";

export function PopoverDemo() {
  return (
    <Popover trigger={<Button>Toggle</Button>}>
      <p style={{ margin: 0 }}>
        This panel is anchored to the button and closes when you click outside
        or press Escape.
      </p>
    </Popover>
  );
}

export function PopoverFormDemo() {
  return (
    <Popover trigger={<Button variant="light">Add product</Button>} width={260}>
      <form
        style={{ display: "grid", gap: "0.75rem" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input label="Name" placeholder="Wireless headphones" size="sm" />
        <Input label="Price" placeholder="49.00" size="sm" />
        <Button type="submit" size="sm" fullWidth>
          Save
        </Button>
      </form>
    </Popover>
  );
}
