import type { Meta, StoryObj } from "@storybook/react-vite";
import { SimpleGrid } from "../../index";

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
  title: "Layout/SimpleGrid",
  component: SimpleGrid,
  tags: ["autodocs"],
  args: {
    cols: 3,
    gap: "md",
  },
  argTypes: {
    cols: { control: { type: "number", min: 1, max: 6 } },
    minChildWidth: { control: "text" },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <SimpleGrid {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </SimpleGrid>
  ),
};

/** A fixed number of equal-width columns. */
export const FixedColumns: Story = {
  args: { cols: 4 },
  render: (args) => (
    <SimpleGrid {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
      <Box>7</Box>
      <Box>8</Box>
    </SimpleGrid>
  ),
};

/**
 * With `minChildWidth` the grid is intrinsically responsive — columns wrap
 * automatically with no breakpoints. Resize the viewport to see it reflow.
 */
export const IntrinsicResponsive: Story = {
  args: { minChildWidth: "12rem" },
  render: (args) => (
    <SimpleGrid {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </SimpleGrid>
  ),
};
