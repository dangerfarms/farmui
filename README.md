# FarmUI

**Beautiful React components, fast & accessible.** A fully-featured component
library rebuilt on native modern CSS — zero-runtime styling, WCAG-compliant by
default, and tiny bundles.

[![npm](https://img.shields.io/npm/v/@farmui/core.svg)](https://www.npmjs.com/package/@farmui/core)
[![license](https://img.shields.io/npm/l/@farmui/core.svg)](./LICENSE)

## Why FarmUI?

Most component libraries ship a styling engine to your users' browsers. FarmUI
doesn't. Every component is styled with plain, static CSS — cascade layers,
custom properties, `light-dark()`, `color-mix()`, container queries and logical
properties — so there's nothing to run at runtime and nothing extra to download.

- **Zero runtime** — styles are static CSS, fully React Server Component friendly.
- **Semantic HTML** — real `<details>`, `<nav><ol>`, `role="tablist"`, and more.
- **Accessible by default** — WAI-ARIA patterns, focus management, keyboard support.
- **Themeable with CSS variables** — rebrand by overriding `--fui-*`. No provider.
- **Native dark mode** — powered by `light-dark()`; one toggle flips everything.
- **Tiny & tree-shakeable** — no styling engine ships to your users.

## Installation

```bash
npm install @farmui/core
```

Import the stylesheet once at your app root, then use any component:

```tsx
import "@farmui/core/styles.css";
import { Button } from "@farmui/core";

export default function App() {
  return <Button>Get started</Button>;
}
```

That's the whole setup — no provider, no config. See the
[documentation](https://farmui.dev) for every component, live examples and the
theming guide.

## Repository layout

This is a pnpm + Turborepo monorepo:

- [`packages/core`](./packages/core) — `@farmui/core`, the component library.
- [`apps/docs`](./apps/docs) — the marketing site and documentation (Next.js).

## Development

```bash
pnpm install
pnpm build        # build the library, then the docs site
pnpm dev          # run the docs site against the library
pnpm check-types  # type-check everything
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

[MIT](./LICENSE) © Danger Farms
