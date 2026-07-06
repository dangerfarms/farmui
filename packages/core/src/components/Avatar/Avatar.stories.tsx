import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup } from "../../index";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Ada Lovelace",
    size: "md",
    radius: "full",
    color: "primary",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    color: {
      control: "inline-radio",
      options: ["primary", "gray", "danger", "warning", "info"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Image: Story = {
  args: {
    src: "https://i.pravatar.cc/96?img=5",
    alt: "Grace Hopper",
    name: "Grace Hopper",
  },
};

export const Initials: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Grace Hopper" color="info" />
      <Avatar {...args} name="Alan Turing" color="danger" />
    </div>
  ),
};

export const Fallback: Story = {
  args: { name: undefined, alt: "Unknown user" },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size={64} />
    </div>
  ),
};

export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      <Avatar {...args} name="Ada Lovelace" />
      <Avatar {...args} name="Grace Hopper" color="info" />
      <Avatar {...args} name="Alan Turing" color="danger" />
      <Avatar {...args} name="Katherine Johnson" color="warning" />
      <Avatar {...args} name="+3 more" color="gray" />
    </AvatarGroup>
  ),
};
