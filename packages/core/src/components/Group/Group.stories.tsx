import type { Meta, StoryObj } from "@storybook/react-vite";
import { Group } from "../../index";

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
  title: "Layout/Group",
  component: Group,
  tags: ["autodocs"],
  args: {
    gap: "md",
    align: "center",
    wrap: true,
    grow: false,
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: { control: "boolean" },
    grow: { control: "boolean" },
  },
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Group {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Group>
  ),
};

/** `grow` makes every child expand to fill the row equally. */
export const Grow: Story = {
  args: { grow: true },
  render: (args) => (
    <Group {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Group>
  ),
};

export const Justified: Story = {
  args: { justify: "between" },
  render: (args) => (
    <Group {...args}>
      <Box>left</Box>
      <Box>middle</Box>
      <Box>right</Box>
    </Group>
  ),
};
