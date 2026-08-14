import type { CSSProperties } from "react";
import { Button, Checkbox } from "@farmui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import prose from "../prose.module.css";
import { DetectedErrorDemo } from "./demos.client";

export const metadata = {
  title: "Contextualism",
  description:
    "Why FarmUI components have no variant or size props: context decides appearance, identity is the last resort.",
};

const CheckIcon = () => (
  <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
    <path
      d="M5.5 12.5L10.167 17L19.5 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Contextualism() {
  return (
    <div className={prose.prose}>
      <h1>Contextualism</h1>
      <p className={prose.lead}>
        In most component libraries you tell each component what to look like:{" "}
        <code>variant=&quot;outline&quot;</code>, <code>size=&quot;lg&quot;</code>,{" "}
        <code>color=&quot;danger&quot;</code>. FarmUI inverts that. Components read their{" "}
        <em>context</em> (what the surrounding region means, how much space it has, what the
        component contains) and adapt themselves. Identity props are the last resort, not the
        default.
      </p>

      <h2>The paradigm</h2>
      <p>
        A button doesn&apos;t know it&apos;s dangerous; the <em>delete-account panel</em> is
        dangerous, and every control inside it should say so. A button doesn&apos;t know it should
        be small; it&apos;s sitting in a narrow sidebar, and the space decides. Encoding this on
        every instance repeats a decision the page has already made, and lets instances drift out of
        agreement. Declaring it once on the region can&apos;t.
      </p>
      <p>Only a handful of contexts cover almost everything:</p>
      <ul>
        <li>
          <strong>What the region means.</strong> <code>--fui-context</code>: <code>primary</code>{" "}
          (the action of the area), <code>danger</code> (destructive territory), and the statuses{" "}
          <code>success</code>, <code>warning</code> and <code>info</code>.
        </li>
        <li>
          <strong>The size of the space.</strong> Container queries and fluid <code>cqi</code>{" "}
          tokens; no size props.
        </li>
        <li>
          <strong>What the component contains.</strong> Detection with <code>:has()</code>: an icon
          child, a rendered error message.
        </li>
        <li>
          <strong>Colour scheme.</strong> <code>color-scheme</code> + <code>light-dark()</code>{" "}
          tokens; an on-dark region needs no prop.
        </li>
        <li>
          <strong>User preferences.</strong> Motion is opt-in via{" "}
          <code>prefers-reduced-motion: no-preference</code>.
        </li>
      </ul>

      <h2>
        Declaring meaning: <code>--fui-context</code>
      </h2>
      <p>
        Context is a registered custom property — <strong>not</strong> a data attribute. It
        inherits, so the nearest ancestor that sets it wins, and component CSS reads it with a
        container style query:
      </p>
      <p>
        One consequence: a container style query is answered by <em>ancestors</em>, never by the
        element that declares the property. So the declaration must sit{" "}
        <strong>on an ancestor</strong> of whatever it styles: for a single component that means a
        one-element wrapper around it, not a style on the instance itself. A component&apos;s own
        children are fine: a Button inside a warning Alert is a descendant of the Alert root, so the
        root&apos;s declaration reaches it.
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* the library reads context like this */
@container (style(--fui-context: danger)) {
  .fui-Button-root {
    --_color: var(--fui-danger);
  }
}`}
        />
      </div>
      <p>
        A named, recurring region declares its context where the region is defined: in its own
        stylesheet. This is the idiomatic form: the region already has a class and a CSS file, and
        the declaration is a semantic fact about it, so it lives with the rest of its styling:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* danger-zone.css — the region declares what it means */
.danger-zone {
  --fui-context: danger;
}`}
        />
      </div>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<section className="danger-zone">
  <Checkbox label="I understand this is permanent" />
  <Button>Delete workspace</Button>
</section>`}
        />
      </div>
      <p>
        For a one-off region (or a single element) the style attribute declares the same property
        inline. This is not &quot;inline styles&quot; in the pejorative sense: nothing is being
        styled, a semantic custom property is being set at a subtree root, and every visual
        consequence still lives in the stylesheets:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<section style={{ "--fui-context": "danger" }}>
  <Checkbox label="I understand this is permanent" />
  <Button>Delete workspace</Button>
</section>`}
        />
      </div>
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
            } as CSSProperties
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
      <p>
        Notice the checkbox: <code>--fui-context</code> is not a button feature. The region remaps
        the semantic colour tokens for <em>every</em> FarmUI component inside: checked states, focus
        rings, carets, text selection. No component contains context code; the cascade does the
        work. A single dangerous button is just a one-element region, a wrapper around the button,
        because a style query is answered by ancestors, never by the declaring element itself:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<span style={{ "--fui-context": "danger" }}>
  <Button>Delete</Button>
