import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ErrorSummary, Input } from "../../index";

const meta = {
  title: "Inputs/ErrorSummary",
  component: ErrorSummary.Root,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorSummary.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Shown after a failed submit: the summary takes focus, and each item links
 * to its field. Wording matches the fields' own error messages.
 */
export const Default: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxInlineSize: "28rem" }}>
      <ErrorSummary.Root autoFocus={false}>
        <ErrorSummary.Title />
        <ErrorSummary.List>
          <ErrorSummary.Item href="#es-email">
            Enter your email address
          </ErrorSummary.Item>
          <ErrorSummary.Item href="#es-name">
            Enter your full name
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary.Root>
      <Input id="es-name" label="Full name" error="Enter your full name" />
      <Input
        id="es-email"
        label="Email address"
        error="Enter your email address"
      />
      <div>
        <Button>Save and continue</Button>
      </div>
    </div>
  ),
};
