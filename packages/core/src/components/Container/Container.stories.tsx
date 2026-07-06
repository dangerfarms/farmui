import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "../../index";

const Box = ({ children = "Box" }: { children?: React.ReactNode }) => (
  <div
    style={{
      background: "var(--fui-primary-soft)",
      color: "var(--fui-primary-hover)",
      padding: "1rem",
      borderRadius: "var(--fui-radius-md)",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Layout/Container",
  component: Container,
  tags: ["autodocs"],
  args: {
    size: "lg",
    padding: "lg",
    fluid: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    padding: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    fluid: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--fui-bg-subtle)", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <Container {...args}>
      <Box>Centered, width-capped content</Box>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Container key={size} size={size}>
          <Box>size=&quot;{size}&quot;</Box>
        </Container>
      ))}
    </div>
  ),
};

export const Fluid: Story = {
  args: { fluid: true },
  render: (args) => (
    <Container {...args}>
      <Box>fluid — stretches to fill the parent</Box>
    </Container>
  ),
};
