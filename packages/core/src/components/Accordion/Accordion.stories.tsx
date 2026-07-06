import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItem } from "../../index";

const meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    multiple: false,
  },
  argTypes: {
    multiple: { control: "boolean" },
  },
  render: (args) => (
    <div style={{ maxWidth: "32rem" }}>
      <Accordion {...args}>
        <AccordionItem label="What is FarmUI?" defaultOpen>
          <p>
            FarmUI is a themeable React component library built on native,
            semantic HTML and modern CSS.
          </p>
        </AccordionItem>
        <AccordionItem label="How is it themed?">
          <p>
            Every component reads from <code>--fui-*</code> CSS variables, so a
            single token override restyles the whole set.
          </p>
        </AccordionItem>
        <AccordionItem label="Does it need JavaScript?">
          <p>
            The accordion itself is built on <code>&lt;details&gt;</code>, so it
            toggles with zero JavaScript.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — toggle single vs. multiple open in the Controls panel. */
export const Playground: Story = {};

/**
 * Single mode (default): items share an HTML `name`, so opening one closes the
 * others.
 */
export const SingleOpen: Story = {
  args: { multiple: false },
};

/** Multiple mode: any number of items can be expanded at once. */
export const MultipleOpen: Story = {
  args: { multiple: true },
};

/** Items can start expanded via `defaultOpen`. */
export const DefaultOpen: Story = {
  render: (args) => (
    <div style={{ maxWidth: "32rem" }}>
      <Accordion {...args}>
        <AccordionItem label="Already open" defaultOpen>
          <p>This section is expanded on first render.</p>
        </AccordionItem>
        <AccordionItem label="Closed to start">
          <p>This one begins collapsed.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
