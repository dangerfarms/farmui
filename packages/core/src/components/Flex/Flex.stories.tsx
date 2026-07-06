import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../../index";

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
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  args: {
    direction: "row",
    gap: "md",
    wrap: "nowrap",
  },
  argTypes: {
    direction: {
      control: "inline-radio",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
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
    wrap: {
      control: "inline-radio",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Flex {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const Column: Story = {
  args: { direction: "column" },
  render: (args) => (
    <Flex {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const Wrap: Story = {
  args: { wrap: "wrap", gap: "sm" },
  render: (args) => (
    <Flex {...args} style={{ maxWidth: "20rem" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>{i + 1}</Box>
      ))}
    </Flex>
  ),
};
