import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../../index";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "Enable irrigation",
    labelPosition: "end",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["start", "end"] },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Switch {...args} labelPosition="end" label="Label after control" />
      <Switch {...args} labelPosition="start" label="Label before control" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Auto-renew",
    description: "Charges the card on file at the end of each cycle.",
  },
};

export const WithError: Story = {
  args: {
    label: "Two-factor authentication",
    error: "Two-factor authentication must be on for admin accounts",
  },
};

export const Required: Story = {
  args: { label: "Accept audit logging", required: true },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Switch {...args} label="Off" defaultChecked={false} />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled off" disabled defaultChecked={false} />
      <Switch {...args} label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
