import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "../../index";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs.Root,
  tags: ["autodocs"],
  args: {
    separator: "/",
  },
  argTypes: {
    separator: { control: "text" },
  },
  render: (args) => (
    <Breadcrumbs.Root {...args}>
      <Breadcrumbs.Item href="#root">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#crops">Crops</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#wheat">Wheat</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Winter varieties</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  ),
} satisfies Meta<typeof Breadcrumbs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — change the separator in the Controls panel. */
export const Playground: Story = {};

/** A custom separator glyph, drawn by CSS between items. */
export const CustomSeparator: Story = {
  args: { separator: "›" },
};

/** A short two-level trail. */
export const ShortTrail: Story = {
  render: (args) => (
    <Breadcrumbs.Root {...args}>
      <Breadcrumbs.Item href="#root">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Dashboard</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  ),
};

/** The current page can itself be a link (aria-current stays correct). */
export const CurrentAsLink: Story = {
  render: (args) => (
    <Breadcrumbs.Root {...args}>
      <Breadcrumbs.Item href="#root">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#fields">Fields</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#north" current>
        North paddock
      </Breadcrumbs.Item>
    </Breadcrumbs.Root>
  ),
};

/** A truncated path — `current` is explicit, so it needn't be last. */
export const Truncated: Story = {
  render: (args) => (
    <Breadcrumbs.Root {...args}>
      <Breadcrumbs.Item href="#root">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item aria-hidden>…</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  ),
};
