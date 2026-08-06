import { Button, Loader } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "button",
  name: "Button",
  category: "Inputs",
  description: "Trigger an action or event with a single click.",
  importLine: `import { Button } from "@farmui/core";`,
  demos: [
    {
      title: "Contexts",
      description:
        "Buttons are neutral by default. Declare --fui-context on a region and every button inside re-answers its colour — there are no variant props. See the Contextualism guide.",
      code: `<Button>Neutral</Button>

<div style={{ "--fui-context": "primary" }}>
  <Button>Primary region</Button>
</div>

<div style={{ "--fui-context": "danger" }}>
  <Button>Danger region</Button>
</div>`,
      render: () => (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Button>Neutral</Button>
          </div>
          <div
            style={
              {
                "--fui-context": "primary",
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              } as CSSProperties
            }
          >
            <Button>Primary region</Button>
            <Button>Also primary</Button>
          </div>
          <div
            style={
              {
                "--fui-context": "danger",
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              } as CSSProperties
            }
          >
            <Button>Delete account</Button>
            <Button>Remove</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Danger regions adapt everything",
      description:
        "--fui-context isn't a button feature — every FarmUI component in the region adapts: checkboxes, focus rings, carets. You declare intent once on the container instead of a color prop on each control.",
      code: `<div style={{ "--fui-context": "danger" }}>
  <Button>Delete account</Button>
  <Button>Discard</Button>
</div>`,
      render: () => (
        <div
          style={
            {
              "--fui-context": "danger",
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            } as CSSProperties
          }
        >
          <Button>Delete account</Button>
          <Button>Remove</Button>
          <Button>Discard</Button>
        </div>
      ),
    },
    {
      title: "No size prop",
      description:
        "Padding and font are fluid (container-relative tokens), and in containers of 16rem or less a button takes the full width. Size is decided by the space the button lives in, not by a prop.",
      code: `<div style={{ containerType: "inline-size", inlineSize: "14rem" }}>
  <Button>Full width in a narrow container</Button>
</div>`,
      render: () => (
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
      ),
    },
    {
      title: "Icons & loading (composed as children)",
      description:
        "Icons are detected — a button containing an svg gets flex layout, a gap, and 1em icon sizing via :has(svg). Icon-only is detected from the accessible name: add the aria-label the icon-only case requires anyway and the button becomes square. No leftSection / rightSection / loading props; compose a Loader for busy states.",
      code: `<Button>
  <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
    <path d="M5.5 12.5L10.167 17L19.5 8" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  Approve
</Button>
<Button aria-label="Approve">
  <svg>…</svg>
</Button>
<Button disabled>
  <Loader size="sm" /> Saving
</Button>`,
      render: () => (
        <>
          <Button>
            <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
              <path
                d="M5.5 12.5L10.167 17L19.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Approve
          </Button>
          <Button aria-label="Approve">
            <svg viewBox="0 -0.5 25 25" fill="none" aria-hidden>
              <path
                d="M5.5 12.5L10.167 17L19.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button disabled>
            <Loader size="sm" /> Saving
          </Button>
        </>
      ),
    },
    {
      title: "Contextual full width",
      description:
        'Mark a region data-fui-buttons="block" and its buttons stretch — the explicit layout hint for when the container is wide but the design wants stacked, full-width actions.',
      code: `<div data-fui-buttons="block">
  <Button>Save changes</Button>
  <Button>Cancel</Button>
</div>`,
      render: () => (
        <div
          data-fui-buttons="block"
          style={{ display: "grid", gap: "0.75rem", maxInlineSize: "18rem" }}
        >
          <Button>Save changes</Button>
          <Button>Cancel</Button>
        </div>
      ),
    },
  ],
  whenToUse: [
    "To trigger an action in the current context — submitting a form, opening a dialog, confirming a choice.",
    "For the single most important action on a screen, put the region in a primary context (--fui-context: primary) and leave the rest neutral (Polaris: one primary action per section).",
    "Set intent with --fui-context on a container rather than repeating props on every button.",
  ],
  whenNotToUse: [
    'To navigate to another page or URL — use a link. A button that navigates breaks right-click, middle-click and "open in new tab" (GOV.UK).',
    "For many low-emphasis choices at once — consider a menu, tabs, or a segmented control instead of a row of equal buttons.",
  ],
  accessibility: [
    "Always renders a real <button>, so keyboard focus, Enter/Space activation and the button role come from the platform for free.",
    'Write a specific label: the text should make sense out of context ("Save changes", not "OK"). Icon-only buttons need an aria-label.',
    "For a loading state, add `disabled` and compose a <Loader/> (marked aria-hidden) into the children so it isn't announced as content.",
    "Focus is shown with a :focus-visible ring (never removed without a replacement), and colour is never the only signal of state.",
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      description:
        "The button content — label, and any composed icons/spinner.",
    },
    {
      name: "...others",
      type: "ButtonHTMLAttributes",
      description:
        "All native <button> props are forwarded, including style for the custom properties below.",
    },
    {
      name: "--fui-context",
      type: `"primary" | "danger"`,
      description:
        "Declare on any ancestor (it inherits) to give the region semantic meaning — every FarmUI component inside adapts. For a single button, set it on just that button.",
    },
    {
      name: "--fui-button-color",
      type: "CSS color",
      default: "var(--fui-text)",
      description:
        "The button's single colour channel — set it to recolour one instance or a wrapper component; background, border, hover and active are all derived from it.",
    },
    {
      name: "data-fui-buttons",
      type: `"block"`,
      description: "Set on a container to make its buttons full width.",
    },
    {
      name: "--_radius",
      type: "CSS length",
      default: "var(--fui-radius-md)",
      description: "Override via style or a token to change the corner radius.",
    },
  ],
};

export default doc;
