import { FeatureGrid } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "feature-grid",
  name: "FeatureGrid",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A responsive grid of icon / title / description features under an optional section header.",
  importLine: `import { FeatureGrid } from "@farmui/blocks";`,
  demos: [
    {
      title: "With icons",
      description: "The classic three-up feature section with a header.",
      code: `<FeatureGrid
  eyebrow="Why FarmUI"
  title="Everything you need to launch"
  description="Batteries-included sections that stay accessible and on-brand out of the box."
  features={[
    { icon: "⚡", title: "Fast by default", description: "Server-rendered, zero client JS, and tuned for Core Web Vitals." },
    { icon: "🎨", title: "Themeable", description: "Every block reads your brand tokens — one variable set, whole site restyled." },
    { icon: "♿", title: "Accessible", description: "Semantic HTML and WCAG-AA contrast baked into every component." },
  ]}
/>`,
      render: () => (
        <FeatureGrid
          eyebrow="Why FarmUI"
          title="Everything you need to launch"
          description="Batteries-included sections that stay accessible and on-brand out of the box."
          features={[
            {
              icon: "⚡",
              title: "Fast by default",
              description:
                "Server-rendered, zero client JS, and tuned for Core Web Vitals.",
            },
            {
              icon: "🎨",
              title: "Themeable",
              description:
                "Every block reads your brand tokens — one variable set, whole site restyled.",
            },
            {
              icon: "♿",
              title: "Accessible",
              description:
                "Semantic HTML and WCAG-AA contrast baked into every component.",
            },
          ]}
        />
      ),
    },
    {
      title: "Without header, four columns",
      description:
        "Omit the header and tighten `minChildWidth` to fit more per row.",
      code: `<FeatureGrid
  minChildWidth="13rem"
  features={[
    { icon: "🌱", title: "Crop planning", description: "Plan rotations across every field." },
    { icon: "🚜", title: "Fleet tracking", description: "Know where every machine is." },
    { icon: "📦", title: "Inventory", description: "Track seed, feed, and fuel in one place." },
    { icon: "📊", title: "Yield reports", description: "Season-over-season, at a glance." },
  ]}
/>`,
      render: () => (
        <FeatureGrid
          minChildWidth="13rem"
          features={[
            {
              icon: "🌱",
              title: "Crop planning",
              description: "Plan rotations across every field.",
            },
            {
              icon: "🚜",
              title: "Fleet tracking",
              description: "Know where every machine is.",
            },
            {
              icon: "📦",
              title: "Inventory",
              description: "Track seed, feed, and fuel in one place.",
            },
            {
              icon: "📊",
              title: "Yield reports",
              description: "Season-over-season, at a glance.",
            },
          ]}
        />
      ),
    },
    {
      title: "Text only",
      description: "Icons are optional — a title alone still renders cleanly.",
      code: `<FeatureGrid
  title="What's included"
  features={[
    { title: "Unlimited projects", description: "No per-seat caps." },
    { title: "Priority support", description: "Answers within one business day." },
    { title: "SOC 2 compliant", description: "Audited annually." },
  ]}
/>`,
      render: () => (
        <FeatureGrid
          title="What's included"
          features={[
            {
              title: "Unlimited projects",
              description: "No per-seat caps.",
            },
            {
              title: "Priority support",
              description: "Answers within one business day.",
            },
            { title: "SOC 2 compliant", description: "Audited annually." },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "features",
      type: "Feature[]",
      description:
        "The features to render, where Feature = { icon?: ReactNode; title: ReactNode; description?: ReactNode }. Required.",
    },
    {
      name: "eyebrow",
      type: "ReactNode",
      description: "Small overline above the section title.",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Section heading.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Supporting paragraph under the section title.",
    },
    {
      name: "minChildWidth",
      type: "string",
      default: `"16rem"`,
      description: "Minimum card width; the grid wraps responsively.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded.",
    },
  ],
};

export default doc;
