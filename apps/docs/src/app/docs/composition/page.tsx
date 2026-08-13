import { Button } from "@farmui/core";
import { CodeBlock } from "@/renderer/CodeBlock";
import prose from "../prose.module.css";
import { StateAttrDemo } from "./demos.client";

export const metadata = {
  title: "Composition",
  description:
    "How FarmUI components compose: built-in elements, the render prop, the prop-merge contract, and state-attribute styling hooks.",
};

export default function Composition() {
  return (
    <div className={prose.prose}>
      <h1>Composition</h1>
      <p className={prose.lead}>
        FarmUI components compose: they are built from parts, every part renders
        a sensible element by default, and one merge contract governs how your
        props combine with the component&apos;s wiring. Learn it once — it works
        the same everywhere.
      </p>

      <h2>Parts and built-in elements</h2>
      <p>
        Compound components expose their anatomy as parts you assemble in JSX.
        Each part renders a real element suited to its role (a{" "}
        <code>Popover.Trigger</code> is a FarmUI Button, a{" "}
        <code>Breadcrumbs.Item</code> is a link), so the common case needs no
        ceremony at all:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<Popover.Root>
  <Popover.Trigger>Open filters</Popover.Trigger>
  <Popover.Popup>
    <Popover.Title>Filters</Popover.Title>
    <Popover.Description>Narrow down the results.</Popover.Description>
    <Popover.Close>Done</Popover.Close>
  </Popover.Popup>
</Popover.Root>`}
        />
      </div>
      <p>
        Because the built-in trigger <em>is</em> a Button, it adapts to its
        context like any Button; see the{" "}
        <a href="/docs/contextualism">Contextualism guide</a>.
      </p>

      <h2>
        Substituting elements with <code>render</code>
      </h2>
      <p>
        When you need a different element (a link styled as a button, your
        router&apos;s <code>Link</code>, a component of your own), pass it via{" "}
        <code>render</code>. The part&apos;s wiring (ids, ARIA, handlers, anchor
        styles) merges onto the element you provide:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`// A link that opens the popover
<Popover.Trigger render={<a href="/pricing" />}>See pricing</Popover.Trigger>

// Your framework's router link inside breadcrumbs
<Breadcrumbs.Item render={<Link href="/settings" />}>Settings</Breadcrumbs.Item>

// Full control: a function receives the typed wiring props
<Popover.Trigger
  render={(props) => <MyFancyButton {...props} glow />}
/>`}
        />
      </div>
      <p>
        <strong>
          <code>render</code> is never required.
        </strong>{" "}
        It exists only to substitute the built-in element. If you find yourself
        writing <code>render</code> for an everyday case, there is usually a
        simpler built-in form, or a gap you should report.
      </p>
      <p>
        A dedicated <code>render</code> prop keeps <code>children</code>{" "}
        unambiguous: always content, never secretly the element. The function
        form gives you typed access to the wiring when you need it.
      </p>

      <h2>The merge contract</h2>
      <p>
        When wiring merges onto your element, the rules are always the same:
      </p>
      <ul>
        <li>
          <strong>Event handlers chain.</strong> Your handler runs first, the
          component&apos;s wiring second. Both always run; neither can
          accidentally disable the other.
        </li>
        <li>
          <strong>
            <code>className</code>s concatenate.
          </strong>{" "}
          Yours and the component&apos;s both apply.
        </li>
        <li>
          <strong>
            <code>style</code> merges, wiring wins on conflicts.
          </strong>{" "}
          Wiring styles such as <code>anchorName</code> position the popup and
          are load-bearing; everything else of yours passes through.
        </li>
        <li>
          <strong>ARIA id lists concatenate.</strong> An existing{" "}
          <code>aria-describedby</code> on your element is kept and extended.
        </li>
        <li>
          <strong>Refs compose.</strong> Your ref and the component&apos;s both
          receive the node.
        </li>
        <li>
          <strong>Everything else: your prop wins.</strong>
        </li>
      </ul>

      <h2>Styling open state</h2>
      <p>
        Parts expose their state as data attributes: the same vocabulary on
        every component, working identically whether the browser renders the
        popup natively (top layer) or via the fallback path:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="css"
          code={`/* Keep a trigger highlighted while its popup is open */
.toolbar [data-popup-open] {
  background: var(--fui-surface-hover);
}

/* Style the open panel */
.fui-Popover-popup[data-open] {
  border-color: var(--fui-primary);
}`}
        />
      </div>
      <div className={prose.block}>
        <StateAttrDemo />
      </div>

      <h2>Form controls and Field</h2>
      <p>
        The text-like controls (<code>Input</code>, <code>Select</code>,{" "}
        <code>Textarea</code>, <code>Slider</code>) are bare: compose them
        inside a <code>Field</code> and they self-wire — id, described-by and
        invalid state all flow from context, with <code>Field.Label</code>,{" "}
        <code>Field.Description</code> and <code>Field.Error</code> as the
        parts:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Description>We'll only use this to reply.</Field.Description>
  <Input type="email" />
  <Field.Error>{error}</Field.Error>
</Field.Root>`}
        />
      </div>
      <p>
        Inline controls (<code>Checkbox</code>, <code>Switch</code>,{" "}
        <code>Radio</code>) keep a labelled convenience form (
        <code>{`<Checkbox label="…" />`}</code>) because their anatomy is a row;
        their bare parts (<code>CheckboxControl</code>,{" "}
        <code>SwitchControl</code>, …) compose inside a <code>Field</code> the
        same way. For an arbitrary element of your own,{" "}
        <code>Field.Control render={`{…}`}</code> wires the same props onto it:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<Field.Root>
  <Field.Label>
    <SwitchControl defaultChecked /> Email notifications
  </Field.Label>
  <Field.Description>Sent at most once a day.</Field.Description>
</Field.Root>`}
        />
      </div>

      <h2>Buttons anywhere</h2>
      <p>
        <code>Button</code> itself takes <code>render</code>, so anything can
        wear button styling, most usefully links:
      </p>
      <div className={prose.block}>
        <CodeBlock
          language="tsx"
          code={`<Button render={<a href="/signup" />}>
  Get started
</Button>`}
        />
      </div>
      <div className={prose.block}>
        <Button render={<a href="#composition" />}>
          A link, dressed as a Button
        </Button>
      </div>
    </div>
  );
}
