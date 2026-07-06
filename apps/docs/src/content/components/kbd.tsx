import { Kbd } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "kbd",
  name: "Kbd",
  category: "Data display",
  description: "A styled keyboard key for documenting shortcuts.",
  importLine: `import { Kbd } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      code: `<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>
<Kbd>⌘</Kbd>`,
      render: () => (
        <>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>⌘</Kbd>
        </>
      ),
    },
    {
      title: "Sizes",
      code: `<Kbd size="sm">⌘</Kbd>
<Kbd size="md">⌘</Kbd>
<Kbd size="lg">⌘</Kbd>`,
      render: () => (
        <>
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="md">⌘</Kbd>
          <Kbd size="lg">⌘</Kbd>
        </>
      ),
    },
    {
      title: "Combination",
      description: "Compose multiple keys with a separator to show a shortcut.",
      code: `<span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
  <Kbd>⌘</Kbd>
  <span>+</span>
  <Kbd>K</Kbd>
</span>`,
      render: () => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "var(--fui-text-muted)",
          }}
        >
          <Kbd>⌘</Kbd>
          <span aria-hidden>+</span>
          <Kbd>K</Kbd>
        </span>
      ),
    },
  ],
  props: [
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Control size (height, padding, font size).",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "The key(s) to display.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <kbd> props are forwarded.",
    },
  ],
};

export default doc;
