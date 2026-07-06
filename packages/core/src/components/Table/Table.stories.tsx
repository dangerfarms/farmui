import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../../index";

type Field = {
  name: string;
  crop: string;
  area: string;
  yield: string;
};

const fields: Field[] = [
  {
    name: "North Field",
    crop: "Winter wheat",
    area: "42 ha",
    yield: "8.1 t/ha",
  },
  {
    name: "Mill Meadow",
    crop: "Oilseed rape",
    area: "28 ha",
    yield: "3.6 t/ha",
  },
  {
    name: "Brook Acre",
    crop: "Spring barley",
    area: "19 ha",
    yield: "6.4 t/ha",
  },
  { name: "Long Ley", crop: "Grass ley", area: "35 ha", yield: "—" },
];

const FieldTable = (args: React.ComponentProps<typeof Table>) => (
  <Table {...args}>
    <caption>Field register — 2026 season</caption>
    <thead>
      <tr>
        <th scope="col">Field</th>
        <th scope="col">Crop</th>
        <th scope="col">Area</th>
        <th scope="col">Yield</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((field) => (
        <tr key={field.name}>
          <th scope="row">{field.name}</th>
          <td>{field.crop}</td>
          <td>{field.area}</td>
          <td>{field.yield}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const meta = {
  title: "Data display/Table",
  component: Table,
  tags: ["autodocs"],
  args: {
    striped: false,
    highlightOnHover: false,
    withColumnBorders: false,
    captionSide: "top",
  },
  argTypes: {
    striped: { control: "boolean" },
    highlightOnHover: { control: "boolean" },
    withColumnBorders: { control: "boolean" },
    captionSide: { control: "inline-radio", options: ["top", "bottom"] },
  },
  render: (args) => <FieldTable {...args} />,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak props in the Controls panel. */
export const Playground: Story = {};

export const Striped: Story = { args: { striped: true } };

export const HighlightOnHover: Story = { args: { highlightOnHover: true } };

export const WithColumnBorders: Story = {
  args: { withColumnBorders: true, striped: true },
};

export const CaptionBottom: Story = { args: { captionSide: "bottom" } };
