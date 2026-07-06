import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../../index";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    "aria-label": "Upload progress",
    value: 60,
    color: "primary",
    size: "md",
    radius: "full",
    striped: false,
    animated: false,
    label: false,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    color: {
      control: "inline-radio",
      options: ["primary", "info", "success", "warning", "danger"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Progress {...args} aria-label="Primary progress" color="primary" />
      <Progress {...args} aria-label="Info progress" color="info" />
      <Progress {...args} aria-label="Success progress" color="success" />
      <Progress {...args} aria-label="Warning progress" color="warning" />
      <Progress {...args} aria-label="Danger progress" color="danger" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Progress {...args} aria-label="Small progress" size="sm" />
      <Progress {...args} aria-label="Medium progress" size="md" />
      <Progress {...args} aria-label="Large progress" size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { value: 72, label: true },
};

export const Striped: Story = {
  args: { value: 45, striped: true, animated: true },
};
