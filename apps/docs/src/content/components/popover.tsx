import type { ComponentContent } from "@/renderer/types";
import {
  PopoverDemo,
  PopoverFormDemo,
  PopoverLinkTriggerDemo,
} from "./popover.client";

const doc: ComponentContent = {
  slug: "popover",
  lead: "A click-triggered floating panel, composed from parts and rendered in the browser's top layer via the native popover attribute.",
  importLine: `import { Popover } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Compose the panel from parts. In browsers with the popover attribute and anchor positioning, the top layer, light dismiss and Escape come from the browser — no z-index, no portal, no document listeners; elsewhere a lean wrapper-anchored fallback re-implements the same behavior.",
      code: `<Popover.Root>
  <Popover.Trigger>Toggle</Popover.Trigger>
  <Popover.Popup>
    <Popover.Title>Anchored panel</Popover.Title>
    <Popover.Description>
      Rendered in the browser's top layer — click outside or press Escape to close.
    </Popover.Description>
  </Popover.Popup>
</Popover.Root>`,
      render: () => <PopoverDemo />,
    },
    {
      title: "With form content",
      description:
        "Popovers can hold interactive content. Compose freely — parts can be reordered, styled, or omitted.",
      code: `<Popover.Root>
  <Popover.Trigger>Add product</Popover.Trigger>
  <Popover.Popup>
    <form>
      <Input label="Name" placeholder="Wireless headphones" />
      <Input label="Price" placeholder="49.00" />
      <Button type="submit">Save</Button>
    </form>
  </Popover.Popup>
</Popover.Root>`,
      render: () => <PopoverFormDemo />,
    },
    {
      title: "Substituting the trigger element",
      description:
        "The built-in trigger is a FarmUI Button. To use a different element, pass it via render — the wiring (popovertarget, aria-expanded, anchor name) merges onto it. See the Composition guide for the full contract.",
      code: `<Popover.Root>
  <Popover.Trigger render={<a href="#popover" />}>
    A link as the trigger
  </Popover.Trigger>
  <Popover.Popup>…</Popover.Popup>
</Popover.Root>`,
      render: () => <PopoverLinkTriggerDemo />,
    },
  ],
  whenToUse: [
    "For small, contextual panels of supplementary content or actions anchored to a trigger — filters, quick settings, action menus.",
    "When the user should be able to dismiss casually (click away) without losing surrounding page context.",
  ],
  whenNotToUse: [
    "For blocking, must-complete tasks or destructive confirmations — use Modal, which traps focus.",
    "For a short text label describing a control — use Tooltip.",
    "For disclosure of inline page content — use the native <details> element via Accordion, or plain layout.",
  ],
  accessibility: [
    "Where the popover attribute and anchor positioning are both supported, the browser provides top-layer rendering, light dismiss and Escape; other browsers get a wrapper-anchored fallback with the same behavior re-implemented in a few lines of JS — a deliberate no-polyfill, progressive-enhancement trade-off (see the browser support policy in CONTRIBUTING).",
    "Dialog semantics match what aria-haspopup=\"dialog\" promises screen-reader users: opening moves focus into the panel and closing returns it to the trigger.",
    "Trigger is a real <button> with aria-expanded; Popover.Title and Popover.Description automatically label the dialog via aria-labelledby / aria-describedby.",
    "Collision handling uses position-try flipping at viewport edges in supporting browsers; the fallback keeps the requested side.",
  ],
  props: [
    {
      name: "Root",
      type: "open?, defaultOpen?, onOpenChange?",
      description:
        "Groups the parts and owns open state (controlled or uncontrolled). Renders an inline wrapper used by the fallback positioning.",
    },
    {
      name: "Trigger",
      type: "render?: element | (props) => node",
      description:
        "Renders a FarmUI Button wired as the popup's invoker (popovertarget, aria-expanded, anchor name); it adapts to context like any Button. Substitute any element via render (e.g. render={<a href=…/>}).",
    },
    {
      name: "Popup",
      type: `position?: "bottom" | "top"`,
      description:
        "The floating panel (role=dialog, popover attribute). position picks the side it opens toward.",
    },
    {
      name: "Title / Description",
      type: "heading / paragraph props",
      description:
        "Optional parts that label and describe the popup for assistive technology.",
    },
    {
      name: "Close",
      type: "button props",
      description: "A button that closes the popup from inside.",
    },
  ],
};

export default doc;
