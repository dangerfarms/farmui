import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Textarea } from "../../index";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Write your message…",
    rows: 3,
    disabled: false,
  },
  argTypes: {
    rows: { control: { type: "number", min: 1, max: 12 } },
  },
  render: (args) => (
    <Field.Root>
      <Field.Label>Message</Field.Label>
      <Textarea {...args} />
    </Field.Root>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Bio</Field.Label>
      <Field.Description>
        A short description shown on your public profile.
      </Field.Description>
      <Textarea placeholder="Tell us about yourself…" />
    </Field.Root>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Message</Field.Label>
      <Textarea placeholder="Write your message…" defaultValue="Too short" />
      <Field.Error>Message must be at least 20 characters.</Field.Error>
    </Field.Root>
  ),
};

export const Required: Story = {
  render: () => (
    <Field.Root>
      <Field.Label>Feedback</Field.Label>
      <Textarea required />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
