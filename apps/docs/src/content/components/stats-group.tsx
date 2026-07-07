import { StatsGroup } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "stats-group",
  name: "StatsGroup",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A responsive row of big-number stats with muted labels, rendered as a description list.",
  importLine: `import { StatsGroup } from "@farmui/blocks";`,
  demos: [
    {
      title: "With header",
      description: "A metrics band introduced by a section header.",
      code: `<StatsGroup
  eyebrow="By the numbers"
  title="Trusted at scale"
  description="Teams of every size run their public sites on FarmUI."
  stats={[
    { value: "12k+", label: "Sites launched" },
    { value: "99.99%", label: "Uptime" },
    { value: "48ms", label: "Median TTFB" },
    { value: "4.9/5", label: "Customer rating" },
  ]}
/>`,
      render: () => (
        <StatsGroup
          eyebrow="By the numbers"
          title="Trusted at scale"
          description="Teams of every size run their public sites on FarmUI."
          stats={[
            { value: "12k+", label: "Sites launched" },
            { value: "99.99%", label: "Uptime" },
            { value: "48ms", label: "Median TTFB" },
            { value: "4.9/5", label: "Customer rating" },
          ]}
        />
      ),
    },
    {
      title: "Bare stats",
      description: "Drop the header for a compact three-up metric strip.",
      code: `<StatsGroup
  stats={[
    { value: "2M+", label: "Acres managed" },
    { value: "40%", label: "Less input waste" },
    { value: "3×", label: "Faster planning" },
  ]}
/>`,
      render: () => (
        <StatsGroup
          stats={[
            { value: "2M+", label: "Acres managed" },
            { value: "40%", label: "Less input waste" },
            { value: "3×", label: "Faster planning" },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "stats",
      type: "Stat[]",
      description:
        "The stats to render, where Stat = { value: ReactNode; label: ReactNode }. Required.",
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
