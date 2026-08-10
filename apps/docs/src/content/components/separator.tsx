import { Separator } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "separator",
  name: "Separator",
  category: "Layout",
  description: "A rule between groups of content.",
  importLine: `import { Separator } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "A real <hr> — the platform's separator role, no ARIA required.",
      code: `<p>Account settings</p>
<Separator />
<p>Danger zone</p>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem", inlineSize: "100%" }}>
          <p style={{ margin: 0 }}>Account settings</p>
          <Separator />
          <p style={{ margin: 0 }}>Danger zone</p>
        </div>
      ),
    },
    {
      title: "Vertical",
      description:
        "Divides items in a row; adds aria-orientation=\"vertical\" and stretches to the row's height.",
      code: `<div style={{ display: "flex", gap: "0.75rem" }}>
  <span>Cut</span>
  <Separator orientation="vertical" />
  <span>Copy</span>
</div>`,
      render: () => (
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <span>Cut</span>
          <Separator orientation="vertical" />
          <span>Copy</span>
          <Separator orientation="vertical" />
          <span>Paste</span>
        </div>
      ),
    },
  ],
  whenToUse: [
    "Between groups of related content where the division itself carries meaning — it is announced as a separator by assistive technology.",
    "Between inline items in a toolbar-like row (vertical form).",
  ],
  whenNotToUse: [
    "For purely visual division between layout areas — a border on the region is simpler and adds nothing to the accessibility tree.",
    "Inside a Menu — Menu.Separator exists for that and is already styled for menu padding.",
  ],
  accessibility: [
    "Renders a native <hr>, which has the separator role built in.",
    "The vertical form adds aria-orientation=\"vertical\" so the division is announced correctly in horizontal flows.",
  ],
  props: [
    {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      default: `"horizontal"`,
      description: "Direction of the rule.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLHRElement>",
      description: "All native <hr> props are forwarded.",
    },
  ],
};

export default doc;
