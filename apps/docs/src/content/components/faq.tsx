import { FAQ } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "faq",
  name: "FAQ",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A centered, accordion-driven list of frequently asked questions.",
  importLine: `import { FAQ } from "@farmui/blocks";`,
  demos: [
    {
      title: "With heading",
      description:
        "An eyebrow, title, and description sit above the accordion. Each item expands to reveal its answer.",
      code: `<FAQ
  eyebrow="Support"
  title="Frequently asked questions"
  description="Everything you need to know about getting started. Can't find an answer? Email support@farmui.dev."
  items={[
    {
      question: "Do I need any hardware to get started?",
      answer:
        "No. FarmUI works with the data you already have — you can add fields and log activity by hand. Soil and weather sensors are optional and connect in a few clicks if you have them.",
    },
    {
      question: "Can I import my existing field records?",
      answer:
        "Yes. Upload a CSV or connect one of our supported farm-management tools and we'll map your fields, crops, and history automatically.",
    },
    {
      question: "How does billing work?",
      answer:
        "Plans are billed monthly or annually and you can change or cancel at any time. Annual plans include two months free.",
    },
    {
      question: "Is my farm data private?",
      answer:
        "Always. Your data is encrypted in transit and at rest, never sold, and never shared without your permission. You can export or delete it whenever you like.",
    },
  ]}
/>`,
      render: () => (
        <FAQ
          eyebrow="Support"
          title="Frequently asked questions"
          description="Everything you need to know about getting started. Can't find an answer? Email support@farmui.dev."
          items={[
            {
              question: "Do I need any hardware to get started?",
              answer:
                "No. FarmUI works with the data you already have — you can add fields and log activity by hand. Soil and weather sensors are optional and connect in a few clicks if you have them.",
            },
            {
              question: "Can I import my existing field records?",
              answer:
                "Yes. Upload a CSV or connect one of our supported farm-management tools and we'll map your fields, crops, and history automatically.",
            },
            {
              question: "How does billing work?",
              answer:
                "Plans are billed monthly or annually and you can change or cancel at any time. Annual plans include two months free.",
            },
            {
              question: "Is my farm data private?",
              answer:
                "Always. Your data is encrypted in transit and at rest, never sold, and never shared without your permission. You can export or delete it whenever you like.",
            },
          ]}
        />
      ),
    },
    {
      title: "Questions only",
      description:
        "The heading is optional — pass just items for a compact FAQ that slots under an existing section.",
      code: `<FAQ
  items={[
    {
      question: "Which crops are supported?",
      answer:
        "Over 120 crops out of the box, from staples like wheat and maize to specialty produce. You can also add custom crops with your own growth stages.",
    },
    {
      question: "Does FarmUI work offline?",
      answer:
        "The mobile app caches your fields and lets you log activity offline. Everything syncs the next time you're back on a connection.",
    },
    {
      question: "Can I invite my whole team?",
      answer:
        "Yes — invite team members by email and assign roles so everyone sees exactly what they need, from field hands to agronomists.",
    },
  ]}
/>`,
      render: () => (
        <FAQ
          items={[
            {
              question: "Which crops are supported?",
              answer:
                "Over 120 crops out of the box, from staples like wheat and maize to specialty produce. You can also add custom crops with your own growth stages.",
            },
            {
              question: "Does FarmUI work offline?",
              answer:
                "The mobile app caches your fields and lets you log activity offline. Everything syncs the next time you're back on a connection.",
            },
            {
              question: "Can I invite my whole team?",
              answer:
                "Yes — invite team members by email and assign roles so everyone sees exactly what they need, from field hands to agronomists.",
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "items",
      type: "FaqItem[]",
      description:
        "The list of question/answer pairs. FaqItem = { question: ReactNode, answer: ReactNode }.",
    },
    {
      name: "eyebrow",
      type: "ReactNode",
      description: "Small label shown above the title.",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Section heading.",
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
