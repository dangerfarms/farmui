import { Card, Button } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "card",
  name: "Card",
  category: "Data display",
  description: "A surface container that groups related content.",
  importLine: `import { Card } from "@farmui/core";`,
  demos: [
    {
      title: "Basic card",
      description: "A padded surface holding a heading, text, and an action.",
      code: `<Card withBorder>
  <h3 style={{ margin: "0 0 0.5rem" }}>Weekly summary</h3>
  <p style={{ margin: "0 0 1rem", color: "var(--fui-text-muted)" }}>
    Your team shipped 12 tasks this week. Review activity and plan the next sprint.
  </p>
  <Button size="sm">View report</Button>
</Card>`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Card withBorder>
            <h3 style={{ margin: "0 0 0.5rem" }}>Weekly summary</h3>
            <p
              style={{
                margin: "0 0 1rem",
                color: "var(--fui-text-muted)",
                fontSize: "0.875rem",
              }}
            >
              Your team shipped 12 tasks this week. Review activity and plan the
              next sprint.
            </p>
            <Button size="sm">View report</Button>
          </Card>
        </div>
      ),
    },
    {
      title: "With border",
      description: "Set withBorder for a subtle outline instead of a shadow.",
      code: `<Card withBorder>Bordered surface</Card>`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Card withBorder>Bordered surface</Card>
        </div>
      ),
    },
    {
      title: "Shadows",
      description: "Four elevation levels, theme-aware via tokens.",
      code: `<Card shadow="sm">Small shadow</Card>
<Card shadow="md">Medium shadow</Card>
<Card shadow="lg">Large shadow</Card>`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            maxInlineSize: "22rem",
            inlineSize: "100%",
          }}
        >
          <Card shadow="sm">Small shadow</Card>
          <Card shadow="md">Medium shadow</Card>
          <Card shadow="lg">Large shadow</Card>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "padding",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Inner padding.",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl"`,
      default: `"lg"`,
      description: "Border radius token.",
    },
    {
      name: "withBorder",
      type: "boolean",
      description: "Draw a border around the card.",
    },
    {
      name: "shadow",
      type: `"none" | "sm" | "md" | "lg"`,
      default: `"none"`,
      description: "Drop shadow depth.",
    },
    {
      name: "...others",
      type: "DivHTMLAttributes",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
