import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Button, Modal } from "../../index";
import type { ModalProps } from "../../index";

/**
 * The Modal is controlled — it has no uncontrolled mode. This wrapper holds the
 * `opened` state and wires a button to open it, so the story is interactive.
 */
function ModalDemo({
  title = "Invite a teammate",
  size,
  withCloseButton,
  children,
}: Partial<ModalProps>) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open modal</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        size={size}
        withCloseButton={withCloseButton}
      >
        {children ?? (
          <>
            <p style={{ marginTop: 0 }}>
              Send an invitation and they&apos;ll get access to this workspace.
            </p>
            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}
            >
              <Button onClick={() => setOpened(false)}>Send invite</Button>
              <Button variant="subtle" onClick={() => setOpened(false)}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    // `opened`/`onClose` are owned by the ModalDemo wrapper's local state; these
    // satisfy the required props for the type but the render below ignores them.
    opened: false,
    onClose: () => {},
    title: "Invite a teammate",
    size: "md",
    withCloseButton: true,
  },
  argTypes: {
    title: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    withCloseButton: { control: "boolean" },
    opened: { control: false },
    onClose: { control: false },
  },
  render: (args) => (
    <ModalDemo
      title={args.title}
      size={args.size}
      withCloseButton={args.withCloseButton}
    />
  ),
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — click the button to open, then tweak props in Controls. */
export const Playground: Story = {};

/** Panels come in three widths via the `size` prop. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <ModalDemo title="Small dialog" size="sm" />
      <ModalDemo title="Medium dialog" size="md" />
      <ModalDemo title="Large dialog" size="lg" />
    </div>
  ),
};

/** Hide the header close (×) button; the modal still closes on Escape or overlay click. */
export const WithoutCloseButton: Story = {
  render: () => <ModalDemo title="No close button" withCloseButton={false} />,
};

/**
 * Interaction test: clicking the trigger opens the dialog (portalled to
 * `document.body`), and the close button dismisses it. Because the Modal
 * renders through a portal, we query `document.body`, not the story canvas.
 */
export const OpensAndCloses: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // No dialog before opening.
    await expect(body.queryByRole("dialog")).toBeNull();

    // Open it.
    await userEvent.click(canvas.getByRole("button", { name: /open modal/i }));

    const dialog = await body.findByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(
      body.getByRole("heading", { name: /invite a teammate/i }),
    ).toBeInTheDocument();

    // Close via the header × button.
    await userEvent.click(body.getByRole("button", { name: /close/i }));
    await expect(body.queryByRole("dialog")).toBeNull();
  },
};
