import type { ComponentDoc } from "@/docs/types";
import { PopoverDemo, PopoverFormDemo } from "./popover.client";

const doc: ComponentDoc = {
  slug: "popover",
  name: "Popover",
  category: "Overlays",
  description:
    "A click-triggered floating panel anchored to a trigger element.",
  importLine: `import { Popover } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Click the trigger to toggle the panel; click outside or press Escape to close.",
      code: `<Popover trigger={<Button>Toggle</Button>}>
  <p>This panel is anchored to the button.</p>
</Popover>`,
      render: () => <PopoverDemo />,
    },
    {
      title: "With form content",
      description:
        "Popovers can hold interactive content like inputs and buttons.",
      code: `<Popover trigger={<Button variant="light">Add product</Button>} width={260}>
  <form style={{ display: "grid", gap: "0.75rem" }}>
    <Input label="Name" placeholder="Wireless headphones" size="sm" />
    <Input label="Price" placeholder="49.00" size="sm" />
    <Button type="submit" size="sm" fullWidth>Save</Button>
  </form>
</Popover>`,
      render: () => <PopoverFormDemo />,
    },
  ],
  props: [
    {
      name: "trigger",
      type: "ReactElement",
      description:
        "Element that toggles the panel (gets aria-expanded / aria-haspopup wired on).",
    },
    {
      name: "position",
      type: `"bottom" | "top"`,
      default: `"bottom"`,
      description: "Which side the panel opens toward.",
    },
    {
      name: "width",
      type: "string | number",
      description:
        "Fixed panel width (any CSS length). Defaults to fit-content.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Content rendered inside the dropdown panel.",
    },
  ],
};

export default doc;
