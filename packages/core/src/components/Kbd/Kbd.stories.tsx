import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "../../index";

const meta = {
  title: "Data display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: {
    children: "⌘",
    size: "md",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Kbd {...args} size="sm">
        Esc
      </Kbd>
      <Kbd {...args} size="md">
        Esc
      </Kbd>
      <Kbd {...args} size="lg">
        Esc
      </Kbd>
    </div>
  ),
};

export const Shortcut: Story = {
  render: (args) => (
    <p style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
      Press <Kbd {...args}>⌘</Kbd> + <Kbd {...args}>K</Kbd> to open search.
    </p>
  ),
};
