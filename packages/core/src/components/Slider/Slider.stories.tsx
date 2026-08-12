import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../../index";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    label: "Irrigation level",
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Steps: Story = {
  args: { label: "Field count", min: 0, max: 10, step: 2, defaultValue: 4 },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 70 },
};
