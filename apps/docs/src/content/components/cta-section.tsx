import { CTASection } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "cta-section",
  name: "CTASection",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A centered call-to-action band with a tinted background and one or more buttons.",
  importLine: `import { CTASection } from "@farmui/blocks";`,
  demos: [
    {
      title: "Primary + secondary action",
      description:
        "The classic conversion band: a bold headline, a line of reassurance, and two buttons of differing emphasis.",
      code: `<CTASection
  title="Ready to grow smarter?"
  description="Join 4,000+ farms already using FarmUI to plan, plant, and harvest with confidence."
  actions={[
    { label: "Start free trial", href: "/signup" },
    { label: "Book a demo", href: "/demo", variant: "outline" },
  ]}
/>`,
      render: () => (
        <CTASection
          title="Ready to grow smarter?"
          description="Join 4,000+ farms already using FarmUI to plan, plant, and harvest with confidence."
          actions={[
            { label: "Start free trial", href: "/signup" },
            { label: "Book a demo", href: "/demo", variant: "outline" },
          ]}
        />
      ),
    },
    {
      title: "Single action",
      description: "A description is optional — drop it for a tighter band.",
      code: `<CTASection
  title="Get the harvest report, straight to your inbox"
  actions={[{ label: "Subscribe", href: "/newsletter" }]}
/>`,
      render: () => (
        <CTASection
          title="Get the harvest report, straight to your inbox"
          actions={[{ label: "Subscribe", href: "/newsletter" }]}
        />
      ),
    },
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Headline, rendered as an <h2>.",
    },
    {
      name: "actions",
      type: "BlockAction[]",
      description:
        'Call-to-action buttons, rendered at size lg. BlockAction = { label, href?, variant? } where variant is "filled" | "light" | "outline" | "subtle".',
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Supporting paragraph shown under the title.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded (except title).",
    },
  ],
};

export default doc;
