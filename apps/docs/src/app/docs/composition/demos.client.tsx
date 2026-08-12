"use client";

import { Popover } from "@farmui/core";

export function StateAttrDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger>Try it — watch this button while open</Popover.Trigger>
      <Popover.Popup>
        <Popover.Description>
          The trigger now carries <code>data-popup-open</code>.
        </Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}
