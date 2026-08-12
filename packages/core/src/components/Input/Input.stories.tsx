import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../index";

const meta = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    placeholder: "you@example.com",
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

/**
 * There is no size prop: padding and font are fluid container-relative
 * tokens, so the control adapts to the space it lives in — and always
 * height-aligns with Button, which shares the same derived anatomy.
 */
export const FluidSizing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "16rem",
          padding: "1rem",
          border: "1px dashed var(--fui-border)",
        }}
      >
        <Input label="In a narrow container" placeholder="you@example.com" />
      </div>
      <div
        style={{
          containerType: "inline-size",
          inlineSize: "32rem",
          padding: "1rem",
          border: "1px dashed var(--fui-border)",
        }}
      >
        <Input label="In a wide one" placeholder="you@example.com" />
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Username",
    description: "This is how your name appears to others.",
    placeholder: "jane_doe",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Enter an email address in the correct format, like name@example.com",
    defaultValue: "not-an-email",
  },
};

export const Required: Story = {
  args: { label: "Full name", withAsterisk: true, placeholder: "Jane Doe" },
};

export const Disabled: Story = {
  args: { label: "Email", placeholder: "you@example.com", disabled: true },
};
