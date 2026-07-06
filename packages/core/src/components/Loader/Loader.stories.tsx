import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "../../index";

const meta = {
  title: "Feedback/Loader",
  component: Loader,
  tags: ["autodocs"],
  args: {
    size: "md",
    color: "primary",
    variant: "spinner",
    label: "Loading",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    color: {
      control: "inline-radio",
      options: ["primary", "info", "success", "warning", "danger"],
    },
    variant: {
      control: "inline-radio",
      options: ["spinner", "dots", "bars"],
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Loader {...args} variant="spinner" label="Loading spinner" />
      <Loader {...args} variant="dots" label="Loading dots" />
      <Loader {...args} variant="bars" label="Loading bars" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Loader {...args} size="sm" label="Small loader" />
      <Loader {...args} size="md" label="Medium loader" />
      <Loader {...args} size="lg" label="Large loader" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Loader {...args} color="primary" label="Primary loader" />
      <Loader {...args} color="info" label="Info loader" />
      <Loader {...args} color="success" label="Success loader" />
      <Loader {...args} color="warning" label="Warning loader" />
      <Loader {...args} color="danger" label="Danger loader" />
    </div>
  ),
};
