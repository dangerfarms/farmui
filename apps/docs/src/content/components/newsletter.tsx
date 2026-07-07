import { Newsletter } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "newsletter",
  name: "Newsletter",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A centered email sign-up section — a server-safe native form with no JS.",
  importLine: `import { Newsletter } from "@farmui/blocks";`,
  demos: [
    {
      title: "Sign-up form",
      description:
        "A heading, a native email field, and a submit button. Submission POSTs to the action endpoint you provide.",
      code: `<Newsletter
  eyebrow="Newsletter"
  title="Field notes, every fortnight"
  description="Seasonal tips, product updates, and the occasional harvest recipe. No spam — unsubscribe any time."
  placeholder="you@yourfarm.com"
  buttonLabel="Subscribe"
  action="/api/subscribe"
/>`,
      render: () => (
        <Newsletter
          eyebrow="Newsletter"
          title="Field notes, every fortnight"
          description="Seasonal tips, product updates, and the occasional harvest recipe. No spam — unsubscribe any time."
          placeholder="you@yourfarm.com"
          buttonLabel="Subscribe"
          action="/api/subscribe"
        />
      ),
    },
    {
      title: "Minimal, custom label",
      description:
        "Drop the eyebrow and description for a compact band, and tailor the button label to the offer.",
      code: `<Newsletter
  title="Get early access"
  buttonLabel="Join the waitlist"
  action="/api/waitlist"
/>`,
      render: () => (
        <Newsletter
          title="Get early access"
          buttonLabel="Join the waitlist"
          action="/api/waitlist"
        />
      ),
    },
  ],
  props: [
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
      name: "placeholder",
      type: "string",
      default: `"you@example.com"`,
      description: "Placeholder for the email field.",
    },
    {
      name: "buttonLabel",
      type: "string",
      default: `"Subscribe"`,
      description: "Submit button text.",
    },
    {
      name: "action",
      type: "string",
      description: "The form's action URL (where the POST is sent).",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded (except title).",
    },
  ],
};

export default doc;
