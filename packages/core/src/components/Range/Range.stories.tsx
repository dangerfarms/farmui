import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, Range } from "../../index";

const meta = {
  title: "Inputs/Range",
  component: Range,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    disabled: false,
  },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <Field.Root>
      <Field.Label>Irrigation level</Field.Label>
      <Range {...args} />
    </Field.Root>
  ),
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Steps: Story = {
  args: { min: 0, max: 10, step: 2, defaultValue: 4 },
  render: (args) => (
    <Field.Root>
      <Field.Label>Field count</Field.Label>
      <Range {...args} />
    </Field.Root>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 70 },
};
