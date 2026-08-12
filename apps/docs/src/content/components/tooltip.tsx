import type { ComponentContent } from "@/renderer/types";
import { TooltipArrow, TooltipGroup, TooltipPositions } from "./tooltip.client";

const doc: ComponentContent = {
  slug: "tooltip",
  lead: "A small floating label revealed on hover and keyboard focus, composed from parts.",
  importLine: `import { Tooltip } from "@farmui/core";`,
  demos: [
    {
      title: "Positions",
      description:
        "Place the bubble on any side of its target with the Popup's position prop. It opens after a short delay on hover, immediately on keyboard focus.",
      code: `<Tooltip.Root>
  <Tooltip.Trigger>Top</Tooltip.Trigger>
  <Tooltip.Popup position="top">On the top</Tooltip.Popup>
</Tooltip.Root>`,
      render: () => <TooltipPositions />,
    },
    {
      title: "With arrow",
      description: "Compose Tooltip.Arrow inside the Popup for a pointer.",
      code: `<Tooltip.Root>
  <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
  <Tooltip.Popup>
    Saved just now <Tooltip.Arrow />
  </Tooltip.Popup>
</Tooltip.Root>`,
      render: () => <TooltipArrow />,
    },
    {
      title: "Grouped with a Provider",
      description:
        "Tooltip.Provider shares the hover delay across a group: after the first bubble opens, moving between adjacent triggers reveals instantly.",
      code: `<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Cut</Tooltip.Trigger>
    <Tooltip.Popup>Cut the selection</Tooltip.Popup>
  </Tooltip.Root>
  {/* …adjacent tooltips share the delay… */}
</Tooltip.Provider>`,
      render: () => <TooltipGroup />,
    },
  ],
  whenToUse: [
    "To label icon-only buttons or clarify what a control does — short, redundant, visual-only text.",
    "To expand an abbreviation or term in place for pointer and keyboard users.",
  ],
  whenNotToUse: [
    "For information the user needs in order to proceed — hover does not exist on touch devices, so essential content must be visible in the page (Polaris/GOV.UK guidance).",
    "For interactive content (links, buttons) — use Popover, which is click-invoked and keyboard-operable.",
    "As a replacement for a visible label on a form field — use Field.Label.",
  ],
  accessibility: [
    "The trigger is permanently linked to the bubble via aria-describedby, so screen readers announce the text with the control whether or not it is visually shown.",
    "Escape dismisses the bubble without moving pointer or focus, the bubble stays open while hovered, and it persists until hover/focus leaves — the three requirements of WCAG 1.4.13 (Content on Hover or Focus).",
    "Opens immediately on visible (keyboard) focus with no hover delay; hover-open and tap-focus-open are both suppressed for touch pointers, where hover does not exist.",
    "Hover and keyboard focus are tracked independently, so a pointer passing over a focused trigger cannot steal the bubble away.",
    "Rendered with the native popover attribute (hint where the browser supports it, detected explicitly) and CSS anchor positioning where supported, with a wrapper-anchored fallback elsewhere — no polyfills, per the browser support policy.",
  ],
  props: [
    {
      name: "Provider",
      type: "delay?: number",
      description:
        "Optional. Shares one hover delay (default 600ms) across a group, with instant opens between adjacent triggers.",
    },
    {
      name: "Root",
      type: "delay?, open?, defaultOpen?, onOpenChange?",
      description:
        "Groups the parts and owns open state, timers, and Escape handling.",
    },
    {
      name: "Trigger",
      type: "button props · render?: element | (props) => node",
      description:
        "Renders a FarmUI Button wired with hover/focus handlers and aria-describedby — style it directly, or substitute your own element via render.",
    },
    {
      name: "Popup",
      type: `position?: "top" | "bottom" | "left" | "right"`,
      description: "The bubble (role=tooltip). position picks the side.",
    },
    {
      name: "Arrow",
      type: "span props",
      description: "Optional pointer arrow toward the trigger.",
    },
  ],
};

export default doc;
