import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../index";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    label: "Message",
    placeholder: "Write your message…",
    size: "md",
    radius: "md",
    rows: 3,
    disabled: false,
    withAsterisk: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    rows: { control: { type: "number", min: 1, max: 12 } },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    description: "A short description shown on your public profile.",
    placeholder: "Tell us about yourself…",
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message…",
    error: "Message must be at least 20 characters.",
    defaultValue: "Too short",
  },
};

export const Required: Story = {
  args: { label: "Feedback", withAsterisk: true },
};

export const Disabled: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message…",
    disabled: true,
  },
};
