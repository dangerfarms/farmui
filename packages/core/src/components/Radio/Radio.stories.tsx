import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "../../index";

const data = [
  { value: "wheat", label: "Wheat" },
  { value: "barley", label: "Barley" },
  { value: "oats", label: "Oats" },
];

const meta = {
  title: "Inputs/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    label: "Crop",
    description: "Choose the primary crop for this field.",
    data,
    defaultValue: "wheat",
    size: "md",
    orientation: "vertical",
    withAsterisk: false,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    withAsterisk: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const WithError: Story = {
  args: {
    error: "Please choose a crop.",
    withAsterisk: true,
    defaultValue: undefined,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <RadioGroup {...args} label="Small" size="sm" />
      <RadioGroup {...args} label="Medium" size="md" />
      <RadioGroup {...args} label="Large" size="lg" />
    </div>
  ),
};

/** Compose the group from `<Radio>` children instead of a `data` array. */
export const WithChildren: Story = {
  args: { data: undefined },
  render: (args) => (
    <RadioGroup {...args} label="Field status" defaultValue="active">
      <Radio value="active" label="Active" />
      <Radio value="fallow" label="Fallow" description="Resting this season" />
      <Radio value="retired" label="Retired" disabled />
    </RadioGroup>
  ),
};
