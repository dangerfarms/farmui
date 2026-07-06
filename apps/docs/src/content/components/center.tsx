import { Center } from "@farmui/core";
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
  slug: "center",
  name: "Center",
  category: "Layout",
  description: "Centers its single child on both axes.",
  importLine: `import { Center } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description: "Centers the child horizontally and vertically.",
      code: `<Center style={{ blockSize: "10rem" }}>
  <div>Centered</div>
</Center>`,
      render: () => (
        <Center style={{ blockSize: "10rem" }}>
          <Box>Centered</Box>
        </Center>
      ),
    },
    {
      title: "Inline",
      description:
        "Use inline to shrink Center to its content — handy for centering an icon next to text.",
      code: `<p>
  Status <Center inline>●</Center> online
</p>`,
      render: () => (
        <p style={{ margin: 0 }}>
          Status{" "}
          <Center inline aria-hidden style={{ color: "var(--fui-primary)" }}>
            ●
          </Center>{" "}
          online
        </p>
      ),
    },
    {
      title: "Filling a card",
      description: "Center content within a fixed-height region.",
      code: `<Center style={{ blockSize: "12rem", border: "1px dashed" }}>
  <div>Drop files here</div>
</Center>`,
      render: () => (
        <Center
          style={{
            blockSize: "12rem",
            border: "1px dashed var(--fui-border)",
            borderRadius: "var(--fui-radius-md)",
          }}
        >
          <Box>Drop files here</Box>
        </Center>
      ),
    },
  ],
  props: [
    {
      name: "inline",
      type: "boolean",
      description: "Use inline-flex instead of flex (shrink to content).",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
