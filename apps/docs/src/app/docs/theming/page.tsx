import { Button, Checkbox } from "@farmui/core";
import { CodeBlock } from "@/docs/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Theming & styling",
  description:
    "Rebrand FarmUI with CSS variables, and override anything by targeting its layered class names.",
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
        The single most important token is <code>--fui-primary</code>. It is
        genuinely one line — hover and active states are <em>derived</em>{" "}
        from it, so there are no companion tokens to keep in sync:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`:root {
  --fui-primary: oklch(0.62 0.2 275); /* violet */
}`}
        />
      </div>
      <p>
        The brand colour appears wherever the design says primary: focus
        rings, checked states, carets, text selection, and{" "}
        <code>primary</code> context regions. (Buttons are neutral by
        default — the demo below is wrapped in a primary region so you can
        see the change.) Scope the token to a subtree to theme just part of
        a page:
      </p>
      <div className={prose.block}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div
            style={
              {
                "--fui-context": "primary",
                padding: "1.5rem",
                border: "1px solid var(--fui-border)",
                borderRadius: "var(--fui-radius-lg)",
              } as React.CSSProperties
            }
          >
            <Button>Default brand</Button>
          </div>
          <div
            style={
              {
                "--fui-primary":
                  "light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275))",
                "--fui-primary-soft":
                  "light-dark(oklch(0.95 0.03 275), oklch(0.32 0.06 275))",
                "--fui-context": "primary",
                padding: "1.5rem",
                border: "1px solid var(--fui-border)",
                borderRadius: "var(--fui-radius-lg)",
              } as React.CSSProperties
            }
          >
            <Button>Violet brand</Button>
          </div>
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

      <h2>Contexts</h2>
      <p>
        A <strong>context</strong> declares what a region <em>means</em>, as a
        custom property (<code>--fui-context</code>) read by container style
        queries — and every FarmUI component inside adopts it. No component
        contains context code; the cascade does the work (see the{" "}
        <a href="/docs/contextualism">Contextualism guide</a>):
      </p>
      <div className={prose.block}>
        <div
          style={
            {
              "--fui-context": "danger",
              display: "grid",
              gap: "0.75rem",
              padding: "1.25rem",
              border: "1px solid var(--fui-border)",
              borderRadius: "var(--fui-radius-lg)",
              maxInlineSize: "26rem",
            } as React.CSSProperties
          }
        >
          <strong>Delete workspace</strong>
          <Checkbox label="I understand this is permanent" defaultChecked />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Button>Delete</Button>
            <Button>Cancel</Button>
          </div>
        </div>
      </div>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* the idiomatic form: a named region declares its meaning in
   its own stylesheet (a style attribute works for one-offs) */
