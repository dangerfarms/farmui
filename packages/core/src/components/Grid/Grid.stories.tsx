import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, type GridProps } from "../../index";

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

// `Grid` is a compound component whose merged type isn't exported, so we type
// the `component` field against the exported `GridProps` to keep `meta`'s
// declaration nameable. The runtime value is still the real `Grid`.
const GridForStory = Grid as React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLDivElement>
>;

const meta = {
  title: "Layout/Grid",
  component: GridForStory,
  tags: ["autodocs"],
  args: {
    columns: 12,
    gutter: "md",
  },
  argTypes: {
    columns: { control: { type: "number", min: 1, max: 12 } },
    gutter: {
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
} satisfies Meta<typeof GridForStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid.Col span={4}>
        <Box>span=4</Box>
      </Grid.Col>
      <Grid.Col span={4}>
        <Box>span=4</Box>
      </Grid.Col>
      <Grid.Col span={4}>
        <Box>span=4</Box>
      </Grid.Col>
    </Grid>
  ),
};

/** Column spans adapt to the Grid's own width via container queries. */
export const ResponsiveSpans: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid.Col span={12} md={6} lg={4}>
        <Box>span=12 md=6 lg=4</Box>
      </Grid.Col>
      <Grid.Col span={12} md={6} lg={4}>
        <Box>span=12 md=6 lg=4</Box>
      </Grid.Col>
      <Grid.Col span={12} md={12} lg={4}>
        <Box>span=12 md=12 lg=4</Box>
      </Grid.Col>
    </Grid>
  ),
};

export const AutoColumns: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid.Col span="auto">
        <Box>auto</Box>
      </Grid.Col>
      <Grid.Col span={6}>
        <Box>span=6</Box>
      </Grid.Col>
      <Grid.Col span="auto">
        <Box>auto</Box>
      </Grid.Col>
    </Grid>
  ),
};

export const MixedSpans: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid.Col span={8}>
        <Box>span=8</Box>
      </Grid.Col>
      <Grid.Col span={4}>
        <Box>span=4</Box>
      </Grid.Col>
      <Grid.Col span={3}>
        <Box>span=3</Box>
      </Grid.Col>
      <Grid.Col span={9}>
        <Box>span=9</Box>
      </Grid.Col>
    </Grid>
  ),
};
