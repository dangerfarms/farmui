import { AspectRatio } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const IMG =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=60";

const doc: ComponentDoc = {
  slug: "aspect-ratio",
  name: "AspectRatio",
  category: "Layout",
  description:
    "Constrains its child to a fixed ratio using the native CSS aspect-ratio property.",
  importLine: `import { AspectRatio } from "@farmui/core";`,
  demos: [
    {
      title: "16 / 9",
      description: "A common widescreen ratio for video and hero imagery.",
      code: `<AspectRatio ratio={16 / 9}>
  <img src="/field.jpg" alt="A wheat field at sunset" />
</AspectRatio>`,
      render: () => (
        <AspectRatio ratio={16 / 9}>
          <img
            src={IMG}
            alt="A wheat field at sunset"
            style={{
              inlineSize: "100%",
              blockSize: "100%",
              objectFit: "cover",
              borderRadius: "var(--fui-radius-md)",
            }}
          />
        </AspectRatio>
      ),
    },
    {
      title: "Square (1 / 1)",
      description: "The default ratio — ideal for avatars and thumbnails.",
      code: `<AspectRatio ratio={1}>
  <img src="/field.jpg" alt="A wheat field at sunset" />
</AspectRatio>`,
      render: () => (
        <AspectRatio ratio={1} style={{ maxInlineSize: "16rem" }}>
          <img
            src={IMG}
            alt="A wheat field at sunset"
            style={{
              inlineSize: "100%",
              blockSize: "100%",
              objectFit: "cover",
              borderRadius: "var(--fui-radius-md)",
            }}
          />
        </AspectRatio>
      ),
    },
    {
      title: "Portrait (4 / 5)",
      description: "Ratios below 1 produce taller-than-wide frames.",
      code: `<AspectRatio ratio={4 / 5}>
  <img src="/field.jpg" alt="A wheat field at sunset" />
</AspectRatio>`,
      render: () => (
        <AspectRatio ratio={4 / 5} style={{ maxInlineSize: "16rem" }}>
          <img
            src={IMG}
            alt="A wheat field at sunset"
            style={{
              inlineSize: "100%",
              blockSize: "100%",
              objectFit: "cover",
              borderRadius: "var(--fui-radius-md)",
            }}
          />
        </AspectRatio>
      ),
    },
    {
      title: "Embeds",
      description: "Wrap iframes and video to keep them a fixed ratio.",
      code: `<AspectRatio ratio={16 / 9}>
  <iframe src="https://example.com/embed" title="Demo video" />
</AspectRatio>`,
      render: () => (
        <AspectRatio ratio={16 / 9}>
          <div
            style={{
              inlineSize: "100%",
              blockSize: "100%",
              display: "grid",
              placeItems: "center",
              background: "var(--fui-primary-soft)",
              color: "var(--fui-primary-hover)",
              borderRadius: "var(--fui-radius-md)",
            }}
          >
            Embed placeholder
          </div>
        </AspectRatio>
      ),
    },
  ],
  props: [
    {
      name: "ratio",
      type: "number",
      default: "1",
      description: "Width-to-height ratio, e.g. 16 / 9 or 1.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
