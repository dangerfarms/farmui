import { SimpleGrid } from "@farmui/core";
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
  slug: "simple-grid",
  name: "SimpleGrid",
  category: "Layout",
  description:
    "An equal-width CSS grid that can size its columns intrinsically.",
  importLine: `import { SimpleGrid } from "@farmui/core";`,
  demos: [
    {
      title: "Fixed columns",
      description: "Set cols for a fixed number of equal-width columns.",
      code: `<SimpleGrid cols={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</SimpleGrid>`,
      render: () => (
        <SimpleGrid cols={3}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </SimpleGrid>
      ),
    },
    {
      title: "Intrinsically responsive",
      description:
        "Set minChildWidth and columns wrap automatically with no breakpoints — it overrides cols.",
      code: `<SimpleGrid minChildWidth={220}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</SimpleGrid>`,
      render: () => (
        <SimpleGrid minChildWidth={220}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </SimpleGrid>
      ),
    },
    {
      title: "Custom gap",
      code: `<SimpleGrid cols={2} gap="xl">
  <div>1</div>
  <div>2</div>
</SimpleGrid>`,
      render: () => (
        <SimpleGrid cols={2} gap="xl">
          <Box>1</Box>
          <Box>2</Box>
        </SimpleGrid>
      ),
    },
    {
      title: "Four fixed columns",
      code: `<SimpleGrid cols={4}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</SimpleGrid>`,
      render: () => (
        <SimpleGrid cols={4}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </SimpleGrid>
      ),
    },
  ],
  props: [
    {
      name: "cols",
      type: "number",
      default: "3",
      description: "Number of equal-width columns.",
    },
    {
      name: "minChildWidth",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      description:
        "Minimum column width. When set, the grid becomes intrinsically responsive — columns wrap automatically with no breakpoints. Overrides cols.",
    },
    {
      name: "gap",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      default: `"md"`,
      description: "Gap between items on both axes.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
