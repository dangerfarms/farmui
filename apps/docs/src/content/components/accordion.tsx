import { Accordion, AccordionItem } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "accordion",
  name: "Accordion",
  category: "Navigation",
  description: "Stacked, expandable sections built on native <details>.",
  importLine: `import { Accordion, AccordionItem } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description: "Single-open mode — opening one item closes the others.",
      code: `<Accordion>
  <AccordionItem label="What plans do you offer?">
    Free, Pro, and Enterprise tiers with monthly or annual billing.
  </AccordionItem>
  <AccordionItem label="Can I change plans later?">
    Yes — upgrade or downgrade at any time from your account settings.
  </AccordionItem>
  <AccordionItem label="Is there a free trial?">
    Every paid plan includes a 14-day free trial.
  </AccordionItem>
</Accordion>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "30rem" }}>
          <Accordion>
            <AccordionItem label="What plans do you offer?">
              Free, Pro, and Enterprise tiers with monthly or annual billing.
            </AccordionItem>
            <AccordionItem label="Can I change plans later?">
              Yes — upgrade or downgrade at any time from your account settings.
            </AccordionItem>
            <AccordionItem label="Is there a free trial?">
              Every paid plan includes a 14-day free trial.
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      title: "Default open",
      description: "Use defaultOpen to expand an item on first render.",
      code: `<Accordion>
  <AccordionItem label="Getting started" defaultOpen>
    Create your workspace and invite your first teammate.
  </AccordionItem>
  <AccordionItem label="Adding projects">
    Group related work into projects to stay organized.
  </AccordionItem>
  <AccordionItem label="Tracking progress">
    Log updates as tasks move toward completion.
  </AccordionItem>
</Accordion>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "30rem" }}>
          <Accordion>
            <AccordionItem label="Getting started" defaultOpen>
              Create your workspace and invite your first teammate.
            </AccordionItem>
            <AccordionItem label="Adding projects">
              Group related work into projects to stay organized.
            </AccordionItem>
            <AccordionItem label="Tracking progress">
              Log updates as tasks move toward completion.
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      title: "Multiple",
      description: "With multiple, any number of items can be open at once.",
      code: `<Accordion multiple>
  <AccordionItem label="Performance">
    Lazy-load routes to cut initial bundle size by up to 40%.
  </AccordionItem>
  <AccordionItem label="Accessibility">
    Every component ships with keyboard and screen-reader support.
  </AccordionItem>
  <AccordionItem label="Theming">
    Override CSS variables to match your brand in minutes.
  </AccordionItem>
</Accordion>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "30rem" }}>
          <Accordion multiple>
            <AccordionItem label="Performance">
              Lazy-load routes to cut initial bundle size by up to 40%.
            </AccordionItem>
            <AccordionItem label="Accessibility">
              Every component ships with keyboard and screen-reader support.
            </AccordionItem>
            <AccordionItem label="Theming">
              Override CSS variables to match your brand in minutes.
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "multiple",
      type: "boolean",
      default: "false",
      description:
        "Allow more than one item open at once. When false, items are mutually exclusive.",
    },
    {
      name: "AccordionItem label",
      type: "ReactNode",
      description: "The summary label shown in the always-visible header.",
    },
    {
      name: "AccordionItem defaultOpen",
      type: "boolean",
      description: "Open this item by default.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "Native <div> / <details> props are forwarded respectively.",
    },
  ],
};

export default doc;
