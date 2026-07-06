import Link from "next/link";
import { CodeBlock } from "@/docs/CodeBlock";
import { COMPONENTS } from "@/site/nav";
import prose from "./prose.module.css";

export const metadata = {
  title: "Introduction",
  description:
    "FarmUI is a fully-featured React component library rebuilt on native modern CSS.",
};

export default function DocsIntro() {
  return (
    <div className={prose.prose}>
      <h1>Introduction</h1>
      <p className={prose.lead}>
        FarmUI is a fully-featured React component library focused on
        accessibility and performance — WCAG-compliant components, zero-runtime
        styling on native modern CSS, and tiny bundles.
      </p>

      <h2>Why FarmUI?</h2>
      <p>
        Most component libraries ship a styling engine to your users&rsquo;
        browsers. FarmUI doesn&rsquo;t. Every component is styled with plain CSS
        — cascade layers, custom properties, <code>light-dark()</code>,{" "}
        <code>color-mix()</code>, container queries and logical properties — so
        there&rsquo;s nothing to run at runtime and nothing extra to download.
      </p>
      <ul>
        <li>
          <strong>Zero-runtime.</strong> Styles are static CSS. No CSS-in-JS, no
          serialization cost, fully compatible with React Server Components.
        </li>
        <li>
          <strong>Themeable with variables.</strong> Rebrand the whole library
          by overriding <code>--fui-*</code> tokens. No provider required.
        </li>
        <li>
          <strong>Native dark mode.</strong> Powered by CSS{" "}
          <code>light-dark()</code> — one toggle flips <code>color-scheme</code>
          .
        </li>
        <li>
          <strong>Accessible by default.</strong> Semantic HTML, focus
          management, and keyboard support baked in.
        </li>
        <li>
          <strong>{COMPONENTS.length}+ components</strong> across inputs, data
          display, feedback, overlays and navigation — and expanding.
        </li>
      </ul>

      <h2>Installation</h2>
      <p>Add the package and import the stylesheet once at your app root:</p>
      <div className={prose.block}>
        <CodeBlock language="bash" code={`pnpm add @farmui/core`} />
      </div>
      <div className={prose.block}>
        <CodeBlock
          code={`// app/layout.tsx
import "@farmui/core/styles.css";
import { Button } from "@farmui/core";

export default function Page() {
  return <Button>Get started</Button>;
}`}
        />
      </div>

      <div className={prose.callout}>
        That&rsquo;s the whole setup. No provider, no config. See the{" "}
        <Link href="/docs/installation">installation guide</Link> for framework
        specifics, or jump into <Link href="/docs/theming">theming</Link>.
      </div>

      <h2>Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/installation">Installation</Link> — framework guides
          for Next.js, Vite and more.
        </li>
        <li>
          <Link href="/docs/theming">Theming</Link> — rebrand FarmUI with CSS
          variables.
        </li>
        <li>
          <Link href="/docs/components/button">Browse components</Link> — live
          examples and props for every component.
        </li>
      </ul>
    </div>
  );
}
