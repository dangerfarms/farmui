import type { Meta, StoryObj } from "@storybook/react-vite";
import { Center } from "../../index";

const Box = ({ children = "Box" }: { children?: React.ReactNode }) => (
  <div
    style={{
      background: "var(--fui-primary-soft)",
      color: "var(--fui-primary-hover)",
      padding: "1rem",
      borderRadius: "var(--fui-radius-md)",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Layout/Center",
  component: Center,
  tags: ["autodocs"],
  args: {
    inline: false,
  },
  argTypes: {
    inline: { control: "boolean" },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Center
      {...args}
      style={{ height: "12rem", background: "var(--fui-bg-subtle)" }}
    >
      <Box>Centered</Box>
    </Center>
  ),
};

/** Block Center fills its parent and centers the child on both axes. */
export const Block: Story = {
  render: (args) => (
    <Center
      {...args}
      style={{ height: "12rem", background: "var(--fui-bg-subtle)" }}
    >
      <Box>Centered in a tall box</Box>
    </Center>
  ),
};

/** `inline` shrinks the Center to its content (useful inline in text). */
export const Inline: Story = {
  args: { inline: true },
  render: (args) => (
    <Center
      {...args}
      style={{ background: "var(--fui-bg-subtle)", padding: "0.5rem" }}
    >
      <Box>Inline</Box>
    </Center>
  ),
};
