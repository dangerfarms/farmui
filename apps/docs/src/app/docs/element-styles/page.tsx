import { CodeBlock } from "@/renderer/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Element styles",
  description:
    "The element-styles primitive: enhanced default styles for native HTML, page-wide — plain markup is already styled before any component appears.",
};

const stage: React.CSSProperties = {
  border: "1px solid var(--fui-border)",
  borderRadius: "var(--fui-radius-md)",
  padding: "1.25rem",
};

export default function ElementStyles() {
  return (
    <div className={prose.prose}>
      <h1>Element styles</h1>
      <p className={prose.lead}>
        The second of FarmUI&apos;s three primitives: enhanced default styles for the native
        elements themselves, applied page-wide by the <code>farmui.elements</code> layer. Importing
        the stylesheet opts you in — plain HTML is already styled before a single component appears,
        and everything on this page is bare markup with no classes.
      </p>

      <h2>Typography</h2>
      <p>
        Headings use the fluid type scale with balanced wrapping and the strong text tier (
        <code>--fui-text-strong</code>), so they sit a step darker than body copy in light and a
        step brighter in dark; every element derives its own line-height from its font size (
        <code>calc(0.5rem + 2ex)</code>), so leading tracks the text it leads. Margins are additive
        — blocks carry only a block-end margin, and the extra space before a heading comes from an
        adjacent-sibling rule — so nothing needs unsetting at the top of a container. Tables
        collapse their borders and start-align their headers; inline <code>code</code>,{" "}
        <code>kbd</code> and <code>samp</code> all get the same chip.
      </p>
      <div className={prose.block}>
        <div style={stage}>
          <h3>Prose, unstyled by you</h3>
          <p>
            A paragraph with a <a href="#element-styles">link</a> whose decoration carries the
            affordance: dimmed at rest, primary on hover. Inline <code>code</code> gets a chip,{" "}
            <mark>marks are tinted</mark>, and <abbr title="HyperText Markup Language">HTML</abbr>{" "}
            keeps its dotted underline.
          </p>
          <ul>
            <li>List markers are muted</li>
            <li>Spacing comes from the fluid scale</li>
          </ul>
          <blockquote>Blockquotes carry a border and muted text.</blockquote>
        </div>
      </div>

      <h2>Forms without components</h2>
      <p>
        Native controls wear the component recipes: buttons get the Button anatomy on the neutral
        text channel — raised at rest, settling when pressed, because raised means pressable —
        textual fields get the Input field look, and checkboxes, radios, ranges and progress bars
        are accent-coloured natives. A plain HTML form dropped into a FarmUI page is presentable
        before you reach for a component — and the components remain the upgrade path (fluid sizing,
        context adaptation, field wiring).
      </p>
      <div className={prose.block}>
        <form style={{ ...stage, display: "grid", gap: "0.75rem", maxInlineSize: "24rem" }}>
          <label htmlFor="es-name">Full name</label>
          <input id="es-name" type="text" placeholder="Alex Farmer" />
          <label htmlFor="es-region">Region</label>
          <select id="es-region">
            <option>Europe</option>
            <option>Americas</option>
          </select>
          <label>
            <input type="checkbox" defaultChecked /> Subscribe to updates
          </label>
          <input type="range" defaultValue={60} aria-label="Volume" />
          <div>
            <button type="button">Native button</button>
          </div>
        </form>
      </div>

      <h2>Details, focus and selection</h2>
      <div className={prose.block}>
        <div style={stage}>
          <details>
            <summary>A native disclosure</summary>
            <p>Styled summary cursor and weight; the Details component adds the boxed look.</p>
          </details>
        </div>
      </div>
      <ul>
        <li>
          Every element shares one <code>:focus-visible</code> ring, offset so the page shows
          through the gap; it survives forced colours and follows border radius.
        </li>
        <li>
          Text selection, caret colour and form <code>accent-color</code> all take the brand token,
          so a rebrand reaches even the parts without classes.
        </li>
        <li>
          Anything with an <code>id</code> gets scroll margin, so anchored headings never hide under
          sticky chrome.
        </li>
        <li>
          Disabled controls (and everything inside them) show a <code>not-allowed</code> cursor;
          images, video and SVG never overflow their container.
        </li>
        <li>
          The page reserves its scrollbar gutter so content never jumps, and in-page scrolling is
          smooth — only for people who haven&apos;t asked for reduced motion.
        </li>
      </ul>

      <h2>Overridable by design</h2>
      <p>
        The layer keeps every rule beatable: anything you write outside a layer wins, and the
        components layer wins for a component&apos;s own parts. There is no specificity to fight —
        the element styles are a floor, not a ceiling:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Your unlayered CSS always beats the elements layer */
blockquote {
  border-inline-start-color: var(--fui-primary);
}`}
        />
      </div>

      <div className={prose.callout}>
        Element styles are a primitive precisely because downstream work builds on them: new
        components start from styled native elements, so most of a new component&apos;s CSS is
        already written before its stylesheet exists.
      </div>
    </div>
  );
}
