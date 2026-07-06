import type { ComponentDoc } from "@/docs/types";
import { ModalDemo, ModalSizesDemo } from "./modal.client";

const doc: ComponentDoc = {
  slug: "modal",
  name: "Modal",
  category: "Overlays",
  description:
    "A controlled, focus-trapping dialog rendered in a portal over the page.",
  importLine: `import { Modal } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Control visibility with opened and onClose. Closes on overlay click and Escape.",
      code: `const [opened, setOpened] = useState(false);

<Button onClick={() => setOpened(true)}>Open modal</Button>
<Modal opened={opened} onClose={() => setOpened(false)} title="Order confirmed">
  <p>Your order is on its way.</p>
  <Button onClick={() => setOpened(false)}>Got it</Button>
</Modal>`,
      render: () => <ModalDemo />,
    },
    {
      title: "Sizes",
      description: "Three panel widths via the size prop.",
      code: `<Modal opened={opened} onClose={close} title="Small modal" size="sm">…</Modal>
<Modal opened={opened} onClose={close} title="Medium modal" size="md">…</Modal>
<Modal opened={opened} onClose={close} title="Large modal" size="lg">…</Modal>`,
      render: () => <ModalSizesDemo />,
    },
  ],
  props: [
    {
      name: "opened",
      type: "boolean",
      description: "Whether the modal is visible.",
    },
    {
      name: "onClose",
      type: "() => void",
      description:
        "Called when the user requests to close (overlay, Escape, close button).",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Heading rendered in the modal header.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Panel width.",
    },
    {
      name: "withCloseButton",
      type: "boolean",
      default: "true",
      description: "Render the header close (×) button.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Body content of the dialog.",
    },
  ],
};

export default doc;
