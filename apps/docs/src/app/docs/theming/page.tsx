import { Button, Checkbox } from "@farmui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
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
        FarmUI is themed entirely with CSS custom properties. Override <code>--fui-*</code> tokens
        on <code>:root</code>, or any scope, and every component updates. No{" "}
        <code>ThemeProvider</code>, no JavaScript.
      </p>

      <h2>Rebrand in two lines</h2>
      <p>
        Two tokens carry the brand: <code>--fui-primary</code> and its soft tint{" "}
        <code>--fui-primary-soft</code>. Everything else — hover, active, solid fills, focus rings —
        is <em>derived</em> from them, so there is nothing else to keep in sync:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`:root {
  --fui-primary: light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275)); /* violet */
  --fui-primary-soft: light-dark(oklch(0.95 0.03 275), oklch(0.32 0.06 275));
}`}
        />
      </div>
      <p>
        The brand colour appears wherever the design says primary: focus rings, checked states,
        carets, text selection, and <code>primary</code> context regions. (Buttons are neutral by
        default; the demo below is wrapped in a primary region so you can see the change.) Scope the
        token to a subtree to theme just part of a page: the nearest declaration up the tree wins,
        so both cards below run identical CSS and differ only in where the token is set:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<div style={{ "--fui-context": "primary" }}>
  <Button>Default brand</Button>   {/* --fui-primary resolves at :root */}
</div>

<div style={{
  "--fui-primary": "light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275))",
  "--fui-primary-soft": "light-dark(oklch(0.95 0.03 275), oklch(0.32 0.06 275))",
  "--fui-context": "primary",
}}>
  <Button>Violet brand</Button>    {/* …resolves here instead */}