</span>`}
        />
      </div>
      <p>
        This is the entire status API. No FarmUI component has a variant or colour prop; the status
        components (Alert, Badge, Loader, Progress) declare their meaning exactly the same way. A
        success alert is an Alert in a <code>success</code> region (usually a one-element wrapper
        region, or inherited from an ancestor that already means something):
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<div style={{ "--fui-context": "success" }}>
  <Alert title="Saved">Your changes have been stored.</Alert>
</div>`}
        />
      </div>

      <h2>One colour channel, derived looks</h2>
      <p>
        Button has no <code>filled</code>/<code>outline</code>/<code>subtle</code> variants. It has
        one colour channel, and every look is derived from it. Background and border come via{" "}
        <code>color-mix()</code> toward the page background, hover and active via relative-colour
        lightness shifts:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`.fui-Button-root {
  --_color: var(--fui-button-color, var(--fui-text));

  border: 1px solid color-mix(in oklab, var(--_color), var(--fui-bg) 80%);
  background: light-dark(
    color-mix(in oklab, var(--_color), var(--fui-bg) 90%),
    color-mix(in oklab, var(--_color), var(--fui-bg) 75%)
  );
  color: var(--_color);
}`}
        />
      </div>
      <p>
        The default channel is the neutral text colour: a quiet button that needs no
        &quot;subtle&quot; variant. A context swaps the channel and all the derived looks follow.
        Where a variant model needs 4 variants × 3 sizes × 2 colours of hand-picked values, this
        needs one input.
      </p>
      <p>
        The single instance-level escape hatch is the registered <code>--fui-button-color</code>{" "}
        property, for the case that is genuinely about identity, like a brand-coloured wrapper
        component:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`// Specialization is a wrapper, not a prop
export function BrandButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      style={{ "--fui-button-color": "light-dark(darkblue, lightblue)" }}
    />
  );
}`}
        />
      </div>
      <div className={prose.block}>
        <Button
          style={
            {
              "--fui-button-color": "light-dark(darkblue, lightblue)",
            } as CSSProperties
          }
        >
          Custom channel
        </Button>
      </div>

      <h2>The size of the space</h2>
      <p>
        There is no size prop. Padding and font are fluid container-relative tokens, and in a
        container of 16rem or less a button takes the full width. The layout decides, per instance
        of the layout, not per instance of the button:
      </p>
      <div className={prose.block}>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div
            style={{
              containerType: "inline-size",
              inlineSize: "14rem",
              padding: "0.75rem",
              border: "1px dashed var(--fui-border)",
              borderRadius: "var(--fui-radius-md)",
            }}
          >
            <Button>Narrow: full width</Button>
          </div>
          <div
            style={{
              containerType: "inline-size",
              inlineSize: "24rem",
              maxInlineSize: "100%",
              padding: "0.75rem",
              border: "1px dashed var(--fui-border)",
              borderRadius: "var(--fui-radius-md)",
            }}
          >
            <Button>Wide: natural width</Button>
          </div>
        </div>
      </div>
      <p>
        When the design wants stacked full-width actions in a wide container, that intent is still
        declared on the region, not the buttons — and it is declared as actual layout: a grid (or
        stacked flex) region stretches its buttons natively, so there is no attribute or prop to
        remember. The arrangement is the declaration.
      </p>

      <h2>Detection, not declaration</h2>
      <p>
        When the DOM already expresses a state, FarmUI styles it with <code>:has()</code> instead of
        asking you to repeat it as a prop. An icon inside a button is detected (no{" "}
        <code>leftSection</code> prop):
      </p>
      <div className={prose.block}>
        <Button>
          <CheckIcon />
          Approve
        </Button>
      </div>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`.fui-Button-root:has(svg) {
  display: inline flex;
  gap: var(--fui-space-sm);

  svg {
    inline-size: 1em;
  }
}`}
        />
      </div>
      <p>
        Form errors work the same way. A field is invalid exactly when it contains a rendered error
        message; there is no <code>invalid</code> prop anywhere in the library:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* the label tints when an error is present */
.fui-Field-root:has(.fui-Field-error) .fui-Field-label {
  color: var(--fui-danger);
}

/* the box keys off the control's own accessibility state */
.fui-Input-field:has(.fui-Input-input[aria-invalid="true"]) {
  border-color: var(--fui-danger);
}`}
        />
      </div>
      <div className={prose.block}>
        <DetectedErrorDemo />
      </div>
      <p>
        Accessibility state still flows through React (<code>aria-invalid</code> is wired onto the
        control because screen readers can&apos;t run <code>:has()</code>), but it is{" "}
        <em>derived from the same source</em>: the presence of the error message. One source of
        truth, no prop to forget.
      </p>
      <p>
        The platform itself is a detection source too. Fields also match <code>:user-invalid</code>,
        so native constraint validation (<code>required</code>, <code>type=&quot;email&quot;</code>)
        styles the field after the user interacts: no error prop, no state, no JavaScript at all.
        And an <em>icon-only</em> button is detected from its accessible name: the{" "}
        <code>aria-label</code> that accessibility requires anyway is what gives it square padding,
        via <code>[aria-label]:has(svg)</code>. The correct markup and the correct look are the same
        thing.
      </p>

      <h2>When identity is legitimate</h2>
      <p>
        Contextualism is the default, not a ban. Some differences really are identity: a
        brand-coloured call to action that must look the same in every context. For those,
        specialize with a wrapper component (or the <code>--fui-button-color</code> channel), and
        give the thing a name. What you should not reach for is a variant prop that encodes, on each
        instance, a decision the surrounding design already made.
      </p>

      <h2>Browser support</h2>
      <p>
        Container style queries ship in Chromium (111+) and Safari (18+); Firefox has not yet
        shipped them. In older browsers, contexts degrade to the neutral defaults: everything stays
        functional and accessible; per our{" "}
        <a href="https://github.com/dangerfarms/farmui/blob/main/CONTRIBUTING.md">browser policy</a>{" "}
        there are no polyfills. <code>:has()</code>, <code>color-mix()</code>, relative colour and
        container size queries are all Baseline Widely Available.
      </p>
    </div>
  );
}
