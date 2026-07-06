# Contributing to FarmUI

Thanks for your interest in improving FarmUI! 🌱

## Prerequisites

- Node.js >= 20 (we develop on 24)
- pnpm 11 (`corepack enable` then `corepack use pnpm@11`)

## Getting started

```bash
git clone https://github.com/dangerfarms/farmui.git
cd farmui
pnpm install
pnpm build      # builds @farmui/core (required before running the docs)
pnpm dev        # runs the docs site
```

## Project layout

- `packages/core` — the `@farmui/core` component library. Each component lives in
  `src/components/<Name>/` as a `.tsx` file plus a plain `.css` file using static,
  prefixed class names (`.fui-<Name>-<part>`) inside `@layer farmui.components`.
- `apps/docs` — the Next.js marketing + documentation site.

## Adding or changing a component

1. Style with the `--fui-*` design tokens only (see `packages/core/src/styles.css`).
2. Use semantic HTML, logical properties, and modern CSS. No CSS-in-JS.
3. Keep everything accessible: correct roles, keyboard support, focus-visible rings.
4. Add or update the component's docs entry in `apps/docs/src/content/components/`.

## Before opening a PR

```bash
pnpm build
pnpm check-types
pnpm format
```

All three should pass cleanly. Please use
[Conventional Commits](https://www.conventionalcommits.org/) for commit messages
(`feat:`, `fix:`, `docs:`, `refactor:`, …).

## Releasing

Publishing is automated: pushing a `v*` tag runs the release workflow, which
builds and publishes `@farmui/core` to npm. Maintainers only.

By contributing you agree that your contributions are licensed under the
project's [MIT License](./LICENSE).
