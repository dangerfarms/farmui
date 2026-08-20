import { CodeBlock } from "@/renderer/CodeBlock";
import prose from "../prose.module.css";

export const metadata = {
  title: "Gatekeeping",
  description:
    "The deterministic tooling that holds FarmUI's quality bar — the same gates for human and agent, so quality doesn't depend on who wrote the code.",
};

export default function Gatekeeping() {
  return (
    <div className={prose.prose}>
      <h1>Gatekeeping</h1>
      <p className={prose.lead}>
        Agent-assisted development needs gates, not vibes. Everything that can be checked
        deterministically is checked by a tool, in CI, on every change — the same gates for human
        and agent. Judgment is reserved for what no tool can check, and that judgment is written
        down: in the pinned reference skills, and in the contributing guide.
      </p>

      <h2>The gates</h2>
      <ul>
        <li>
          <strong>Stylelint, every rule on.</strong> One{" "}
          <a href="https://github.com/dangerfarms/farmui/blob/main/stylelint.config.mjs">
            root config
          </a>{" "}
          — standard + modern + alphabetical property order, the nesting plugin, native
          unknown-custom-property checking against the token files, and a selector pattern that
          encodes the scoping convention. Disables must carry a written reason.
        </li>
        <li>
          <strong>A contrast audit that reads the real stylesheets.</strong>{" "}
          <code>scripts/contrast-audit.mjs</code> parses the colour recipes out of the shipped CSS
          (tokens, Button, Badge, Alert, the elements layer), resolves <code>light-dark()</code>/
          <code>color-mix()</code>/relative colour, and asserts every derived pairing holds its
          ratio in both schemes. Change a recipe and CI names the pairing that broke; the audit and
          the stylesheets cannot drift because one is derived from the other.
        </li>
        <li>
          <strong>axe on every component.</strong> Every component renders through{" "}
          <code>vitest-axe</code> in representative states, plus interaction tests for behaviour the
          component owns (focus, keyboard, wiring).
        </li>
        <li>
          <strong>Types, format, build.</strong> <code>tsc</code> on both packages, oxfmt/prettier
          in check mode, and a full static export build — a docs page whose demo drifts from its
          component's real API fails the build, because demos import the real components.
        </li>
      </ul>
      <div className={prose.block}>
        <CodeBlock
          language="bash"
          code={`pnpm -r lint          # stylelint (all rules) + oxlint
pnpm -r exec tsc --noEmit
pnpm --filter @farmui/core test           # axe + interactions
pnpm format:check
pnpm --filter @farmui/core audit:contrast # recipes, both schemes
pnpm -r build`}
        />
      </div>

      <h2>The skills</h2>
      <p>
        What the gates can&rsquo;t check is written down where agents load it: skills in{" "}
        <a href="https://github.com/dangerfarms/farmui/tree/main/.agents/skills">
          <code>.agents/skills/</code>
        </a>
        — external references pinned into the repo, so every agent works from the same baselines the
        CSS is authored against: the Chrome team&rsquo;s modern web guidance, and the ModernCSS rule
        set. Conventions the references don&rsquo;t cover live in{" "}
        <a href="https://github.com/dangerfarms/farmui/blob/main/CONTRIBUTING.md">CONTRIBUTING</a>.
      </p>

      <div className={prose.callout}>
        The division of labour: tools hold the floor, skills carry the judgment, and neither cares
        whether a human or an agent wrote the change. Never hand-review what a gate verifies; never
        let a gate&rsquo;s silence stand in for the judgment it can&rsquo;t make.
      </div>
    </div>
  );
}