</div>`}
        />
      </div>
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
                "--fui-primary": "light-dark(oklch(0.62 0.2 275), oklch(0.72 0.17 275))",
                "--fui-primary-soft": "light-dark(oklch(0.95 0.03 275), oklch(0.32 0.06 275))",
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
        Dark mode is native. Tokens are defined with CSS <code>light-dark()</code> and the root
        declares <code>color-scheme: light dark</code>, so the user&apos;s OS preference is followed
        with no JavaScript and no configuration; that is the default state.
      </p>
      <p>
        The stylesheet can only speak once it has loaded. Add the matching meta tag so the browser
        paints the canvas in the right scheme <em>before</em> CSS arrives (otherwise dark-preference
        users get a flash of light canvas on every load):
      </p>
      <div className={prose.block}>
        <CodeBlock language="html" code={`<meta name="color-scheme" content="light dark" />`} />
      </div>
      <p>
        To override the preference, set <code>data-theme=&quot;dark&quot;</code> or{" "}
        <code>data-theme=&quot;light&quot;</code>: on the root for the whole app, or on any element
        for just that subtree (the attribute simply sets <code>color-scheme</code>, so every{" "}
        <code>light-dark()</code> token re-resolves there). Remove the attribute to follow the OS
        preference again.
      </p>
      <p>
        The same mechanism gives you an inverted &ldquo;on-dark&rdquo; section: set{" "}
        <code>data-theme=&quot;dark&quot;</code> on the region (or <code>color-scheme: dark</code>{" "}
        in its CSS; the attribute is just a setter for it) and every <code>light-dark()</code> token
        flips. One caveat: colours already resolved on an ancestor inherit as resolved values and
        don&rsquo;t re-resolve, so the inverted region must also re-declare <code>color</code> (e.g.{" "}
        <code>color: var(--fui-text)</code>) for descendants to pick up the flipped value.
      </p>
      <div className={prose.callout}>
        This is one instance of FarmUI&apos;s baseline posture:{" "}
        <strong>the user&apos;s stated preferences are the default.</strong> Colour scheme is
        followed natively, motion exists only inside{" "}
        <code>prefers-reduced-motion: no-preference</code>, and forced colour palettes are honoured
        rather than overridden. Everything beyond that baseline (a saved theme, an animation) is an
        explicit opt-in layered on top.
      </div>

      <h2>Contexts</h2>
      <p>
        A <strong>context</strong> declares what a region <em>means</em>, as a custom property (
        <code>--fui-context</code>) that every FarmUI component inside adopts. The mechanics — the
        vocabulary, one-element regions, why the property lives on an ancestor — are the{" "}
        <a href="/docs/contextualism">Contextualism guide</a>&apos;s subject; what matters for
        theming is that a context remaps <em>semantic colour tokens only</em>, so it composes with
        everything on this page:
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
          <Checkbox label="I understand this is permanent" />
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
      <div className={prose.callout}>
        Theme, context, and instance are one mechanism at three scopes: remap tokens on{" "}
        <code>:root</code> to set a brand, declare a context on a region to give it meaning, set a
        property on an instance to override one control.
      </div>

      <h2>Token reference</h2>
      <p>The most useful tokens to override:</p>
      <ul>
        <li>
          <code>--fui-primary</code> / <code>--fui-primary-soft</code>: brand colour and its soft
          tint (hover/active are derived; there is nothing else to sync)
        </li>
        <li>
          <code>--fui-bg</code>, <code>--fui-surface</code>, <code>--fui-text</code>,{" "}
          <code>--fui-border</code>: surfaces &amp; text
        </li>
        <li>
          <code>--fui-radius-md</code>, <code>--fui-radius-lg</code>: corner rounding
        </li>
        <li>
          <code>--fui-font-sans</code>: the UI font family (an input hook: unset by default, and
          anything you set flows through the whole stack)
        </li>
        <li>
          <code>--fui-duration-sm/md/lg</code>, <code>--fui-ease</code>: motion by intent (micro
          feedback, defaults, overlay enter/exit)
        </li>
      </ul>

      <h2>Fluid type &amp; spacing</h2>
      <p>
        The type (<code>--fui-text-xs</code>…<code>3xl</code>) and spacing (
        <code>--fui-space-xs</code>…<code>xl</code>) scales are fluid <code>clamp()</code> values in
        container units (<code>cqi</code>), generated with <a href="https://utopia.fyi">Utopia</a>;
        the calculator parameters are committed as comments in <code>tokens.css</code>. Without a
        container they respond to the viewport; declare one on any region to make its FarmUI
        typography respond to <em>that region&rsquo;s</em> width instead:
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
        Corner radii are deliberately <em>not</em> fluid: rounding shouldn&rsquo;t breathe. Control
        heights aren&rsquo;t tokens at all: buttons and form controls share one derived anatomy
        (padding + line-height + border), so they align by construction at every container width.
      </p>

      <div className={prose.callout}>
        Because tokens cascade, you can theme per-brand or per-section by setting variables on any
        wrapper element; the whole theme is just values in the cascade.
      </div>

      <h2>Extending &amp; overriding styles</h2>
      <p>
        Tokens cover most theming. When you need to change something a token doesn&rsquo;t expose,
        FarmUI gives you three escape hatches, and none of them need <code>!important</code>.
      </p>

      <h3>1. Target the class names</h3>
      <p>
        Every component's scope root has a stable, prefixed class: <code>.fui-Button</code>,{" "}
        <code>.fui-Card</code>, <code>.fui-Input-field</code>, and so on — the parts inside are
        plain elements and short classes, shown in each component&rsquo;s CSS tab. Because
        FarmUI&rsquo;s styles live inside a CSS <code>@layer</code>, any rule you write{" "}
        <em>outside</em> a layer automatically beats them; you never fight specificity:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Unlayered CSS always wins over FarmUI's layered CSS — no !important */
.fui-Button {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.fui-Card {
  box-shadow: 0 10px 40px -12px rgb(0 0 0 / 0.25);
}`}
        />
      </div>

      <h3>2. Add your own className</h3>
      <p>
        Every component forwards <code>className</code> and <code>style</code> (and all native DOM
        props) to its root element, so you can scope overrides to specific instances:
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
        Prefer explicit control over the cascade? Declare a layer <em>after</em> FarmUI&rsquo;s and
        put your overrides there; they win by layer order, no matter the selector specificity:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Declare the full order once — correct wherever it appears,
   before or after importing FarmUI's stylesheet. */
@layer farmui.reset, farmui.tokens, farmui.elements, farmui.layout,
  farmui.components, app;

@layer app {
  .fui-Tabs .tab {
    font-weight: 600;
  }
}`}
        />
      </div>

      <div className={prose.callout}>
        The class names are a stable, documented API; the exact selectors for every component are in
        its real stylesheet, under the <strong>CSS</strong> tab on its docs page.
      </div>
    </div>
  );
}
