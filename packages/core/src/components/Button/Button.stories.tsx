import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../index";

const meta = {
  title: "Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "filled",
    size: "md",
    color: "primary",
    radius: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["filled", "light", "outline", "subtle"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: { control: "inline-radio", options: ["primary", "danger"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="light">
        Light
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="subtle">
        Subtle
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Loading: Story = { args: { loading: true, children: "Saving" } };
