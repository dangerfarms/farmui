import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button, Tooltip } from "../../index";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    label: "Saves your changes",
    position: "top",
    withArrow: false,
    children: <Button variant="light">Hover or focus me</Button>,
  },
  argTypes: {
    label: { control: "text" },
    position: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    withArrow: { control: "boolean" },
    children: { control: false },
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak the label, position, and arrow in the Controls panel. */
export const Playground: Story = {};

/** The tooltip can point at any of the four sides of its target. */
export const Positions: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "2.5rem",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "3rem",
      }}
    >
      <Tooltip {...args} position="top" label="Top">
        <Button variant="light">Top</Button>
      </Tooltip>
      <Tooltip {...args} position="bottom" label="Bottom">
        <Button variant="light">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} position="left" label="Left">
        <Button variant="light">Left</Button>
      </Tooltip>
      <Tooltip {...args} position="right" label="Right">
        <Button variant="light">Right</Button>
      </Tooltip>
    </div>
  ),
};

/** Add a small pointer arrow toward the target with `withArrow`. */
export const WithArrow: Story = {
  args: { withArrow: true, label: "Now with a pointer" },
};

/**
 * Interaction test: the tooltip is revealed on hover and on keyboard focus,
 * and the target is linked to it via `aria-describedby` while open.
 */
export const RevealsOnHoverAndFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /hover or focus me/i });
    const tooltip = canvas.getByRole("tooltip");

    // Hidden (data-open unset) and not yet described before interaction.
    await expect(tooltip).not.toHaveAttribute("data-open");
    await expect(trigger).not.toHaveAttribute("aria-describedby");

    // Hover reveals the tooltip and wires up aria-describedby.
    await userEvent.hover(trigger);
    await expect(tooltip).toHaveAttribute("data-open", "true");
    await expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    // Moving the pointer away hides it again.
    await userEvent.unhover(trigger);
    await expect(tooltip).not.toHaveAttribute("data-open");

    // Keyboard focus also reveals it (accessible for non-pointer users).
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await expect(tooltip).toHaveAttribute("data-open", "true");
    await expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  },
};
