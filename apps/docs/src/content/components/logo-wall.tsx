import { LogoWall } from "@farmui/blocks";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "logo-wall",
  name: "LogoWall",
  category: "Blocks",
  pkg: "blocks",
  description:
    "A muted, wrapping row of customer logos that lift out of grayscale on hover.",
  importLine: `import { LogoWall } from "@farmui/blocks";`,
  demos: [
    {
      title: "With caption",
      description:
        "Pass inline SVG via each logo's `node` prop for crisp, self-contained marks. Every logo still needs an `alt` label.",
      code: `<LogoWall
  title="Trusted by leading teams"
  logos={[
    { alt: "Acme", node: <AcmeMark /> },
    { alt: "Globex", node: <GlobexMark /> },
    { alt: "Initech", node: <InitechMark /> },
    { alt: "Umbrella", node: <UmbrellaMark /> },
  ]}
/>`,
      render: () => (
        <LogoWall
          title="Trusted by leading teams"
          logos={[
            {
              alt: "Acme",
              node: (
                <svg width="96" height="28" viewBox="0 0 96 28" aria-hidden>
                  <rect
                    width="96"
                    height="28"
                    rx="6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text
                    x="48"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="700"
                    fontSize="14"
                    fill="currentColor"
                  >
                    ACME
                  </text>
                </svg>
              ),
            },
            {
              alt: "Globex",
              node: (
                <svg width="104" height="28" viewBox="0 0 104 28" aria-hidden>
                  <circle cx="16" cy="14" r="9" fill="currentColor" />
                  <text
                    x="60"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    fontSize="14"
                    fill="currentColor"
                  >
                    Globex
                  </text>
                </svg>
              ),
            },
            {
              alt: "Initech",
              node: (
                <svg width="100" height="28" viewBox="0 0 100 28" aria-hidden>
                  <text
                    x="50"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontStyle="italic"
                    fontWeight="700"
                    fontSize="15"
                    fill="currentColor"
                  >
                    Initech
                  </text>
                </svg>
              ),
            },
            {
              alt: "Umbrella",
              node: (
                <svg width="112" height="28" viewBox="0 0 112 28" aria-hidden>
                  <path d="M6 20 L14 6 L22 20 Z" fill="currentColor" />
                  <text
                    x="68"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    fontSize="14"
                    fill="currentColor"
                  >
                    Umbrella
                  </text>
                </svg>
              ),
            },
          ]}
        />
      ),
    },
    {
      title: "From image URLs",
      description:
        "When you have hosted image files, pass `src` instead of `node`. `alt` is required either way.",
      code: `<LogoWall
  logos={[
    { src: "/logos/northwind.svg", alt: "Northwind" },
    { src: "/logos/contoso.svg", alt: "Contoso" },
    { src: "/logos/fabrikam.svg", alt: "Fabrikam" },
  ]}
/>`,
      render: () => (
        <LogoWall
          logos={[
            {
              alt: "Northwind",
              node: (
                <svg width="120" height="28" viewBox="0 0 120 28" aria-hidden>
                  <text
                    x="60"
                    y="19"
                    textAnchor="middle"
                    fontFamily="serif"
                    fontWeight="700"
                    fontSize="15"
                    fill="currentColor"
                  >
                    Northwind
                  </text>
                </svg>
              ),
            },
            {
              alt: "Contoso",
              node: (
                <svg width="104" height="28" viewBox="0 0 104 28" aria-hidden>
                  <rect
                    x="4"
                    y="8"
                    width="12"
                    height="12"
                    fill="currentColor"
                  />
                  <text
                    x="60"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    fontSize="14"
                    fill="currentColor"
                  >
                    Contoso
                  </text>
                </svg>
              ),
            },
            {
              alt: "Fabrikam",
              node: (
                <svg width="108" height="28" viewBox="0 0 108 28" aria-hidden>
                  <text
                    x="54"
                    y="19"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="800"
                    fontSize="14"
                    letterSpacing="1"
                    fill="currentColor"
                  >
                    FABRIKAM
                  </text>
                </svg>
              ),
            },
          ]}
        />
      ),
    },
  ],
  props: [
    {
      name: "logos",
      type: "Logo[]",
      description:
        "The logos to render, where Logo = { alt: string; src?: string; node?: ReactNode }. Provide `src` for an <img>, or `node` for a custom mark (e.g. inline SVG); `alt` is always required. Required.",
    },
    {
      name: "title",
      type: "ReactNode",
      description: `Small centered caption above the logos, e.g. "Trusted by leading teams".`,
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLElement>",
      description: "All native <section> props are forwarded.",
    },
  ],
};

export default doc;
