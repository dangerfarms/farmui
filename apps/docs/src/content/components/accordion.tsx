import { Accordion, AccordionItem } from "@farmui/core";
import type { ComponentContent } from "@/renderer/types";

const doc: ComponentContent = {
  slug: "accordion",
  lead: "Stacked, expandable sections built on native <details>.",
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
      title: "Single collapsible",
      description:
        "One AccordionItem on its own is the platform's disclosure widget — a native <details>/<summary>, no root required. This is FarmUI's \"Collapsible\": no separate component needed.",
      code: `<AccordionItem label="Advanced options">
  Extra settings most people never need.
</AccordionItem>`,
      render: () => (
        <AccordionItem label="Advanced options">
          Extra settings most people never need.
        </AccordionItem>
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
  whenToUse: [
    "To shorten a genuinely long page by collapsing distinct, independently useful sections — an FAQ where each visitor needs one or two answers, not all of them.",
    "When users need to scan section headers to find the one section that applies to them.",
    "As a single disclosure: one AccordionItem on its own is the platform's <details>/<summary> widget — the right home for 'advanced options' most people never need.",
  ],
  whenNotToUse: [
    "When most users need the content — GOV.UK research found most users never open collapsed sections, so anything hidden by default may simply never be read. Put it on the page under headings.",
    "For small amounts of content — the click cost of opening outweighs the space saved; plain prose is simpler.",
    "Nested inside another accordion — stacked disclosure widgets make it unclear what is open, what is hidden, and how much content remains.",
  ],
  howItWorks: [
    {
      title: "Only to shorten a long page",
      body: "An accordion trades space for discoverability: the page gets shorter, but every collapsed section becomes content most users will never open. That trade only pays on a genuinely long page of independent sections. If everyone needs the content, showing it costs nothing and hiding it costs readers — use headings and prose.",
    },
    {
      title: "Exclusivity is the platform's, not JavaScript's",
      body: "In the default single-open mode, every item shares a native HTML name attribute on its <details>, and the browser itself closes the others when one opens — no state, no JS. But that native closing can yank content away from someone mid-read: when users may want two sections open to compare them, pass multiple, which simply drops the shared name.",
    },
    {
      title: "One item is your Collapsible",
      body: "A lone AccordionItem needs no Accordion root — it is a complete native disclosure widget by itself. FarmUI deliberately ships no separate Collapsible component; use a single item for progressive disclosure of secondary detail, and keep primary actions and required information outside it.",
    },
  ],
  accessibility: [
    "Each item is a real <details>/<summary>, so toggling, Enter/Space activation, focusability and the expanded/collapsed announcement all come from the platform — items work before and without JavaScript.",
    "Single-open behaviour is the native name attribute on <details>: the browser enforces the exclusivity, so it holds even when JavaScript fails.",
    "The label is the summary's accessible name; the chevron is aria-hidden decoration, so screen readers hear only the label and the disclosure state.",
    "Because content lives in real <details> elements, Chromium-based browsers auto-open a closed item when find-in-page matches text inside it — collapsed content stays searchable.",
    "defaultOpen maps to the native open attribute, so a server-rendered page shows the expanded item correctly before hydration.",
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
