import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkipLink } from "../../index";

const meta = {
  title: "Navigation/SkipLink",
  component: SkipLink,
  tags: ["autodocs"],
  args: {
    href: "#content",
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tab into the story frame to see the link appear. */
export const Default: Story = {};
