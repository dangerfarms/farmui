import { Flex } from "@farmui/core";
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
  slug: "flex",
  name: "Flex",
  category: "Layout",
  description: "A thin, prop-driven wrapper over CSS flexbox.",
  importLine: `import { Flex } from "@farmui/core";`,
  demos: [
    {
      title: "Row with gap",
      description: "Lay children out in a row with a consistent gap.",
      code: `<Flex gap="md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>`,
      render: () => (
        <Flex gap="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      ),
    },
    {
      title: "Direction",
      description: "Set direction to column to stack vertically.",
      code: `<Flex direction="column" gap="sm">
  <div>1</div>
  <div>2</div>
</Flex>`,
      render: () => (
        <Flex direction="column" gap="sm">
          <Box>1</Box>
          <Box>2</Box>
        </Flex>
      ),
    },
    {
      title: "Align & justify",
      description:
        "Combine align and justify to position children on both axes.",
      code: `<Flex justify="between" align="center" style={{ blockSize: "8rem" }}>
  <div>Left</div>
  <div>Right</div>
</Flex>`,
      render: () => (
        <Flex justify="between" align="center" style={{ blockSize: "8rem" }}>
          <Box>Left</Box>
          <Box>Right</Box>
        </Flex>
      ),
    },
    {
      title: "Wrap",
      description: "Let children wrap onto multiple rows when space runs out.",
      code: `<Flex wrap="wrap" gap="sm">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</Flex>`,
      render: () => (
        <Flex wrap="wrap" gap="sm">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Flex>
      ),
    },
  ],
  props: [
    {
      name: "direction",
      type: `"row" | "column" | "row-reverse" | "column-reverse"`,
      default: `"row"`,
      description: "flex-direction.",
    },
    {
      name: "gap",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      description: "Gap between children.",
    },
    {
      name: "align",
      type: `"start" | "center" | "end" | "stretch" | "baseline"`,
      description: "align-items.",
    },
    {
      name: "justify",
      type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
      description: "justify-content.",
    },
    {
      name: "wrap",
      type: `"nowrap" | "wrap" | "wrap-reverse"`,
      default: `"nowrap"`,
      description: "flex-wrap.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
