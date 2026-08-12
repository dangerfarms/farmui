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
    radius: "md",
    disabled: false,
    withAsterisk: false,
  },
  argTypes: {
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
    error: "Select a framework",
  },
};

export const Required: Story = {
  args: { label: "Framework", withAsterisk: true },
};

export const Disabled: Story = {
  args: { label: "Framework", defaultValue: "react", disabled: true },
};