.danger-zone {
  --fui-context: danger;
}`}
        />
      </div>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<section className="danger-zone">
  {/* everything inside adopts the danger accent: buttons, checked
      states, carets, text selection — even focus rings */}
  <Checkbox label="I understand this is permanent" />
  <Button>Delete</Button>
</section>`}
        />
      </div>
      <p>
        Contexts remap <em>semantic colour tokens only</em> — never spacing,
        sizing, or layout. The vocabulary is <code>primary</code>,{" "}
        <code>danger</code>, <code>success</code>, <code>warning</code> and{" "}
        <code>info</code>, and no component has a variant or colour prop —
        anywhere. The status components (Alert, Badge, Loader, Progress)
        declare their meaning the same way as everything else.
      </p>
      <p>
        A single danger button is a one-element region — a wrapper (
        <code>{`<span style={{ "--fui-context": "danger" }}><Button>Delete</Button></span>`}</code>
        ), because a style query is answered by ancestors, never by the
        element that declares the property. The property inherits, so the
        nearest ancestor that sets it wins.
      </p>
      <p>
        An inverted &ldquo;on-dark&rdquo; section needs no context at all —
        set <code>color-scheme: dark</code> on the region and every{" "}
        <code>light-dark()</code> token flips. One caveat: colours already
        resolved on an ancestor inherit as resolved values and don&rsquo;t
        re-resolve, so the inverted region must also re-declare{" "}
        <code>color</code> (e.g. <code>color: var(--fui-text)</code>) for
        descendants to pick up the flipped value.
      </p>
      <div className={prose.callout}>
        Theme, context, and instance are one mechanism at three scopes: remap
        tokens on <code>:root</code> to set a brand, declare a context on a
        region to give it meaning, set a property on an instance to override
        one control.
      </div>

      <h2>Token reference</h2>
      <p>The most useful tokens to override:</p>
      <ul>
        <li>
          <code>--fui-primary</code> / <code>--fui-primary-soft</code> —
          brand colour and its soft tint (hover/active are derived; there is
          nothing else to sync)
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
          <code>--fui-font-sans</code> — the UI font family (an input hook:
          unset by default, and anything you set flows through the whole
          stack)
        </li>
        <li>
          <code>--fui-duration-sm/md/lg</code>, <code>--fui-ease</code> —
          motion, by intent: micro feedback, defaults, overlay enter/exit
        </li>
      </ul>

      <h2>Fluid type &amp; spacing</h2>
      <p>
        The type (<code>--fui-text-xs</code>…<code>3xl</code>) and spacing (
        <code>--fui-space-xs</code>…<code>xl</code>) scales are fluid{" "}
        <code>clamp()</code> values in container units (<code>cqi</code>),
        generated with{" "}
        <a href="https://utopia.fyi">Utopia</a> — the calculator parameters are
        committed as comments in <code>tokens.css</code>. Without a container
        they respond to the viewport; declare one on any region to make its
        FarmUI typography respond to <em>that region&rsquo;s</em> width
        instead:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`.sidebar {
  container-type: inline-size; /* FarmUI text in here now scales to the sidebar */
}`}
        />
      </div>
      <p>
        Corner radii are deliberately <em>not</em> fluid — rounding
        shouldn&rsquo;t breathe. Control heights aren&rsquo;t tokens at all:
        buttons and form controls share one derived anatomy (padding +
        line-height + border), so they align by construction at every
        container width.
      </p>

      <div className={prose.callout}>
        Because tokens cascade, you can theme per-brand or per-section by
        setting variables on any wrapper element — the whole theme is just
        values in the cascade.
      </div>

      <h2>Extending &amp; overriding styles</h2>
      <p>
        Tokens cover most theming. When you need to change something a token
        doesn&rsquo;t expose, FarmUI gives you three escape hatches — and none
        of them need <code>!important</code>.
      </p>

      <h3>1. Target the class names</h3>
      <p>
        Every element has a stable, prefixed class —{" "}
        <code>.fui-Button-root</code>, <code>.fui-Input-field</code>,{" "}
        <code>.fui-Card-root</code>, and so on. Because FarmUI&rsquo;s styles
        live inside a CSS <code>@layer</code>, any rule you write{" "}
        <em>outside</em> a layer automatically beats them — you never fight
        specificity:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Unlayered CSS always wins over FarmUI's layered CSS — no !important */
.fui-Button-root {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.fui-Card-root {
  box-shadow: 0 10px 40px -12px rgb(0 0 0 / 0.25);
}`}
        />
      </div>

      <h3>2. Add your own className</h3>
      <p>
        Every component forwards <code>className</code> and <code>style</code>{" "}
        (and all native DOM props) to its root element, so you can scope
        overrides to specific instances:
      </p>
      <div className={prose.block}>
        <CodeBlock code={`<Button className="cta">Subscribe</Button>`} />
      </div>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`.cta {
  border-radius: 999px;
  padding-inline: 2rem;
}`}
        />
      </div>

      <h3>3. Order your own layer</h3>
      <p>
        Prefer explicit control over the cascade? Declare a layer <em>after</em>{" "}
        FarmUI&rsquo;s and put your overrides there — they win by layer order,
        no matter the selector specificity:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Declare the full order once — correct wherever it appears,
   before or after importing FarmUI's stylesheet. */
@layer farmui.reset, farmui.tokens, farmui.elements, farmui.layout,
  farmui.components, app;

@layer app {
  .fui-Tabs-tab {
    font-weight: 600;
  }
}`}
        />
      </div>

      <div className={prose.callout}>
        The class names (<code>.fui-&lt;Component&gt;-&lt;part&gt;</code>) are a
        stable, documented API — you&rsquo;ll find the full stylesheet for each
        component under the <strong>CSS</strong> tab on its docs page.
      </div>
    </div>
  );
}
