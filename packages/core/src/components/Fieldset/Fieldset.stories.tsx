import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fieldset, Checkbox } from "../../index";

const meta = {
  title: "Inputs/Fieldset",
  component: Fieldset.Root,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Groups related controls under a semantic native `<fieldset>` / " +
          "`<legend>`. The legend names the group in the accessibility tree — " +
          "the accessible way to label a set of checkboxes or radios.",
      },
    },
  },
} satisfies Meta<typeof Fieldset.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Fieldset.Root style={{ maxWidth: 320 }}>
      <Fieldset.Legend>Email notifications</Fieldset.Legend>
      <Checkbox label="Product updates" defaultChecked />
      <Checkbox label="Security alerts" defaultChecked />
      <Checkbox label="Marketing" />
    </Fieldset.Root>
  ),
};

export const Optional: Story = {
  render: () => (
    <Fieldset.Root style={{ maxWidth: 320 }}>
      <Fieldset.Legend optional>Interests</Fieldset.Legend>
      <Checkbox label="Design" />
      <Checkbox label="Engineering" />
    </Fieldset.Root>
  ),
};
