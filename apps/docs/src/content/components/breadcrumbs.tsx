import { Breadcrumbs } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "breadcrumbs",
  name: "Breadcrumbs",
  category: "Navigation",
  description:
    "Show the path to the current page and let users step back up it.",
  importLine: `import { Breadcrumbs } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description: "The last item is marked as the current page.",
      code: `<Breadcrumbs>
  <a href="/">Home</a>
  <a href="/settings">Settings</a>
  <span>Billing</span>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <a href="/">Home</a>
          <a href="/settings">Settings</a>
          <span>Billing</span>
        </Breadcrumbs>
      ),
    },
    {
      title: "Custom separator",
      description: "Pass any node as the separator between items.",
      code: `<Breadcrumbs separator="→">
  <a href="/">Home</a>
  <a href="/projects">Projects</a>
  <span>Website Redesign</span>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs separator="→">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <span>Website Redesign</span>
        </Breadcrumbs>
      ),
    },
    {
      title: "Long path",
      description: "Items wrap onto multiple lines on narrow screens.",
      code: `<Breadcrumbs>
  <a href="/">Home</a>
  <a href="/catalog">Catalog</a>
  <a href="/catalog/laptops">Laptops</a>
  <a href="/catalog/laptops/ultrabooks">Ultrabooks</a>
  <span>Aurora 14 Pro</span>
</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <a href="/">Home</a>
          <a href="/catalog">Catalog</a>
          <a href="/catalog/laptops">Laptops</a>
          <a href="/catalog/laptops/ultrabooks">Ultrabooks</a>
          <span>Aurora 14 Pro</span>
        </Breadcrumbs>
      ),
    },
  ],
  props: [
    {
      name: "separator",
      type: "ReactNode",
      default: `"/"`,
      description: "Node inserted between each breadcrumb item.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "The breadcrumb items — links or plain text nodes.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <nav> props are forwarded.",
    },
  ],
};

export default doc;
