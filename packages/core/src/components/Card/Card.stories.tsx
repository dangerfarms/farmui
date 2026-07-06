import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../index";

const meta = {
  title: "Data display/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    padding: "md",
    radius: "lg",
    shadow: "none",
    withBorder: true,
  },
  argTypes: {
    padding: { control: "inline-radio", options: ["sm", "md", "lg"] },
    radius: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    shadow: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
    },
    withBorder: { control: "boolean" },
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: "20rem" }}>
      <h3 style={{ margin: "0 0 0.5rem" }}>North Field</h3>
      <p style={{ margin: 0, color: "var(--fui-color-text-muted)" }}>
        42 hectares of winter wheat, sown last October and on track for an
        early-August harvest.
      </p>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Shadows: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      {(["none", "sm", "md", "lg"] as const).map((shadow) => (
        <Card
          {...args}
          key={shadow}
          shadow={shadow}
          withBorder={false}
          style={{ width: "10rem" }}
        >
          shadow: {shadow}
        </Card>
      ))}
    </div>
  ),
};

export const Padding: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
      {(["sm", "md", "lg"] as const).map((padding) => (
        <Card
          {...args}
          key={padding}
          padding={padding}
          withBorder
          style={{ width: "10rem" }}
        >
          padding: {padding}
        </Card>
      ))}
    </div>
  ),
};
