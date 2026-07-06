import { Button } from "@farmui/core";
import { CodeBlock } from "@/docs/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Theming",
  description: "Rebrand FarmUI with plain CSS variables.",
};

export default function Theming() {
  return (
    <div className={prose.prose}>
      <h1>Theming</h1>
      <p className={prose.lead}>
        FarmUI is themed entirely with CSS custom properties. Override{" "}
        <code>--fui-*</code> tokens on <code>:root</code> — or any scope — and
        every component updates. No <code>ThemeProvider</code>, no JavaScript.
      </p>

      <h2>Rebrand in one line</h2>
      <p>
        The single most important token is <code>--fui-primary</code>. Change it
        and the whole library follows:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`:root {
  --fui-primary: oklch(0.62 0.2 275);       /* violet */
  --fui-primary-hover: oklch(0.55 0.2 275);
  --fui-primary-active: oklch(0.48 0.19 275);
}`}
        />
      </div>

      <p>Scope it to a subtree to theme just part of a page:</p>
      <div className={prose.block}>
        <div
          style={
            {
              "--fui-primary": "oklch(0.62 0.2 275)",
              "--fui-primary-hover": "oklch(0.55 0.2 275)",
              "--fui-primary-active": "oklch(0.48 0.19 275)",
              "--fui-primary-soft": "oklch(0.95 0.03 275)",
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              padding: "1.5rem",
              border: "1px solid var(--fui-border)",
              borderRadius: "var(--fui-radius-lg)",
            } as React.CSSProperties
          }
        >
          <Button>Violet primary</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <h2>Dark mode</h2>
      <p>
        Dark mode is native. Tokens are defined with CSS{" "}
        <code>light-dark()</code>, so switching themes is just switching{" "}
        <code>color-scheme</code>. FarmUI wires this to a{" "}
        <code>data-theme</code> attribute:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="js"
          code={`// Flip the whole app
document.documentElement.dataset.theme = "dark";
// or "light" — omit to follow the OS preference`}
        />
      </div>

      <h2>Token reference</h2>
      <p>The most useful tokens to override:</p>
      <ul>
        <li>
          <code>--fui-primary</code> / <code>--fui-primary-hover</code> /{" "}
          <code>--fui-primary-active</code> — brand color
        </li>
        <li>
          <code>--fui-bg</code>, <code>--fui-surface</code>,{" "}
          <code>--fui-text</code>, <code>--fui-border</code> — surfaces &amp;
          text
        </li>
        <li>
          <code>--fui-radius-md</code>, <code>--fui-radius-lg</code> — corner
          rounding
        </li>
        <li>
          <code>--fui-font-sans</code> — the UI font family
        </li>
      </ul>

      <div className={prose.callout}>
        Because tokens cascade, you can even theme per-tenant or per-section by
        setting variables on a wrapper element — perfect for white-label apps.
      </div>
    </div>
  );
}
