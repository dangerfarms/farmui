import { Hero } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "hero",
  name: "Hero",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A landing-page headline section with an eyebrow, title, CTAs, and optional media.",
  importLine: `import { Hero } from "@farmui/blocks";`,
  demos: [
    {
      title: "Centered",
      description:
        "The default when there's no media — copy and actions stack in the middle.",
      code: `<Hero
  eyebrow="Now in public beta"
  title="Ship your marketing site in an afternoon"
  description="FarmUI blocks give you production-ready sections — no design system to build, no CSS to babysit."
  actions={[
    { label: "Get started" },
    { label: "Read the docs", variant: "outline" },
  ]}
/>`,
      render: () => (
        <Hero
          eyebrow="Now in public beta"
          title="Ship your marketing site in an afternoon"
          description="FarmUI blocks give you production-ready sections — no design system to build, no CSS to babysit."
          actions={[
            { label: "Get started" },
            { label: "Read the docs", variant: "outline" },
          ]}
        />
      ),
    },
    {
      title: "With media, left-aligned",
      description:
        'Pass `media` and `align="start"` for a split layout with copy on the left.',
      code: `<Hero
  align="start"
  eyebrow="Analytics"
  title="Understand your customers in real time"
  description="Every event, every session, every funnel — streamed to a dashboard your whole team can read."
  actions={[{ label: "Start free trial" }, { label: "Book a demo", variant: "light" }]}
  media={
    <img
      src="/preview.png"
      alt="Product dashboard showing a live traffic funnel"
      style={{ inlineSize: "100%", borderRadius: "1rem" }}
    />
  }
/>`,
      render: () => (
        <Hero
          align="start"
          eyebrow="Analytics"
          title="Understand your customers in real time"
          description="Every event, every session, every funnel — streamed to a dashboard your whole team can read."
          actions={[
            { label: "Start free trial" },
            { label: "Book a demo", variant: "light" },
          ]}
          media={
            <img
              src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='480'%20height='320'%3E%3Crect%20width='480'%20height='320'%20rx='16'%20fill='%23e2e8f0'/%3E%3Crect%20x='32'%20y='40'%20width='240'%20height='20'%20rx='6'%20fill='%2394a3b8'/%3E%3Crect%20x='32'%20y='96'%20width='416'%20height='184'%20rx='12'%20fill='%23cbd5e1'/%3E%3C/svg%3E"
              alt="Product dashboard showing a live traffic funnel"
              style={{ inlineSize: "100%", borderRadius: "1rem" }}
            />
          }
        />
      ),
    },
    {
      title: "Minimal",
      description: "Just a title and a single call-to-action.",
      code: `<Hero
  title="Your farm, one dashboard"
  actions={[{ label: "Sign up free" }]}
/>`,
      render: () => (
        <Hero
          title="Your farm, one dashboard"
          actions={[{ label: "Sign up free" }]}
        />
      ),
    },
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Main headline, rendered as an <h1>. Required.",
    },
    {
      name: "eyebrow",
      type: "ReactNode",
      description: "Small overline shown above the title.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Supporting paragraph under the title.",
    },
    {
      name: "actions",
      type: "BlockAction[]",
      description:
        'Call-to-action buttons, where BlockAction = { label: string; href?: string; variant?: "filled" | "light" | "outline" | "subtle" }.',
    },
    {
      name: "media",
      type: "ReactNode",
      description:
        "Optional media beside the copy (image, illustration, a Card…).",
    },
    {
      name: "align",
      type: `"start" | "center"`,
      default: `"center" (or "start" when media is present)`,
      description: "Layout alignment of the content.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded.",
    },
  ],
};

export default doc;
