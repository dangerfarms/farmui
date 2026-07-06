import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../index";

const meta = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "you@example.com",
    size: "md",
    radius: "md",
    disabled: false,
    withAsterisk: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Username",
    description: "This is how your name appears to others.",
    placeholder: "jane_doe",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address.",
    defaultValue: "not-an-email",
  },
};

export const Required: Story = {
  args: { label: "Full name", withAsterisk: true, placeholder: "Jane Doe" },
};

export const Disabled: Story = {
  args: { label: "Email", placeholder: "you@example.com", disabled: true },
};
