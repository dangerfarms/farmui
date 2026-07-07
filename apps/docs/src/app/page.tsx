import Link from "next/link";
import { Button } from "@farmui/core";
import { CodeBlock } from "@/docs/CodeBlock";
import { COMPONENTS, componentsByCategory } from "@/site/nav";
import { ArrowRightIcon, BoltIcon, CheckIcon, GitHubIcon } from "@/site/Icons";
import { HeroShowcase, InstallSnippet } from "./home.client";
import c from "./home.module.css";

const STATS = [
  { num: `${COMPONENTS.length}+`, label: "Components" },
  { num: "32.4k", label: "GitHub stars" },
  { num: "1.9M", label: "Monthly downloads" },
  { num: "0kb", label: "Runtime CSS-in-JS" },
];

const FEATURES = [
  {
    title: "Semantic HTML",
    body: (
      <>
        Real elements — <code>&lt;details&gt;</code>,{" "}
        <code>&lt;nav&gt;&lt;ol&gt;</code>,{" "}
        <code>role=&quot;tablist&quot;</code>. The rendered markup is clean,
        meaningful and screen-reader friendly.
      </>
    ),
  },
  {
    title: "Zero runtime",
    body: (
      <>
        Styles are static CSS in cascade layers. Nothing executes in the browser
        — fully compatible with React Server Components.
      </>
    ),
  },
  {
    title: "Accessible by default",
    body: (
      <>
        WAI-ARIA patterns, focus management and full keyboard support are built
        into every component and tested against axe.
      </>
    ),
  },
  {
    title: "Modern CSS, everywhere",
    body: (
      <>
        Container queries, <code>color-mix()</code>, <code>light-dark()</code>,
        logical properties and <code>:where()</code> — Baseline features, not
        polyfills.
      </>
    ),
  },
  {
    title: "Theme with variables",
    body: (
      <>
        Rebrand by overriding <code>--fui-primary</code>. No provider, no theme
        objects — scope tokens to any subtree.
      </>
    ),
  },
  {
    title: "Tiny bundles",
    body: (
      <>
        No styling engine ships to your users. Atomic, deduplicated, cacheable
        CSS and tree-shakeable components.
      </>
    ),
  },
];

const SHOUTS = [
  "Zero dependencies",
  "RSC-ready",
  "No provider",
  "RTL-ready",
  "Respects reduced-motion",
  "Tree-shakeable",
  "TypeScript-first",
  "No build plugin",
];

const FARMUI_CODE = `import { Button } from "@farmui/core";

<Button variant="light">Save changes</Button>;`;

const TAILWIND_CODE = `// shadcn/ui + Tailwind — utilities inlined on every element
<button
  className="inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md text-sm font-medium
    transition-colors focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50
    bg-primary/10 text-primary hover:bg-primary/20 h-10 px-4"
>
  Save changes
</button>;`;

const TECHNIQUES = [
  {
    name: "light-dark()",
    desc: "One value, both themes — no duplicated theme objects.",
    code: "color: light-dark(#1a1a1a, #fafafa);",
  },
  {
    name: "color-mix()",
    desc: "Derive every hover and tint from a single token.",
    code: "color-mix(in oklch, var(--fui-primary) 12%, #0000)",
  },
  {
    name: "@container",
    desc: "Components respond to their container, not the viewport.",
    code: "@container (min-width: 20rem) { … }",
  },
  {
    name: ":has()",
    desc: "Style a parent from the state of its children.",
    code: ".field:has(:invalid) { border-color: red }",
  },
  {
    name: "logical properties",
    desc: "RTL-ready by default — no hardcoded left / right.",
    code: "padding-inline: 1rem; margin-block: 0.5rem;",
  },
  {
    name: "@layer",
    desc: "A predictable cascade — no specificity wars, no !important.",
    code: "@layer farmui.components { … }",
  },
  {
    name: "clamp()",
    desc: "Fluid type and spacing without a single media query.",
    code: "font-size: clamp(1rem, 2vw, 1.25rem);",
  },
  {
    name: "oklch()",
    desc: "Perceptually even, wide-gamut color you can reason about.",
    code: "--fui-primary: oklch(0.6 0.15 148);",
  },
];

