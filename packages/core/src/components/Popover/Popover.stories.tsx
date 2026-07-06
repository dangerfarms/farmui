import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button, Popover } from "../../index";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    position: "bottom",
    width: 240,
    trigger: <Button variant="light">Open popover</Button>,
    children: (
      <div style={{ padding: "0.5rem" }}>
        <p style={{ margin: "0 0 0.5rem" }}>
          A floating panel anchored to its trigger.
        </p>
        <p style={{ margin: 0 }}>Click outside or press Escape to dismiss.</p>
      </div>
    ),
  },
  argTypes: {
    position: { control: "inline-radio", options: ["bottom", "top"] },
    width: { control: "text" },
    trigger: { control: false },
    children: { control: false },
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
      <Popover {...args} />
    </div>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — click the trigger to reveal the panel, then tweak Controls. */
export const Playground: Story = {};

/** The panel can open toward the bottom (default) or the top of its trigger. */
export const Positions: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "3rem",
        justifyContent: "center",
        padding: "5rem 3rem",
      }}
    >
      <Popover
        {...args}
        position="bottom"
        trigger={<Button variant="light">Opens down</Button>}
      >
        <div style={{ padding: "0.5rem" }}>Anchored below the trigger.</div>
      </Popover>
      <Popover
        {...args}
        position="top"
        trigger={<Button variant="light">Opens up</Button>}
      >
        <div style={{ padding: "0.5rem" }}>Anchored above the trigger.</div>
      </Popover>
    </div>
  ),
};

/** A richer panel — for example, a small menu of actions. */
export const WithMenu: Story = {
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
      <Popover {...args} trigger={<Button variant="light">Actions</Button>}>
        <ul style={{ listStyle: "none", margin: 0, padding: "0.25rem" }}>
          <li>
            <Button variant="subtle" fullWidth>
              Edit
            </Button>
          </li>
          <li>
            <Button variant="subtle" fullWidth>
              Duplicate
            </Button>
          </li>
          <li>
            <Button variant="subtle" color="danger" fullWidth>
              Delete
            </Button>
          </li>
        </ul>
      </Popover>
    </div>
  ),
};

/**
 * Interaction test: clicking the trigger toggles the panel open and wires up
 * `aria-expanded`; an outside click dismisses it. The trigger is anchored in
 * the story canvas, so we query it there, but assert the panel is present in
 * the document.
 */
export const TogglesAndClosesOnOutsideClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /open popover/i });

    // Closed initially.
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(
      body.queryByText(/a floating panel anchored to its trigger/i),
    ).toBeNull();

    // Click opens the panel.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      await body.findByText(/a floating panel anchored to its trigger/i),
    ).toBeInTheDocument();

    // Clicking outside (on the document body) closes it.
    await userEvent.click(document.body);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(
      body.queryByText(/a floating panel anchored to its trigger/i),
    ).toBeNull();
  },
};
