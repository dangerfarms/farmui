import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../../index";

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
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: {
    gap: "md",
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
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
      {(["xs", "md", "xl"] as const).map((gap) => (
        <Stack key={gap} gap={gap}>
          <Box>gap={gap}</Box>
          <Box>gap={gap}</Box>
          <Box>gap={gap}</Box>
        </Stack>
      ))}
    </div>
  ),
};

export const Aligned: Story = {
  args: { align: "center" },
  render: (args) => (
    <Stack {...args}>
      <Box>short</Box>
      <Box>a wider box</Box>
      <Box>an even wider box here</Box>
    </Stack>
  ),
};
