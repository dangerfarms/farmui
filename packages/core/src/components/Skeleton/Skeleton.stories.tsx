import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../index";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    width: "100%",
    height: "1rem",
    circle: false,
    visible: true,
  },
  argTypes: {
    circle: { control: "boolean" },
    visible: { control: "boolean" },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ maxInlineSize: "20rem" }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const TextLines: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxInlineSize: "20rem",
      }}
    >
      <Skeleton {...args} height="1rem" width="100%" />
      <Skeleton {...args} height="1rem" width="90%" />
      <Skeleton {...args} height="1rem" width="75%" />
    </div>
  ),
};

export const Circle: Story = {
  args: { circle: true, width: "3rem" },
};

export const Card: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        maxInlineSize: "20rem",
      }}
    >
      <Skeleton {...args} circle width="3rem" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flex: 1,
        }}
      >
        <Skeleton {...args} height="0.875rem" width="60%" />
        <Skeleton {...args} height="0.875rem" width="100%" />
      </div>
    </div>
  ),
};

export const RevealsContent: Story = {
  args: {
    visible: false,
    children: <span>Loaded content is now visible.</span>,
  },
};
