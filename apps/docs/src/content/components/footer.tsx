import { Footer } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "footer",
  name: "Footer",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A site footer with a brand area, grouped link columns, and a bottom bar.",
  importLine: `import { Footer } from "@farmui/blocks";`,
  demos: [
    {
      title: "Brand, columns & bottom bar",
      description:
        "The lead column carries the brand mark and tagline; the nav holds grouped link columns; the bottom bar takes a copyright line.",
      code: `<Footer
  brand="FarmUI"
  tagline="The operating system for the modern farm."
  columns={[
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "Guides", href: "/guides" },
        { label: "API reference", href: "/api" },
        { label: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
      ],
    },
  ]}
  bottom="© 2026 FarmUI, Inc. All rights reserved."
/>`,
      render: () => (
        <Footer
          brand="FarmUI"
          tagline="The operating system for the modern farm."
          columns={[
            {
              title: "Product",
              links: [
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Integrations", href: "/integrations" },
                { label: "Changelog", href: "/changelog" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Docs", href: "/docs" },
                { label: "Guides", href: "/guides" },
                { label: "API reference", href: "/api" },
                { label: "Status", href: "/status" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Security", href: "/security" },
              ],
            },
          ]}
          bottom="© 2026 FarmUI, Inc. All rights reserved."
        />
      ),
    },
    {
      title: "Columns only",
      description:
        "Brand, tagline, and bottom bar are all optional — pass just columns for a lean link footer.",
      code: `<Footer
  columns={[
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Contact us", href: "/contact" },
      ],
    },
  ]}
/>`,
      render: () => (
        <Footer
          columns={[
            {
              title: "Explore",
              links: [
                { label: "Home", href: "/" },
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help center", href: "/help" },
                { label: "Contact us", href: "/contact" },
              ],
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "columns",
      type: "FooterColumn[]",
      description:
        "Grouped navigation link columns. FooterColumn = { title: ReactNode, links: { label: ReactNode, href: string }[] }.",
    },
    {
      name: "brand",
      type: "ReactNode",
      description: "Brand mark or logo shown in the lead column.",
    },
    {
      name: "tagline",
      type: "ReactNode",
      description: "Short supporting line beneath the brand.",
    },
    {
      name: "bottom",
      type: "ReactNode",
      description: "The bottom bar content (e.g. a copyright line).",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <footer> props are forwarded.",
    },
  ],
};

export default doc;
