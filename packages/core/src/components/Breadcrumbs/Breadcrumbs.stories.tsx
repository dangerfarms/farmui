import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "../../index";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: {
    separator: "/",
  },
  argTypes: {
    separator: { control: "text" },
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <a href="#root">Home</a>
      <a href="#crops">Crops</a>
      <a href="#wheat">Wheat</a>
      <span>Winter varieties</span>
    </Breadcrumbs>
  ),
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — change the separator in the Controls panel. */
export const Playground: Story = {};

/** A custom separator node between each item. */
export const CustomSeparator: Story = {
  args: { separator: "›" },
};

/** A short two-level trail. */
export const ShortTrail: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <a href="#root">Home</a>
      <span>Dashboard</span>
    </Breadcrumbs>
  ),
};

/** The final item is marked as the current page even when it is a link. */
export const AllLinks: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <a href="#root">Home</a>
      <a href="#fields">Fields</a>
      <a href="#north">North paddock</a>
    </Breadcrumbs>
  ),
};
