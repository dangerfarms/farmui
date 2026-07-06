import { Skeleton } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "skeleton",
  name: "Skeleton",
  category: "Feedback",
  description: "An animated placeholder shown while content loads.",
  importLine: `import { Skeleton } from "@farmui/core";`,
  demos: [
    {
      title: "Basic lines",
      description: "Stack skeletons to stand in for text while it loads.",
      code: `<Skeleton height="1rem" />
<Skeleton height="1rem" width="80%" />
<Skeleton height="1rem" width="60%" />`,
      render: () => (
        <div
          style={{
            display: "grid",
            gap: "0.5rem",
            inlineSize: "100%",
            maxInlineSize: "22rem",
          }}
        >
          <Skeleton height="1rem" />
          <Skeleton height="1rem" width="80%" />
          <Skeleton height="1rem" width="60%" />
        </div>
      ),
    },
    {
      title: "Circle + lines",
      description: "An avatar-and-text placeholder for a list item.",
      code: `<div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
  <Skeleton circle width="2.5rem" />
  <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
    <Skeleton height="0.75rem" width="40%" />
    <Skeleton height="0.75rem" width="70%" />
  </div>
</div>`,
      render: () => (
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            inlineSize: "100%",
            maxInlineSize: "22rem",
          }}
        >
          <Skeleton circle width="2.5rem" />
          <div style={{ display: "grid", gap: "0.4rem", flex: 1 }}>
            <Skeleton height="0.75rem" width="40%" />
            <Skeleton height="0.75rem" width="70%" />
          </div>
        </div>
      ),
    },
    {
      title: "Custom sizes",
      description: "Use width, height and radius for cards or thumbnails.",
      code: `<Skeleton width="8rem" height="8rem" radius="var(--fui-radius-lg)" />
<Skeleton width="8rem" height="8rem" circle />`,
      render: () => (
        <>
          <Skeleton width="8rem" height="8rem" radius="var(--fui-radius-lg)" />
          <Skeleton width="8rem" height="8rem" circle />
        </>
      ),
    },
  ],
  props: [
    {
      name: "width",
      type: "number | string",
      default: `"100%"`,
      description: "Inline size (number → px, or any CSS length).",
    },
    {
      name: "height",
      type: "number | string",
      default: `"1rem"`,
      description: "Block size (number → px, or any CSS length).",
    },
    {
      name: "radius",
      type: "number | string",
      default: `"var(--fui-radius-md)"`,
      description: "Border radius (number → px, or any CSS value).",
    },
    {
      name: "circle",
      type: "boolean",
      description: "Render as a circle (equal width/height, full radius).",
    },
    {
      name: "visible",
      type: "boolean",
      default: "true",
      description: "When false, render children instead of the placeholder.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Real content, shown once visible is false.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
