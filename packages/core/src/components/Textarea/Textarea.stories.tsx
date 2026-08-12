import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../index";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    label: "Message",
    placeholder: "Write your message…",
    radius: "md",
    rows: 3,
    disabled: false,
    withAsterisk: false,
  },
  argTypes: {
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    rows: { control: { type: "number", min: 1, max: 12 } },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
