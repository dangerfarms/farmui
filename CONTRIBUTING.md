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

## CSS authoring standard

FarmUI's CSS follows two references, installed as agent skills in this repo
(`.agents/skills/`, with Claude Code symlinks in `.claude/skills/` — pinned by
`skills-lock.json`):

- [`modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) —
  Google Chrome's guidance for the modern web platform. Lead principle: **be
  allergic to knowledge duplication** (set defaults once; let the cascade and
  inheritance work). Search it with
  `npx -y modern-web-guidance@latest search "<query>"`.
- [`modern-css`](https://moderncss.ai) — the ModernCSS rule set
  (`moderncss/skills`).

Concretely this means: cascade layers (`@layer`) with `@scope`d element selectors
instead of BEM; additive CSS (each property set once under mutually-exclusive
conditions — the only permitted override is `elements` → `components`); logical
properties; `oklch()` / `light-dark()` / `color-mix()`; container queries; and
**progressive enhancement, not degradation** (opt into motion via
`@media (prefers-reduced-motion: no-preference)`, never a global
`animation-duration: 0.01ms` kill-switch).

**Stylesheet anatomy** (mirrors ModernCSS's site convention): `src/styles.css`
is the entry and only orchestrates — the cascade-layer order plus `layer()`
imports; `src/tokens.css` holds every design token (three bands: primitives →
semantic colour → interaction & scales, with Utopia calculator URLs committed
above the fluid scales); `src/reset.css` and `src/elements.css` are their
layers' contents. **Component CSS files contain no `@layer`** — the layer is
assigned by the orchestrator's imports in dev and by `scripts/build-css.mjs`
in the built artifact (the build errors if a component file declares one).

**Motion**: use the duration tokens by intent — `--fui-duration-sm` for micro
feedback (hovers, colour shifts), `-md` for default transitions, `-lg` for
overlay enter/exit and large movement — with `--fui-ease`
(`--fui-ease-elastic` for sparing playful accents). Always inside
`@media (prefers-reduced-motion: no-preference)`.

Guardrails enforce this: `pnpm lint` runs oxlint + stylelint
(`stylelint-config-modern` + token validation).

## Browser support policy

- **Baseline Widely or Newly Available** web features are used natively, with no
  fallback and no polyfill (e.g. the `popover` attribute, `@scope`,
  `@starting-style`).
- **Not-yet-Baseline** features may only be adopted as progressive enhancement:
  guarded by `@supports` in CSS or feature detection in JS, with a graceful
  fallback in the same component (e.g. CSS anchor positioning in Popover and
  Tooltip, which fall back to wrapper-anchored positioning).
- **No polyfills, ever** — the library ships zero-runtime static CSS and lean
  components; a browser without a feature gets the fallback behavior, not extra
  JavaScript.
- Check status with the `modern-web-guidance` skill or
  [webstatus.dev](https://webstatus.dev) before adopting a feature.

## Component API conventions

FarmUI follows Base UI's composition model with one shared contract, so a
consumer (or agent) who learns it once knows every component.

**`render` is never required.** Every part renders a sensible built-in element
for its role (`Popover.Trigger` → a FarmUI Button, `Breadcrumbs.Item` → a
link via `href`, `Popover.Close` → a Button). The `render` prop exists only to
*substitute* that element (`render={<a href="…" />}`, or a function of the
wiring props). If a part's common case needs `render`, the part has the wrong
default element.

**One merge contract** (`src/render.ts`, used by every part): event handlers
chain — the element's own handler runs first, wiring second, both always run;
`className`s concatenate; `style` merges with wiring winning on conflicts
(wiring styles such as `anchorName` are load-bearing); `aria-describedby` /
`aria-labelledby` token-lists concatenate; refs compose. Never hand-roll
`cloneElement` prop injection.

**Export shapes** (pick by what the component is):

- Parts only (Popover, Tooltip, Field, Fieldset, Breadcrumbs) → plain object:
  `export const Popover = { Root, Trigger, … }`
- Convenience form + parts (Alert) →
  `Object.assign(Convenience, { Root, … })` so both `<Alert title=…>` and
  `<Alert.Root>` work
- Form controls → the hybrid pair: labelled `X` plus a bare `XControl` that
  self-wires from Field context via `useFieldControlProps()`

RSC note: `@farmui/core` ships as a single bundle with a `"use client"`
banner, so in React Server Components **every** compound export is a client
reference — dot access like `Popover.Root` or `Breadcrumbs.Item` is
`undefined` in a server module, regardless of what the source file declares.
Any JSX that uses compound parts (docs demos included) must live in a
`*.client.tsx` file; callable convenience forms (`<Alert title=…>`,
`<Button>`) work from server modules.

**State attributes** — the shared styling vocabulary, identical on every
component (never invent synonyms):

| Attribute         | Where          | Meaning                                    |
| ----------------- | -------------- | ------------------------------------------ |
| `data-popup-open` | trigger        | its popup/bubble is open                   |
| `data-open`       | popup/panel    | open — uniform across enhanced & fallback  |
| `data-disabled`   | wrapper/control| disabled styling hook                      |
| `data-current`    | nav item       | current page/location                      |
| `data-size` / `data-position` | some display components (Badge, Avatar, Progress, Modal) | instance styling hooks read by the stylesheet — form controls have no size hooks: their sizing is fluid |

Components built on native state use the platform's hook instead (e.g.
Accordion styles `details[open]`). **Prefer detection over declaration**:
when the DOM already expresses a state, style it with `:has()` / ARIA
selectors instead of minting an attribute. Field error state is the model —
a field is invalid exactly when it contains a rendered error message
(`.fui-Field-root:has(.fui-Field-error)`), and controls key off their own
`[aria-invalid="true"]`; there are no `invalid` props and no `data-invalid`
attributes.

**Contextual channels** — orthogonal ways a region influences the
components inside it; never blur them:

- **Contexts** (`--fui-context: danger | primary`) — what the region
  *means*. A registered, inherited custom property declared on any element
  (style attribute or the region's own CSS) and read via container style
  queries (`@container (style(--fui-context: danger))`) in the Contexts
  section of `tokens.css` and in component files. **Never a data
  attribute.** Contexts remap **only** colour tokens: never spacing, sizing,
  or layout. Components contain no context code; the nearest ancestor that
  sets the property wins because the property inherits.
- **Layout hints** (`data-fui-buttons="block"`) — how the region *arranges*
  its contents.
- **Containers** (`container-type: inline-size`) — how *big* the region is;
  drives the fluid `cqi` tokens and Button's narrow-container full-width
  behaviour.

**The control alignment contract**: buttons and form controls share one
derived anatomy — `padding-block: var(--fui-space-sm)` +
`font-size: var(--fui-text-sm)` × `line-height: 1.2` + 1px borders — so they
height-align by construction at every container width. There are no
control-height tokens and no size props on form controls; a control that
must match this height adopts the same stack (see Pagination, Newsletter).
Glyph controls (Checkbox, Radio, Switch, Slider) size their geometry in `em`
on a `font-size: var(--fui-text-sm)` basis, so glyphs ride the same fluid
scale as their labels.

## Adding or changing a component

1. Style with the `--fui-*` design tokens only (see `packages/core/src/styles.css`).
2. Use semantic HTML, logical properties, and modern CSS per the standard above.
   No CSS-in-JS.
3. Keep everything accessible: correct roles, keyboard support, focus-visible rings.
4. Add or update the component's docs entry in `apps/docs/src/content/components/`.

## Before opening a PR

```bash
pnpm build
pnpm check-types
pnpm lint
pnpm format
```

All four should pass cleanly. Please use
[Conventional Commits](https://www.conventionalcommits.org/) for commit messages
(`feat:`, `fix:`, `docs:`, `refactor:`, …).

## Releasing

Publishing is automated: pushing a `v*` tag runs the release workflow, which
builds and publishes `@farmui/core` to npm. Maintainers only.

By contributing you agree that your contributions are licensed under the
project's [MIT License](./LICENSE).