export default function HomePage() {
  const categories = componentsByCategory();

  return (
    <>
      {/* Hero */}
      <section className={c.hero}>
        <div className={c.heroBg} />
        <div className={`container ${c.heroGrid}`}>
          <div>
            <span className={c.badgeRow}>
              <span className={c.badgePill}>v1.0</span>
              Accessibility-first, zero-runtime
            </span>
            <h1 className={c.title}>
              Beautiful React components,{" "}
              <span className="brandText">fast &amp; accessible.</span>
            </h1>
            <p className={c.subtitle}>
              FarmUI is a fully-featured component library — the most
              accessible, best-performing components you can install.
              Zero-runtime styling, WCAG-compliant by default, and tiny bundles.
            </p>
            <div className={c.ctaRow}>
              <Link href="/docs" className={c.btnLink}>
                Get started <ArrowRightIcon width={16} height={16} />
              </Link>
              <a
                href="https://github.com/dangerfarms/farmui"
                target="_blank"
                rel="noreferrer"
                className={`${c.btnLink} ${c.btnLinkGhost}`}
              >
                <GitHubIcon width={16} height={16} /> Star on GitHub
              </a>
            </div>
            <InstallSnippet />
          </div>
          <div className={c.heroArt}>
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className={c.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={c.stat}>
              <div className={`${c.statNum} brandText`}>{s.num}</div>
              <div className={c.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">
            <BoltIcon width={14} height={14} /> Why FarmUI
          </span>
          <h2 className={c.sectionTitle}>
            Everything you loved about Mantine, minus the runtime.
          </h2>
          <p className={c.sectionSub}>
            We kept the component API you know and rebuilt the styling layer on
            the modern CSS platform.
          </p>
        </div>
        <div className={c.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={c.feature}>
              <span className={c.featureIcon} aria-hidden>
                <BoltIcon width={18} height={18} />
              </span>
              <h3 className={c.featureTitle}>{f.title}</h3>
              <p className={c.featureText}>{f.body}</p>
            </div>
          ))}
        </div>
        <ul className={c.shouts}>
          {SHOUTS.map((s) => (
            <li key={s} className={c.shout}>
              <CheckIcon width={13} height={13} /> {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">See the difference</span>
          <h2 className={c.sectionTitle}>Same button. Cleaner everything.</h2>
          <p className={c.sectionSub}>
            FarmUI keeps styling in one shared, cacheable stylesheet — your
            markup stays readable. Utility frameworks inline dozens of classes
            onto every element; runtime CSS-in-JS serializes styles on each
            render.
          </p>
        </div>
        <div className={c.compare}>
          <div className={c.compareCol} data-good>
            <div className={c.compareHead}>
              <span className={c.compareTag}>FarmUI</span>
              <Button variant="light">Save changes</Button>
            </div>
            <CodeBlock code={FARMUI_CODE} />
            <p className={c.compareNote}>
              One prop. Styles live in shared CSS — <strong>0&nbsp;kb</strong>{" "}
              runtime, works with any build tool.
            </p>
          </div>
          <div className={c.compareCol}>
            <div className={c.compareHead}>
              <span className={c.compareTag} data-alt>
                shadcn / Tailwind
              </span>
              <button className={c.rawBtn}>Save changes</button>
            </div>
            <CodeBlock code={TAILWIND_CODE} language="jsx" />
            <p className={c.compareNote}>
              ~15 utility classes on the element, repeated everywhere, plus a
              build step to generate them.
            </p>
          </div>
        </div>
      </section>

      {/* Modern CSS techniques */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">Under the hood</span>
          <h2 className={c.sectionTitle}>Modern CSS, put to work.</h2>
          <p className={c.sectionSub}>
            No abstractions over the platform — FarmUI ships the same modern CSS
            features you&rsquo;d reach for by hand, so nothing runs at runtime.
          </p>
        </div>
        <ul className={c.tech}>
          {TECHNIQUES.map((t) => (
            <li key={t.name} className={c.techCard}>
              <code className={c.techName}>{t.name}</code>
              <p className={c.techDesc}>{t.desc}</p>
              <pre className={c.techCode}>{t.code}</pre>
            </li>
          ))}
        </ul>
      </section>

      {/* Theming split */}
      <section className={`container ${c.section}`}>
        <div className={c.split}>
          <div>
            <span className="eyebrow">Theming</span>
            <h2 className={c.sectionTitle}>Rebrand in one line of CSS.</h2>
            <p className={c.sectionSub}>
              No <code>ThemeProvider</code>, no theme objects. FarmUI is themed
              with CSS custom properties, so a single token change flows through
              every component.
            </p>
            <ul className={c.splitList}>
              {[
                "Override --fui-primary to rebrand instantly",
                "Scope tokens to any subtree for white-label apps",
                "Native light & dark via light-dark()",
              ].map((item) => (
                <li key={item} className={c.splitItem}>
                  <span className={c.splitCheck} aria-hidden>
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            language="css"
            code={`/* Your brand, everywhere */
:root {
  --fui-primary: oklch(0.62 0.2 275);
  --fui-radius-md: 0.75rem;
  --fui-font-sans: "Satoshi";
}

/* White-label a single section */
.tenant-acme {
  --fui-primary: oklch(0.65 0.18 25);
}`}
          />
        </div>
      </section>

      {/* Component categories */}
      <section className={`container ${c.section}`}>
        <div className={`${c.sectionHead} ${c.center}`}>
          <span className="eyebrow">The library</span>
          <h2 className={c.sectionTitle}>
            {COMPONENTS.length}+ components, ready to ship.
          </h2>
          <p className={c.sectionSub}>
            Inputs, data display, feedback, overlays and navigation — accessible
            and themeable out of the box.
          </p>
        </div>
        <div className={c.cats}>
          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`/docs/components/${cat.items[0]?.slug ?? "button"}`}
              className={c.cat}
            >
              <div className={c.catTitle}>{cat.category}</div>
              <div className={c.catItems}>
                {cat.items.map((i) => i.name).join(" · ")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blocks */}
      <section className={`container ${c.section}`}>
        <div className={c.split}>
          <div>
            <span className="eyebrow">@farmui/blocks</span>
            <h2 className={c.sectionTitle}>
              Ship whole sections, not just parts.
            </h2>
            <p className={c.sectionSub}>
              A companion package of ready-made, data-driven page sections —
              hero, features, pricing, testimonials, FAQ and more. Pass your
              content, get a polished, accessible section on the same tokens.
            </p>
            <ul className={c.shouts} style={{ justifyContent: "flex-start" }}>
              {[
                "Hero",
                "FeatureGrid",
                "BentoGrid",
                "PricingTable",
                "Testimonials",
                "StatsGroup",
                "LogoWall",
                "FAQ",
                "Newsletter",
                "Footer",
              ].map((b) => (
                <li key={b} className={c.shout}>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginBlockStart: "1.75rem" }}>
              <Link
                href="/docs/components/hero"
                className={`${c.btnLink} ${c.btnLinkGhost}`}
              >
                Browse blocks <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
          </div>
          <CodeBlock
            language="tsx"
            code={`import "@farmui/blocks/styles.css";
import { Hero, PricingTable } from "@farmui/blocks";

<Hero
  title="Ship your landing page today"
  description="Composable sections built on modern CSS."
  actions={[{ label: "Get started", href: "/docs" }]}
/>;`}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className={c.cta}>
          <h2 className={c.ctaTitle}>Ready to build something great?</h2>
          <p className={c.ctaSub}>
            Install FarmUI and ship a polished, accessible, fast UI this
            afternoon.
          </p>
          <div className={c.ctaRowCenter}>
            <Link href="/docs" className={c.btnLink}>
              Read the docs <ArrowRightIcon width={16} height={16} />
            </Link>
            <Link
              href="/docs/components/button"
              className={`${c.btnLink} ${c.btnLinkGhost}`}
            >
              Browse components
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
