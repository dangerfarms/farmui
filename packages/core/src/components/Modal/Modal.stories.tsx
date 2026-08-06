import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Group, Modal } from "../../index";

const meta = {
  title: "Overlays/Modal",
  component: Modal.Root,
  tags: ["autodocs"],
  render: () => (
    <Modal.Root>
      <Modal.Trigger>Invite a teammate</Modal.Trigger>
      <Modal.Popup>
        <Modal.Title>Invite a teammate</Modal.Title>
        <Modal.Description>
          They&apos;ll receive an email invitation to join your workspace.
        </Modal.Description>
        <Group>
          <Modal.Close style={{ "--fui-context": "primary" } as CSSProperties}>
            Send invite
          </Modal.Close>
          <Modal.Close>Cancel</Modal.Close>
        </Group>
      </Modal.Popup>
    </Modal.Root>
  ),
} satisfies Meta<typeof Modal.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Compose the dialog from parts. The Popup is a native `<dialog>` opened
 * with `showModal()` — top layer, backdrop, focus containment, Escape and
 * focus restore all come from the browser.
 */
export const Playground: Story = {};

/** Panel widths via the Popup's size prop. */
export const Sizes: Story = {
  render: () => (
    <Group>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Modal.Root key={size}>
          <Modal.Trigger>Open {size}</Modal.Trigger>
          <Modal.Popup size={size}>
            <Modal.Title>A {size} modal</Modal.Title>
            <Modal.Description>
              The panel width comes from the size prop.
            </Modal.Description>
            <Modal.Close>Close</Modal.Close>
          </Modal.Popup>
        </Modal.Root>
      ))}
    </Group>
  ),
};

/** A header row with an × close button — a composition pattern, not API. */
export const WithHeaderClose: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>Open settings</Modal.Trigger>
      <Modal.Popup>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBlockEnd: "var(--fui-space-sm)",
          }}
        >
          <Modal.Title style={{ margin: 0 }}>Settings</Modal.Title>
          <Modal.Close aria-label="Close">
            ×
          </Modal.Close>
        </div>
        <Modal.Description>Manage your workspace settings.</Modal.Description>
      </Modal.Popup>
    </Modal.Root>
  ),
};

/** Statically open (defaultOpen) — for visual/a11y review of the open state. */
export const OpenByDefault: Story = {
  render: () => (
    <Modal.Root defaultOpen>
      <Modal.Trigger>Invite a teammate</Modal.Trigger>
      <Modal.Popup>
        <Modal.Title>Invite a teammate</Modal.Title>
        <Modal.Description>
          Should sit centred over a dimmed backdrop.
        </Modal.Description>
        <Modal.Close>Close</Modal.Close>
      </Modal.Popup>
    </Modal.Root>
  ),
};

/**
 * Interaction test — real-browser coverage for the native behaviors jsdom
 * can't exercise: Escape closing and focus restoration to the trigger.
 */
export const OpensAndDismisses: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /invite a teammate/i });

    await userEvent.click(trigger);
    const dialog = document.querySelector("dialog")!;
    await expect(dialog.open).toBe(true);
    await expect(trigger).toHaveAttribute("data-popup-open", "true");

    // Native Escape handling closes and restores focus to the opener.
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(dialog.open).toBe(false));
    await waitFor(() =>
      expect(trigger).not.toHaveAttribute("data-popup-open"),
    );
    await expect(trigger).toHaveFocus();
  },
};
