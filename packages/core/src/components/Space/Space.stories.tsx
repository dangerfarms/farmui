import type { Meta, StoryObj } from "@storybook/react-vite";
import { Space } from "../../index";

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
  title: "Layout/Space",
  component: Space,
  tags: ["autodocs"],
  args: {
    h: "xl",
  },
  argTypes: {
    h: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    w: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Space>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <div>
      <Box>Above</Box>
      <Space {...args} />
      <Box>Below</Box>
    </div>
  ),
};

/** `h` adds vertical whitespace between stacked elements. */
export const Vertical: Story = {
  args: { h: "xl" },
  render: (args) => (
    <div>
      <Box>Above</Box>
      <Space {...args} />
      <Box>Below</Box>
    </div>
  ),
};

/** `w` adds horizontal whitespace between inline elements. */
export const Horizontal: Story = {
  args: { w: "xl" },
  render: (args) => (
    <div style={{ display: "flex" }}>
      <Box>Left</Box>
      <Space {...args} />
      <Box>Right</Box>
    </div>
  ),
};
