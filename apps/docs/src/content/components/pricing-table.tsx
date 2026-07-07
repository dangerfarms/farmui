import { PricingTable } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "pricing-table",
  name: "PricingTable",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A responsive grid of pricing plan cards, with an optional highlighted plan.",
  importLine: `import { PricingTable } from "@farmui/blocks";`,
  demos: [
    {
      title: "Three tiers",
      description:
        "A standard good/better/best layout. The middle plan is highlighted with a border and a “Popular” badge.",
      code: `<PricingTable
  eyebrow="Pricing"
  title="Plans that grow with your farm"
  description="Start free, upgrade when you need more acreage and seats. No hidden fees."
  plans={[
    {
      name: "Starter",
      price: "$0",
      period: "/mo",
      description: "For hobby plots and getting a feel for the platform.",
      features: ["Up to 5 fields", "1 team member", "Community support", "Weekly weather digest"],
      action: { label: "Get started", href: "/signup" },
    },
    {
      name: "Grower",
      price: "$49",
      period: "/mo",
      description: "For working farms that need daily insights and collaboration.",
      features: [
        "Unlimited fields",
        "10 team members",
        "Real-time soil & weather alerts",
        "Yield forecasting",
        "Priority email support",
      ],
      action: { label: "Start free trial", href: "/signup?plan=grower" },
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For co-ops and multi-site operations with advanced needs.",
      features: [
        "Everything in Grower",
        "Unlimited team members",
        "SSO & audit logs",
        "Dedicated agronomist",
        "99.9% uptime SLA",
      ],
      action: { label: "Contact sales", href: "/contact", variant: "outline" },
    },
  ]}
/>`,
      render: () => (
        <PricingTable
          eyebrow="Pricing"
          title="Plans that grow with your farm"
          description="Start free, upgrade when you need more acreage and seats. No hidden fees."
          plans={[
            {
              name: "Starter",
              price: "$0",
              period: "/mo",
              description:
                "For hobby plots and getting a feel for the platform.",
              features: [
                "Up to 5 fields",
                "1 team member",
                "Community support",
                "Weekly weather digest",
              ],
              action: { label: "Get started", href: "/signup" },
            },
            {
              name: "Grower",
              price: "$49",
              period: "/mo",
              description:
                "For working farms that need daily insights and collaboration.",
              features: [
                "Unlimited fields",
                "10 team members",
                "Real-time soil & weather alerts",
                "Yield forecasting",
                "Priority email support",
              ],
              action: {
                label: "Start free trial",
                href: "/signup?plan=grower",
              },
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              description:
                "For co-ops and multi-site operations with advanced needs.",
              features: [
                "Everything in Grower",
                "Unlimited team members",
                "SSO & audit logs",
                "Dedicated agronomist",
                "99.9% uptime SLA",
              ],
              action: {
                label: "Contact sales",
                href: "/contact",
                variant: "outline",
              },
            },
          ]}
        />
      ),
    },
    {
      title: "Two plans, wider cards",
      description:
        "Fewer plans read better as wider cards — bump minChildWidth so they don't stretch too thin.",
      code: `<PricingTable
  title="Simple, honest pricing"
  minChildWidth="22rem"
  plans={[
    {
      name: "Monthly",
      price: "$29",
      period: "/mo",
      description: "Billed month to month. Cancel any time.",
      features: ["All core features", "Up to 20 fields", "Email support"],
      action: { label: "Choose monthly", href: "/signup?billing=monthly" },
    },
    {
      name: "Annual",
      price: "$290",
      period: "/yr",
      description: "Two months free when you pay yearly.",
      features: ["All core features", "Up to 20 fields", "Email support", "Save $58 a year"],
      action: { label: "Choose annual", href: "/signup?billing=annual" },
      highlighted: true,
    },
  ]}
/>`,
      render: () => (
        <PricingTable
          title="Simple, honest pricing"
          minChildWidth="22rem"
          plans={[
            {
              name: "Monthly",
              price: "$29",
              period: "/mo",
              description: "Billed month to month. Cancel any time.",
              features: [
                "All core features",
                "Up to 20 fields",
                "Email support",
              ],
              action: {
                label: "Choose monthly",
                href: "/signup?billing=monthly",
              },
            },
            {
              name: "Annual",
              price: "$290",
              period: "/yr",
              description: "Two months free when you pay yearly.",
              features: [
                "All core features",
                "Up to 20 fields",
                "Email support",
                "Save $58 a year",
              ],
              action: {
                label: "Choose annual",
                href: "/signup?billing=annual",
              },
              highlighted: true,
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "plans",
      type: "PricingPlan[]",
      description:
        "The plans to display. PricingPlan = { name, price, period?, description?, features: ReactNode[], action: BlockAction, highlighted? }, where BlockAction = { label, href?, variant? }.",
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
      name: "minChildWidth",
      type: "string",
      default: `"17rem"`,
      description: "Minimum card width; the grid wraps responsively.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded (except title).",
    },
  ],
};

export default doc;
