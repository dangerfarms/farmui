import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../index";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "I accept the terms and conditions",
    size: "md",
    indeterminate: false,
    disabled: false,
    defaultChecked: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox {...args} size="sm" label="Small" />
      <Checkbox {...args} size="md" label="Medium" />
      <Checkbox {...args} size="lg" label="Large" />
    </div>
  ),
};

export const Checked: Story = {
  args: { label: "Subscribe to the newsletter", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "We'll email you when something important happens.",
  },
};

export const WithError: Story = {
  args: {
    label: "I accept the terms and conditions",
    error: "You must accept the terms to continue.",
  },
};

export const Disabled: Story = {
  args: { label: "Unavailable option", disabled: true },
};
