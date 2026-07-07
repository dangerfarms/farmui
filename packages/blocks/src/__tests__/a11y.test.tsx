import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { ReactElement } from "react";

import {
  Hero,
  FeatureGrid,
  BentoGrid,
  StatsGroup,
  LogoWall,
  Testimonials,
  PricingTable,
  CTASection,
  FAQ,
  Newsletter,
  Footer,
} from "../index";

afterEach(cleanup);

// jsdom can't compute colour-contrast — that's checked live in a real browser.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

const cases: Array<[string, ReactElement]> = [
  [
    "Hero",
    <Hero
      eyebrow="New"
      title="Ship your landing page today"
      description="Composable, accessible sections built on modern CSS."
      actions={[{ label: "Get started", href: "/docs" }]}
    />,
  ],
  [
    "FeatureGrid",
    <FeatureGrid
      title="Why FarmUI"
      features={[
        { icon: "⚡", title: "Fast", description: "Zero-runtime styling." },
        { icon: "♿", title: "Accessible", description: "WCAG by default." },
      ]}
    />,
  ],
  [
    "BentoGrid",
    <BentoGrid
      title="Everything included"
      items={[
        { title: "Themeable", description: "CSS variables.", span: 2 },
        { title: "Semantic", description: "Real HTML." },
      ]}
    />,
  ],
  [
    "StatsGroup",
    <StatsGroup
      stats={[
        { value: "33+", label: "Components" },
        { value: "0kb", label: "Runtime" },
      ]}
    />,
  ],
  [
    "LogoWall",
    <LogoWall
      title="Trusted by teams"
      logos={[
        { src: "/a.svg", alt: "Acme" },
        { src: "/b.svg", alt: "Globex" },
      ]}
    />,
  ],
  [
    "Testimonials",
    <Testimonials
      title="Loved by developers"
      items={[
        { quote: "It just works.", author: "Ada Lovelace", role: "Engineer" },
        { quote: "Beautiful defaults.", author: "Alan Turing" },
      ]}
    />,
  ],
  [
    "PricingTable",
    <PricingTable
      title="Pricing"
      plans={[
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          features: ["Everything", "Forever"],
          action: { label: "Start", href: "/start" },
        },
        {
          name: "Pro",
          price: "$12",
          period: "/mo",
          features: ["More", "Support"],
          action: { label: "Upgrade", href: "/pro" },
          highlighted: true,
        },
      ]}
    />,
  ],
  [
    "CTASection",
    <CTASection
      title="Ready to build?"
      description="Install and ship today."
      actions={[{ label: "Get started", href: "/docs" }]}
    />,
  ],
  [
    "FAQ",
    <FAQ
      title="Questions"
      items={[
        { question: "Is it free?", answer: "Yes, MIT-licensed." },
        { question: "Does it theme?", answer: "Override --fui-* tokens." },
      ]}
    />,
  ],
  ["Newsletter", <Newsletter title="Stay in the loop" action="/subscribe" />],
  [
    "Footer",
    <Footer
      brand="FarmUI"
      tagline="Modern React components."
      columns={[
        {
          title: "Docs",
          links: [{ label: "Intro", href: "/docs" }],
        },
      ]}
      bottom="© 2026 FarmUI"
    />,
  ],
];

describe("blocks accessibility (axe)", () => {
  it.each(cases)("%s has no axe violations", async (_name, ui) => {
    const { container } = render(ui);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
