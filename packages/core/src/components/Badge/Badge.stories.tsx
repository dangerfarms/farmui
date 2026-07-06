import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../index";

const meta = {
  title: "Data display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "filled",
    color: "primary",
    size: "md",
    radius: "full",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["filled", "light", "outline", "dot"],
    },
    color: {
      control: "inline-radio",
      options: ["primary", "gray", "danger", "warning", "info"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge {...args} variant="filled">
        Filled
      </Badge>
      <Badge {...args} variant="light">
        Light
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="dot">
        Dot
      </Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="gray">
        Gray
      </Badge>
      <Badge {...args} color="danger">
        Danger
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
      <Badge {...args} color="info">
        Info
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};
