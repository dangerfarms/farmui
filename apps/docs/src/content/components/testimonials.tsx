import { Testimonials } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "testimonials",
  name: "Testimonials",
  category: "Blocks",
  pkg: "blocks",
  description: "A responsive grid of customer quote cards with author avatars.",
  importLine: `import { Testimonials } from "@farmui/blocks";`,
  demos: [
    {
      title: "With header",
      description:
        "Omit `avatar` and the author's initials are shown automatically — no image needed.",
      code: `<Testimonials
  eyebrow="Loved by builders"
  title="What our customers say"
  items={[
    {
      quote: "We replaced three separate tools with FarmUI and shipped our new site in a single sprint.",
      author: "Priya Nair",
      role: "Head of Growth, Meadowlark",
    },
    {
      quote: "The blocks are genuinely accessible out of the box. Our audit came back clean on the first pass.",
      author: "Diego Fernández",
      role: "Engineering Lead, Tanager",
    },
    {
      quote: "Re-theming for a new brand took an afternoon, not a rebuild. That's the whole pitch, delivered.",
      author: "Sam Okafor",
      role: "Design Systems, Harvest Co.",
    },
  ]}
/>`,
      render: () => (
        <Testimonials
          eyebrow="Loved by builders"
          title="What our customers say"
          items={[
            {
              quote:
                "We replaced three separate tools with FarmUI and shipped our new site in a single sprint.",
              author: "Priya Nair",
              role: "Head of Growth, Meadowlark",
            },
            {
              quote:
                "The blocks are genuinely accessible out of the box. Our audit came back clean on the first pass.",
              author: "Diego Fernández",
              role: "Engineering Lead, Tanager",
            },
            {
              quote:
                "Re-theming for a new brand took an afternoon, not a rebuild. That's the whole pitch, delivered.",
              author: "Sam Okafor",
              role: "Design Systems, Harvest Co.",
            },
          ]}
        />
      ),
    },
    {
      title: "Two-up, no header",
      description:
        "Raise `minChildWidth` to keep cards wide and drop the section header for a focused pull-quote pair.",
      code: `<Testimonials
  minChildWidth="24rem"
  items={[
    {
      quote: "Onboarding our whole marketing team took an afternoon. They ship pages without filing a single ticket now.",
      author: "Alex Rivera",
      role: "VP Marketing, Fieldnote",
    },
    {
      quote: "Support actually reads your setup before replying. First real answer came back the same day.",
      author: "Mei Lin",
      role: "Founder, Rootstock",
    },
  ]}
/>`,
      render: () => (
        <Testimonials
          minChildWidth="24rem"
          items={[
            {
              quote:
                "Onboarding our whole marketing team took an afternoon. They ship pages without filing a single ticket now.",
              author: "Alex Rivera",
              role: "VP Marketing, Fieldnote",
            },
            {
              quote:
                "Support actually reads your setup before replying. First real answer came back the same day.",
              author: "Mei Lin",
              role: "Founder, Rootstock",
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "items",
      type: "Testimonial[]",
      description:
        "The testimonials to display, where Testimonial = { quote: ReactNode; author: ReactNode; role?: ReactNode; avatar?: string }. When `avatar` is omitted the author's initials are shown. Required.",
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
      default: `"20rem"`,
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
