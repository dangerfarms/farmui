import { Stack } from "@farmui/core";
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
  slug: "stack",
  name: "Stack",
  category: "Layout",
  description: "Lays children out vertically with a consistent gap.",
  importLine: `import { Stack } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description: "Children are stacked vertically with an even gap.",
      code: `<Stack>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Stack>`,
      render: () => (
        <Stack>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      ),
    },
    {
      title: "Gap",
      code: `<Stack gap="xl">
  <div>1</div>
  <div>2</div>
</Stack>`,
      render: () => (
        <Stack gap="xl">
          <Box>1</Box>
          <Box>2</Box>
        </Stack>
      ),
    },
    {
      title: "Alignment",
      description:
        "Use align to control the cross-axis position of shrink-to-fit children.",
      code: `<Stack align="center">
  <div>Centered</div>
  <div>Centered</div>
</Stack>`,
      render: () => (
        <Stack align="center">
          <Box>Centered</Box>
          <Box>Centered</Box>
        </Stack>
      ),
    },
    {
      title: "Justify",
      description:
        "Distribute children along the main axis within a tall Stack.",
      code: `<Stack justify="between" style={{ blockSize: "12rem" }}>
  <div>Top</div>
  <div>Bottom</div>
</Stack>`,
      render: () => (
        <Stack justify="between" style={{ blockSize: "12rem" }}>
          <Box>Top</Box>
          <Box>Bottom</Box>
        </Stack>
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
      default: `"stretch"`,
      description: "Cross-axis alignment (align-items).",
    },
    {
      name: "justify",
      type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
      default: `"start"`,
      description: "Main-axis distribution (justify-content).",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
