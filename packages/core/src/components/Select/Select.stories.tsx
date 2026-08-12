import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../../index";

const frameworkOptions = (
  <>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
    <option value="solid">Solid</option>
  </>
);

const meta = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Framework",
    placeholder: "Pick one",
    children: frameworkOptions,
    disabled: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Grouped: Story = {
  render: (args) => (
    <Select {...args} label="Instrument" placeholder="Pick one">
      <optgroup label="Strings">
        <option>Violin</option>
        <option>Cello</option>
      </optgroup>
      <optgroup label="Brass">
        <option>Trumpet</option>
        <option disabled>Tuba (unavailable)</option>
      </optgroup>
    </Select>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Framework",
    description: "You can change this later in settings.",
  },
};

export const WithError: Story = {
  args: {
    label: "Framework",
    error: "Select a framework",
  },
};

export const Required: Story = {
  args: { label: "Framework", required: true },
};

export const Disabled: Story = {
  args: { label: "Framework", defaultValue: "react", disabled: true },
};
