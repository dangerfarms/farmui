import { Group } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";
import type { ReactNode } from "react";

const Box = ({ children = "Box" }: { children?: ReactNode }) => (
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

const doc: ComponentDoc = {
  slug: "group",
  name: "Group",
  category: "Layout",
  description: "Lays children out horizontally with a consistent gap.",
  importLine: `import { Group } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description: "Children sit in a row, vertically centered by default.",
      code: `<Group>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Group>`,
      render: () => (
        <Group>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Group>
      ),
    },
    {
      title: "Justify",
      description: "Distribute children along the row.",
      code: `<Group justify="between">
  <div>Left</div>
  <div>Right</div>
</Group>`,
      render: () => (
        <Group justify="between">
          <Box>Left</Box>
          <Box>Right</Box>
        </Group>
      ),
    },
    {
      title: "Grow",
      description: "Make each child grow to fill the row equally.",
      code: `<Group grow>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Group>`,
      render: () => (
        <Group grow>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Group>
      ),
    },
    {
      title: "No wrap",
      description:
        "By default children wrap onto multiple rows; set wrap={false} to keep them on one line.",
      code: `<Group wrap={false}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Group>`,
      render: () => (
        <Group wrap={false}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Group>
      ),
    },
  ],
  props: [
    {
      name: "gap",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      default: `"md"`,
      description: "Gap between children.",
    },
    {
      name: "align",
      type: `"start" | "center" | "end" | "stretch" | "baseline"`,
      default: `"center"`,
      description: "Cross-axis alignment (align-items).",
    },
    {
      name: "justify",
      type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
      default: `"start"`,
      description: "Main-axis distribution (justify-content).",
    },
    {
      name: "wrap",
      type: "boolean",
      default: "true",
      description: "Wrap children onto multiple rows.",
    },
    {
      name: "grow",
      type: "boolean",
      description: "Make each child grow to fill the row equally.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
