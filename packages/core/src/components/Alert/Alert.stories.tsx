import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../../index";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "Heads up",
    children: "Your changes have been saved to the draft.",
    color: "info",
    variant: "light",
  },
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
    variant: {
      control: "inline-radio",
      options: ["light", "filled", "outline"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert {...args} color="info" title="Info">
        A neutral, informational message.
      </Alert>
      <Alert {...args} color="success" title="Success">
        Your payment went through.
      </Alert>
      <Alert {...args} color="warning" title="Warning">
        Your trial ends in three days.
      </Alert>
      <Alert {...args} color="danger" title="Error">
        We couldn&apos;t reach the server.
      </Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Alert {...args} variant="light" title="Light">
        A soft, tinted background.
      </Alert>
      <Alert {...args} variant="filled" title="Filled">
        A bold, solid background.
      </Alert>
      <Alert {...args} variant="outline" title="Outline">
        A bordered, transparent style.
      </Alert>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    color: "success",
    title: "Deployed",
    children: "Your site is live at farmui.dev.",
    icon: <span aria-hidden>✅</span>,
  },
};

export const MessageOnly: Story = {
  args: {
    title: undefined,
    children: "A concise, single-line notice with no heading.",
  },
};
