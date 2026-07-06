import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "../../index";

const Box = ({ children = "Box" }: { children?: React.ReactNode }) => (
  <div
    style={{
      background: "var(--fui-primary-soft)",
      color: "var(--fui-primary-hover)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "var(--fui-radius-md)",
    }}
  >
    {children}
  </div>
);

/** A tiny inline SVG image so demos need no network assets. */
const SAMPLE_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">' +
      '<rect width="320" height="180" fill="%234f46e5"/>' +
      '<text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="20" ' +
      'text-anchor="middle" dominant-baseline="middle">16 : 9</text>' +
      "</svg>",
  );

const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: { control: { type: "number", step: 0.1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "24rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak the ratio in the Controls panel. */
export const Playground: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <Box>{(args.ratio ?? 1).toFixed(2)}</Box>
    </AspectRatio>
  ),
};

/** Constrain an image to a 16:9 frame. */
export const Image: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src={SAMPLE_IMAGE}
        alt="Placeholder graphic in a 16 by 9 frame"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <AspectRatio {...args}>
      <Box>1 : 1</Box>
    </AspectRatio>
  ),
};

export const Portrait: Story = {
  args: { ratio: 3 / 4 },
  render: (args) => (
    <AspectRatio {...args}>
      <Box>3 : 4</Box>
    </AspectRatio>
  ),
};
