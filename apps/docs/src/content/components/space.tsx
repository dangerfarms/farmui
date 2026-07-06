import { Space } from "@farmui/core";
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
  slug: "space",
  name: "Space",
  category: "Layout",
  description: "An empty box used to add whitespace between elements.",
  importLine: `import { Space } from "@farmui/core";`,
  demos: [
    {
      title: "Vertical space",
      description: "Set h to add vertical space between two blocks.",
      code: `<div>Above</div>
<Space h="xl" />
<div>Below</div>`,
      render: () => (
        <div>
          <Box>Above</Box>
          <Space h="xl" />
          <Box>Below</Box>
        </div>
      ),
    },
    {
      title: "Horizontal space",
      description: "Set w to add inline space between two elements in a row.",
      code: `<span style={{ display: "flex" }}>
  <div>Left</div>
  <Space w="xl" />
  <div>Right</div>
</span>`,
      render: () => (
        <span style={{ display: "flex" }}>
          <Box>Left</Box>
          <Space w="xl" />
          <Box>Right</Box>
        </span>
      ),
    },
    {
      title: "Custom size",
      description: "Pass a number (px) or any CSS length.",
      code: `<div>Above</div>
<Space h={48} />
<div>Below</div>`,
      render: () => (
        <div>
          <Box>Above</Box>
          <Space h={48} />
          <Box>Below</Box>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "h",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      description: "Block-size (vertical space).",
    },
    {
      name: "w",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      description: "Inline-size (horizontal space).",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
