import { Alert } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "alert",
  name: "Alert",
  category: "Feedback",
  description: "A prominent, colored box for conveying status or feedback.",
  importLine: `import { Alert } from "@farmui/core";`,
  demos: [
    {
      title: "Colors",
      description: "Four semantic colors for different kinds of message.",
      code: `<Alert color="info" title="Heads up">A new version is available.</Alert>
<Alert color="success" title="Saved">Your changes have been stored.</Alert>
<Alert color="warning" title="Low storage">Only 5% of your quota remains.</Alert>
<Alert color="danger" title="Deploy failed">Check the build logs.</Alert>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Alert color="info" title="Heads up">
            A new version is available.
          </Alert>
          <Alert color="success" title="Saved">
            Your changes have been stored.
          </Alert>
          <Alert color="warning" title="Low storage">
            Only 5% of your quota remains.
          </Alert>
          <Alert color="danger" title="Deploy failed">
            Check the build logs.
          </Alert>
        </div>
      ),
    },
    {
      title: "Variants",
      description: "Light (default), filled, and outline styles.",
      code: `<Alert variant="light" color="success" title="Light">Tinted background.</Alert>
<Alert variant="filled" color="success" title="Filled">Solid accent.</Alert>
<Alert variant="outline" color="success" title="Outline">Bordered only.</Alert>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <Alert variant="light" color="success" title="Light">
            Tinted background.
          </Alert>
          <Alert variant="filled" color="success" title="Filled">
            Solid accent.
          </Alert>
          <Alert variant="outline" color="success" title="Outline">
            Bordered only.
          </Alert>
        </div>
      ),
    },
    {
      title: "With icon",
      description: "Pass any node as the leading icon.",
      code: `<Alert color="info" icon={<span>ℹ</span>} title="Did you know?">
  You can theme every alert with a single CSS variable.
</Alert>`,
      render: () => (
        <div style={{ inlineSize: "100%" }}>
          <Alert
            color="info"
            icon={<span aria-hidden>ℹ</span>}
            title="Did you know?"
          >
            You can theme every alert with a single CSS variable.
          </Alert>
        </div>
      ),
    },
    {
      title: "Title only",
      description: "Body content is optional.",
      code: `<Alert color="warning" title="Scheduled maintenance tonight." />`,
      render: () => (
        <div style={{ inlineSize: "100%" }}>
          <Alert color="warning" title="Scheduled maintenance tonight." />
        </div>
      ),
    },
  ],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Bold heading rendered above the body.",
    },
    {
      name: "color",
      type: `"info" | "success" | "warning" | "danger"`,
      default: `"info"`,
      description: "Semantic color of the accent and background.",
    },
    {
      name: "variant",
      type: `"light" | "filled" | "outline"`,
      default: `"light"`,
      description: "Visual style.",
    },
    {
      name: "icon",
      type: "ReactNode",
      description: "Icon rendered to the inline-start of the content.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Alert body content.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
  ],
};

export default doc;
