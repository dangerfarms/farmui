import { CodeBlock } from "@/docs/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Installation",
  description: "Install FarmUI in any React framework.",
};

export default function Installation() {
  return (
    <div className={prose.prose}>
      <h1>Installation</h1>
      <p className={prose.lead}>
        FarmUI works in any React 18+ setup. There&rsquo;s no provider and no
        build plugin — just a package and a stylesheet.
      </p>

      <h2>1. Install the package</h2>
      <div className={prose.block}>
        <CodeBlock language="bash" code={`pnpm add @farmui/core`} />
      </div>

      <h2>2. Import the styles</h2>
      <p>
        Import the token stylesheet <strong>once</strong> at the root of your
        app. It defines the <code>--fui-*</code> design tokens and the base
        layer that every component builds on.
      </p>
      <div className={prose.block}>
        <CodeBlock
          code={`// Next.js App Router — app/layout.tsx
import "@farmui/core/styles.css";`}
        />
      </div>

      <h2>3. Use a component</h2>
      <div className={prose.block}>
        <CodeBlock
          code={`import { Button, Input } from "@farmui/core";

export function SignIn() {
  return (
    <form>
      <Input label="Email" placeholder="you@acme.com" />
      <Button type="submit">Sign in</Button>
    </form>
  );
}`}
        />
      </div>

      <h2>Framework notes</h2>
      <h3>Next.js</h3>
      <p>
        FarmUI components are React Server Component friendly. Interactive
        components mark themselves <code>&quot;use client&quot;</code> as
        needed, so you can drop them anywhere.
      </p>
      <h3>Vite</h3>
      <p>
        Import <code>@farmui/core/styles.css</code> in your{" "}
        <code>main.tsx</code> entry. No plugin required — the styles are plain
        CSS.
      </p>

      <div className={prose.callout}>
        FarmUI ships static CSS with cascade layers. If you use your own
        <code> @layer</code> order, the FarmUI layers are named{" "}
        <code>farmui.reset</code>, <code>farmui.tokens</code> and{" "}
        <code>farmui.components</code>.
      </div>
    </div>
  );
}
