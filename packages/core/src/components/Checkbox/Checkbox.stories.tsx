import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Field } from "../../index";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "I accept the terms and conditions",
    indeterminate: false,
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { label: "Subscribe to the newsletter", defaultChecked: true },
};

export const Required: Story = {
  args: { label: "Accept the terms", required: true },
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
  render: (args) => (
    <Field.Root>
      <Checkbox {...args} label="I accept the terms and conditions" />
      <Field.Error>You must accept the terms to continue.</Field.Error>
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { label: "Unavailable option", disabled: true },
};
