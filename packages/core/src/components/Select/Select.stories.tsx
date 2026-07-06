import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../../index";

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const meta = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Framework",
    placeholder: "Pick one",
    data: FRAMEWORKS,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </div>
  ),
};

export const StringData: Story = {
  args: {
    label: "Fruit",
    placeholder: "Pick a fruit",
    data: ["Apple", "Banana", "Cherry"],
  },
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
    error: "Please choose a framework.",
  },
};

export const Required: Story = {
  args: { label: "Framework", withAsterisk: true },
};

export const Disabled: Story = {
  args: { label: "Framework", defaultValue: "react", disabled: true },
};
