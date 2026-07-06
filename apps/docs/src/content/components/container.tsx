import { Container } from "@farmui/core";
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
  slug: "container",
  name: "Container",
  category: "Layout",
  description: "Centers content and caps its width for readable line lengths.",
  importLine: `import { Container } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description: "Centers its content and applies horizontal padding.",
      code: `<Container>
  <div>Centered, width-capped content.</div>
</Container>`,
      render: () => (
        <Container>
          <Box>Centered, width-capped content.</Box>
        </Container>
      ),
    },
    {
      title: "Sizes",
      description:
        "Named sizes cap the max width from xs (33rem) to xl (82.5rem).",
      code: `<Container size="xs"><div>xs</div></Container>
<Container size="sm"><div>sm</div></Container>
<Container size="md"><div>md</div></Container>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <Container size="xs">
            <Box>xs — 33rem</Box>
          </Container>
          <Container size="sm">
            <Box>sm — 45rem</Box>
          </Container>
          <Container size="md">
            <Box>md — 60rem</Box>
          </Container>
        </div>
      ),
    },
    {
      title: "Custom size",
      description: "Pass a number (px) or any CSS length instead of a token.",
      code: `<Container size={480}>
  <div>480px wide</div>
</Container>`,
      render: () => (
        <Container size={480}>
          <Box>480px wide</Box>
        </Container>
      ),
    },
    {
      title: "Fluid",
      description: "Remove the max width and stretch to fill the parent.",
      code: `<Container fluid>
  <div>Full-width content</div>
</Container>`,
      render: () => (
        <Container fluid>
          <Box>Full-width content</Box>
        </Container>
      ),
    },
    {
      title: "Custom padding",
      code: `<Container padding="xl">
  <div>Extra horizontal padding</div>
</Container>`,
      render: () => (
        <Container padding="xl">
          <Box>Extra horizontal padding</Box>
        </Container>
      ),
    },
  ],
  props: [
    {
      name: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      default: `"lg"`,
      description: "Max width — a named size, a number (px) or any CSS length.",
    },
    {
      name: "padding",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      default: `"lg"`,
      description: "Horizontal padding.",
    },
    {
      name: "fluid",
      type: "boolean",
      description: "Remove the max width and stretch to fill.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
