import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup } from "../../index";

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Ada Lovelace",
    size: "md",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Image: Story = {
  args: {
    src: "https://i.pravatar.cc/96?img=5",
    alt: "Grace Hopper",
    name: "Grace Hopper",
  },
};

/**
 * The initials background answers the surrounding `--fui-context` region;
 * there is no color prop.
 */
export const Contexts: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Avatar {...args} name="Ada Lovelace" />
      <span style={{ "--fui-context": "info" } as CSSProperties}>
        <Avatar {...args} name="Grace Hopper" />
      </span>
      <span style={{ "--fui-context": "danger" } as CSSProperties}>
        <Avatar {...args} name="Alan Turing" />
      </span>
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
      <Avatar {...args} name="Grace Hopper" />
      <Avatar {...args} name="Alan Turing" />
      <Avatar {...args} name="Katherine Johnson" />
      <Avatar {...args} name="+3 more" />
    </AvatarGroup>
  ),
};
