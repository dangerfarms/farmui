import { BentoGrid } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "bento-grid",
  name: "BentoGrid",
  category: "Blocks",
  pkg: "blocks",
  description:
    "An asymmetric grid of feature cards where span-2 items stretch across two columns.",
  importLine: `import { BentoGrid } from "@farmui/blocks";`,
  demos: [
    {
      title: "Mixed spans",
      description:
        "Give a standout card `span: 2` to make it twice as wide as the rest.",
      code: `<BentoGrid
  eyebrow="Platform"
  title="One toolkit, every surface"
  items={[
    { icon: "🧩", title: "Composable blocks", description: "Assemble pages from typed sections.", span: 2 },
    { icon: "🎨", title: "Brand tokens", description: "Restyle everything from one place." },
    { icon: "⚡", title: "Zero client JS", description: "Ships as static HTML + CSS." },
    { icon: "📱", title: "Responsive", description: "Fluid from mobile to widescreen.", span: 2 },
  ]}
/>`,
      render: () => (
        <BentoGrid
          eyebrow="Platform"
          title="One toolkit, every surface"
          items={[
            {
              icon: "🧩",
              title: "Composable blocks",
              description: "Assemble pages from typed sections.",
              span: 2,
            },
            {
              icon: "🎨",
              title: "Brand tokens",
              description: "Restyle everything from one place.",
            },
            {
              icon: "⚡",
              title: "Zero client JS",
              description: "Ships as static HTML + CSS.",
            },
            {
              icon: "📱",
              title: "Responsive",
              description: "Fluid from mobile to widescreen.",
              span: 2,
            },
          ]}
        />
      ),
    },
    {
      title: "Uniform cards",
      description: "Leave `span` off entirely for an even grid.",
      code: `<BentoGrid
  title="Built for teams"
  description="Everything scoped, audited, and ready to ship."
  items={[
    { icon: "🔐", title: "SSO & SCIM", description: "Enterprise auth on every plan." },
    { icon: "📈", title: "Usage analytics", description: "See adoption across your org." },
    { icon: "🧾", title: "Audit logs", description: "Every change, attributable." },
  ]}
/>`,
      render: () => (
        <BentoGrid
          title="Built for teams"
          description="Everything scoped, audited, and ready to ship."
          items={[
            {
              icon: "🔐",
              title: "SSO & SCIM",
              description: "Enterprise auth on every plan.",
            },
            {
              icon: "📈",
              title: "Usage analytics",
              description: "See adoption across your org.",
            },
            {
              icon: "🧾",
              title: "Audit logs",
              description: "Every change, attributable.",
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "items",
      type: "BentoItem[]",
      description:
        "The cards to render, where BentoItem = { title: ReactNode; description?: ReactNode; icon?: ReactNode; span?: 1 | 2 }. Required.",
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
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded.",
    },
  ],
};

export default doc;
