import { CodeBlock } from "@/docs/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Layout compositions",
  description:
    "Layout is CSS's job: algorithmic, token-disciplined compositions instead of layout components.",
};

const box: React.CSSProperties = {
  background: "var(--fui-primary-soft)",
  border: "1px solid var(--fui-border)",
  borderRadius: "var(--fui-radius-sm)",
  padding: "0.4rem 0.6rem",
  fontSize: "var(--fui-text-sm)",
};

export default function LayoutGuide() {
  return (
    <div className={prose.prose}>
      <h1>Layout compositions</h1>
      <p className={prose.lead}>
        <strong>Proposal status: experimental</strong> — the React layout
        components have been removed in favour of this layer; Richard&apos;s
        review can still reverse that call. Layout in FarmUI is
        CSS, not components: small algorithmic compositions you apply as
        classes, tuned with registered <code>--fui-*</code> knobs whose
        defaults come from the fluid space scale. No media queries, no
        JavaScript, no React API — the layout manages itself from its content
        and container.
      </p>

      <h2>Why not layout components?</h2>
      <p>
        A <code>&lt;Stack gap=&quot;md&quot;&gt;</code> component is three
        declarations of CSS wearing a JavaScript costume. The judgment a
        library should contribute — token-valued spacing, rows that always
        wrap, overflow-<code>safe</code> alignment, never reordering content
        visually — lives just as well in a stylesheet, where it also works
        outside React, serialises into a CMS content model, and themes per
        tenant through the cascade. So the compositions are the product; any
        component wrapper is optional sugar that belongs to the consumer.
      </p>

      <h2>Stack</h2>
      <p>Space elements along the block axis.</p>
      <div className={prose.block}>
        <CodeBlock
          language="html"
          code={`<div class="fui-stack" style="--fui-stack-gap: var(--fui-space-lg)">…</div>`}
        />
      </div>
      <div className={prose.block}>
        <div className="fui-stack" style={{ maxInlineSize: "20rem" }}>
          <div style={box}>One</div>
          <div style={box}>Two</div>
          <div style={box}>Three</div>
        </div>
      </div>

      <h2>Cluster</h2>
      <p>
        A row that wraps like text — tags, action rows, metadata. Alignment is
        overflow-<code>safe</code> so focusable items are never clipped.
      </p>
      <div className={prose.block}>
        <div className="fui-cluster" style={{ maxInlineSize: "18rem" }}>
          <div style={box}>Tag</div>
          <div style={box}>Another tag</div>
          <div style={box}>Longer tag here</div>
          <div style={box}>Wraps</div>
        </div>
      </div>

      <h2>Switcher</h2>
      <p>
        Equal-width items in a row — until the container is narrower than the
        threshold, when every item goes full width. The flip is computed by
        the layout itself (a <code>flex-basis</code> calc), not a media query,
        so it works at any nesting depth.
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="html"
          code={`<div class="fui-switcher" style="--fui-switcher-threshold: 30rem">
  <div>A</div><div>B</div><div>C</div>
</div>`}
        />
      </div>
      <div className={prose.block}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div className="fui-switcher" style={{ inlineSize: "min(34rem, 100%)" }}>
            <div style={box}>A</div>
            <div style={box}>B</div>
            <div style={box}>C</div>
          </div>
          <div className="fui-switcher" style={{ inlineSize: "16rem" }}>
            <div style={box}>A</div>
            <div style={box}>B</div>
            <div style={box}>C</div>
          </div>
        </div>
      </div>

      <h2>Sidebar</h2>
      <p>
        A fixed-preference side element beside fluid content; the pair stacks
        the moment the content would drop below its minimum share. Reversing
        the sides is a DOM-order change, deliberately — a visual-only
        reversal would detach tab order from what the user sees.
      </p>
      <div className={prose.block}>
        <div className="fui-sidebar">
          <div style={box}>Sidebar</div>
          <div style={box}>
            Main content flows beside the sidebar until it would drop below
            its minimum share, then the pair stacks.
          </div>
        </div>
      </div>

      <h2>Grid</h2>
      <p>
        As many equal columns as fit, each at least the minimum
        (<code>--fui-grid-min</code>); columns grow to share the remainder.
        Explicit-span grids (a 12-column skeleton with{" "}
        <code>span 4</code> / <code>span 8</code> children) are deliberately
        not a composition — that&apos;s bespoke page structure, so write grid
        CSS for it; the decision tree is in the css-layout reference.
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="html"
          code={`<div class="fui-grid" style="--fui-grid-min: 8rem">…</div>`}
        />
      </div>
      <div className={prose.block}>
        <div
          className="fui-grid"
          style={{ "--fui-grid-min": "8rem" } as React.CSSProperties}
        >
          <div style={box}>One</div>
          <div style={box}>Two</div>
          <div style={box}>Three</div>
          <div style={box}>Four</div>
        </div>
      </div>

      <h2>Center</h2>
      <p>
        Centre a column of content at a readable measure
        (<code>--fui-center-max</code>, default <code>60ch</code>). Centring a
        single item on both axes is one declaration
        (<code>place-content: center</code> on a grid), not a composition.
      </p>
      <div className={prose.block}>
        <div
          className="fui-center"
          style={{ "--fui-center-max": "24ch" } as React.CSSProperties}
        >
          <div style={box}>
            A centred column, capped at a readable measure.
          </div>
        </div>
      </div>

      <h2>Migration from the layout components</h2>
      <p>
        The React layout components predated this layer and have been removed
        in its favour:
      </p>
      <ul>
        <li>
          <code>Stack</code> → <code>.fui-stack</code> ·{" "}
          <code>Group</code> → <code>.fui-cluster</code> ·{" "}
          <code>SimpleGrid</code> → <code>.fui-grid</code> (auto-fit/minmax) ·{" "}
          <code>Container</code> → <code>.fui-container</code> ·{" "}
          <code>AspectRatio</code> → <code>.fui-frame</code> ·{" "}
          <code>Center</code> → <code>.fui-center</code>
        </li>
        <li>
          <code>Flex</code> and <code>Space</code> have no successors on
          purpose: Flex was the platform&apos;s flexbox wearing props, and
          spacer elements are what <code>gap</code> exists to replace.
        </li>
        <li>
          The 12-column <code>Grid</code>/<code>GridCol</code> has no
          composition successor, also on purpose: explicit-span page
          skeletons are bespoke structure — write grid CSS (see the decision
          tree in the css-layout reference).
        </li>
        <li>
          Compositions we never had as components become possible: Switcher
          and Sidebar here; Cover and Reel are natural next steps for
          page-building.
        </li>
      </ul>

      <h2>The CMS binding</h2>
      <p>
        A visual editor gives content managers layout control by mapping its
        fields onto exactly this surface — a class plus token-valued
        properties:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="json"
          code={`{ "layout": "sidebar", "gap": "space-lg", "side": "18rem" }
→ <section class="fui-sidebar"
           style="--fui-sidebar-gap: var(--fui-space-lg); --fui-sidebar-side: 18rem">`}
        />
      </div>
      <p>
        The choices are enums over tokens, so a tenant&apos;s theme restyles
        every layout automatically, nothing runs at runtime, and the stored
        content model stays renderer-agnostic. Guardrails travel with the
        compositions: an editor cannot produce an unwrappable row or a
        clipped focus target, because those judgments are inside the CSS.
      </p>
    </div>
  );
}
