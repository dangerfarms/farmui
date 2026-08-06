# Design decisions log

Judgment calls made while building FarmUI, recorded so reviewers (and future
contributors) see the reasoning, not just the result. Items marked **[for
Rich]** await review by Richard Hallows.

## CSS foundation (2026-07)

- **File anatomy** — `styles.css` (orchestrator) / `tokens.css` / `reset.css`
  / `elements.css`, mirroring the ModernCSS site convention
  (`moderncss/skills` → styles/variables/elements), with layer assignment at
  the import site and none in component files. **[for Rich]** Confirm this
  matches the base-file structure discussed on the call (not captured in the
  meeting notes).
- **Token suffixes** — kept FarmUI's `-xs/-sm/-md/-lg/-xl` (+`-2xl/-3xl`)
  rather than adopting ModernCSS's unsuffixed-base style (`--length`,
  `--length-l`): internal consistency across every existing token family
  outweighs 1:1 imitation. **[for Rich]** Also: we kept `--fui-space-*`
  rather than renaming to his `--length-*`.
- **Fluid scales** — Utopia-generated `clamp()` in `cqi`, parameters
  committed above each scale: 320→1240px, base 16→18px, Major Second →
  Major Third. Spacing minimums equal the previous fixed values so nothing
  shrinks below the pre-fluid layout. `--fui-text-xs` gently *inverts*
  (larger on small screens) for legibility. **[for Rich]** Ratio/viewport
  parameters are defensible defaults, five-line edit to change.
- **Deliberately not fluid** — `--fui-radius-*` (corners shouldn't breathe)
  and `--fui-control-height-*` (the input/button alignment contract).
- **Motion vocabulary** — `--fui-duration-sm/md/lg` (100/175/300ms) +
  `--fui-ease`/`--fui-ease-elastic`, replacing the single 150ms
  `--fui-transition`. Default felt duration moved 150→175ms to match the
  ModernCSS values. **[for Rich]** Durations are taste — flag if 175 feels
  slow.
- **Two-layer focus ring** — background-colour underlay beneath the brand
  outline (offset 2px), so the ring reads on any surface; the outline alone
  still carries forced-colors support.
- **Containers** — the library declares no containers (it must never restyle
  the host page); blocks declare `container-type: inline-size` on their roots
  (they own their regions), and consumers opt in per the theming docs.

## Composition (2026-07)

- **`render`, not `asChild`** — Base UI's substitution prop, with one shared
  merge contract (`src/render.ts`). Children always mean content. Full
  reasoning on the docs Composition page.
- **`render` is never required** — every part ships a sensible built-in
  element (Trigger → Button, Breadcrumbs.Item → link via `href`).
- **Config-by-nature components** — Pagination, Progress, Loader, Avatar keep
  config APIs: their markup is *derived* (from a value, arithmetic, or
  fallback logic), so compound parts would be ceremony. Select's/RadioGroup's
  `data` arrays are shorthands over real children forms.

## Overlays (2026-07)

- **Native engines, no polyfills** — popover attribute + anchor positioning
  (Popover/Tooltip), `<dialog>`/`showModal()` (Modal); feature-detected
  enhancement with graceful fallbacks per the browser-support policy in
  CONTRIBUTING.
- **Tooltip hover grace = 300ms window**, not Floating UI's `safePolygon`: a
  geometry runtime contradicts zero-runtime styling; the 4px gap + arrow make
  the exposure small. Revisit on evidence, or when Interest Invokers
  (`interestfor`) make the browser own hover intent.
- **Arrow flip-correction** via anchored container queries (Chrome 143+),
  additive-only.

## Modes contract (2026-07) — superseded by Contextualism below

> The token-remap contract stands; the `data-fui-mode` attribute was
> replaced by the `--fui-context` property. See the Contextualism section.

- **Modes are semantic token remaps on a container** (`data-fui-mode`),
  defined once in the Modes section of `tokens.css` — components contain no
  mode code, so every primary-token consumer (~27 files) adapts
  automatically, including elements-layer carets/accent/selection and focus
  rings. Rejected alternative: per-component mode selectors (Button's old
  bespoke block) — doesn't scale past a handful of components × modes.
- **Colour tokens only** — a mode never remaps spacing/sizing/layout (the
  meeting's "structural overrides are a smell" as a hard rule). Layout hints
  (`data-fui-buttons`) and containers are separate contextual channels.
- **Precedence** — explicit instance attribute → mode → default, enforced by
  the cascade itself: instance attributes read literal status tokens
  (`--fui-danger*`), modes remap the semantic primary tokens.
- **Correctness caveat worth remembering**: custom properties resolve their
  `var()`s where *declared* — `--fui-ring-color` aliases the primary ring at
  `:root`, so modes must remap it directly. Same reason `--fui-success` stays
  green inside a danger zone (aliased at `:root`; desirable).
- **Inversion is not a mode** — `color-scheme: dark` on a region flips every
  `light-dark()` token natively.
- Vocabulary ships with `danger` only; `success` and `density` are named
  candidates (density would remap space/control tokens — needs its own
  decision since it breaks the colour-only rule). CSS style queries
  (`@container style(…)`) are the future native mechanism; the token-remap
  contract migrates to them cleanly. **[for Rich]** vocabulary sign-off.

## Variant taxonomy — "move away from variants" (2026-07) — partially superseded

> The emphasis and Button-size rulings below were overruled by Rich's demo.
> See the Contextualism section.

Rich's direction was to replace variants with modes. "Variant" turned out to
be four different things; the ruling per kind:

- **Intent/colour → modes, fully.** Button's `data-color="danger"` is
  **removed** — a single danger button is a one-element region
  (`<span data-fui-mode="danger"><Button>…`), and nearest-ancestor-wins
  makes the old instance-beats-mode tier unnecessary. Intent now lives only
  on containers.
- **Emphasis (`data-variant="light|outline|subtle"`) → stays per-instance.**
  Emphasis is hierarchy *within a group* ("Save" filled, "Cancel" subtle,
  side by side) — no container can express which sibling matters less.
  A regional *default* emphasis is a possible future addition.
  **[for Rich]** confirm this exception, or propose the regional form.
- **Status-as-content (Alert/Badge/Progress colour props) → stays.** An
  alert's colour is what the message *is* — content semantics, not styling
  (like `aria-current`). These components also follow modes where they read
  primary tokens. **[for Rich]** confirm.
- **Size (`data-size`) → stays per-instance for now**; the regional form is
  the future `density` mode (which needs its own ruling since it would remap
  non-colour tokens). Full-width is already contextual
  (`data-fui-buttons="block"`). **[for Rich]** confirm.
- **Light/dark is not a variant at all** — it's `color-scheme`, native, at
  any scope.

## Contextualism (2026-07, after the 29 Jul call + Rich's demo)

Rich's `contextualism-demo.html` is the primary source for this section; it
overrules three earlier rulings above (kept for the record).

- **Context is a custom property, not a data attribute.**
  `data-fui-mode="danger"` → `--fui-context: danger`, a registered inherited
  property (`@property` in reset.css) read via container style queries
  (`@container (style(--fui-context: …))`). Every element is a style
  container by default; inheritance gives nearest-ancestor-wins for free, and
  a one-element region is just a style attribute on the instance. The
  region-wide token-remap contract from "Modes" above carries over unchanged
  — only the declaration mechanism changed. Vocabulary: `danger` (remaps the
  semantic tokens for every component) and `primary` (Button's channel; "the
  action of the area").
- **Emphasis variants are deleted, not kept.** Overrules the "emphasis stays
  per-instance" ruling. Button has one colour channel
  (`--_color: var(--fui-button-color, var(--fui-text))`) with every look
  derived via `color-mix()`/relative colour; the neutral default *is* the
  quiet button, `--fui-context: primary` *is* the loud one. Outline/ghost
  buttons discouraged per the call. Instance identity, when genuinely needed,
  is the registered `--fui-button-color` property or a named wrapper
  component — not a variant prop.
- **Button size props are deleted.** Overrules the "size stays per-instance"
  ruling, for Button only this pass (Input/Select etc. keep `size` pending a
  later ruling). Sizing is fluid (`cqi` tokens); containers ≤ 16rem make the
  button full width. `data-fui-buttons="block"` is retained as the explicit
  layout hint. **[for Rich]** confirm retaining it — it's an attribute, but
  it's a *layout* channel, not meaning.
- **Field error state is detected, not declared.** No `invalid` props, no
  `data-invalid` attributes anywhere. CSS: `:has(.fui-Field-error)` on the
  field, `[aria-invalid="true"]` on controls (ARIA is legitimate detection —
  it's DOM state, not a styling hook). `aria-invalid` itself is still wired
  in React (screen readers can't run `:has()`), derived from the same source:
  the presence of a rendered error message. `error` props stay — they render
  the content that detection keys off.
- **Icons are detected** (`:has(svg)`) — `.fui-Button-section` deleted.
- **Browser stance**: style queries are Newly Available (Chrome 111 / Safari
  18 / Firefox 151). Firefox < 151 renders context-less (neutral) buttons —
  functional, no polyfill, per policy. **[for Rich]** confirm this is
  acceptable for the launch window.

## @scope everywhere (2026-08)

- **Every component CSS file is now `@scope`-encapsulated** (core 35/35,
  blocks 12/12), per the ModernCSS "no component styles outside a scope"
  rule. Mechanical refactor; scope roots chosen from actual rendered markup,
  so standalone parts (bare Checkbox box, Radio's fragment input+control,
  Accordion items, Tabs list, Avatar group) carry their own scope blocks.
  `@keyframes`/`@property` stay top-level. No donut limits were needed:
  every content-hosting area is styled via `.fui-*` classes, which can't
  bleed; Table's bare `th`/`td` styling and layout primitives' `> *` rules
  deliberately keep styling hosted content (that is their job).
- **One deliberate visual change** surfaced by the pixel-parity check:
  RadioGroup's `gap: var(--fui-space-xs)` override had been silently losing
  to Fieldset's scoped `gap: var(--fui-space-sm)` on scope proximity
  (scoped beats unscoped at equal specificity). With both now scoped to the
  same element, proximity ties and source order lets the authored override
  win — group spacing is now the intended tighter `xs`. The old rendering
  was the bug.
- Verified by screenshotting 24 docs pages before/after: 21 byte-identical,
  2 animation-phase-only (Loader, Skeleton), 1 the Radio fix above.

## Controls go fluid — size props deleted everywhere on form controls (2026-08)

Completes the size ruling Contextualism opened ("for Button only this
pass"). Per Rich's direction that size adapts automatically to context:

- **`size` deleted from Input, Select, Textarea, Checkbox, Radio,
  RadioGroup, Switch, Slider** (and from the radio group context).
  Display components (Badge, Kbd, Loader, Progress, Avatar, Modal) keep
  theirs for now — they size intrinsic display elements (pill, glyph,
  modal *width*), a separate question for Rich.
- **`--fui-control-height-*` tokens deleted.** The alignment contract is now
  a shared derived anatomy (padding-block `--fui-space-sm` + `--fui-text-sm`
  × 1.2 + 1px borders): controls and buttons align by construction at every
  container width, where the fixed tokens only aligned them at one nominal
  size (and in fact didn't — fixed 2.5rem vs Button's derived ~2.33rem).
  Supersedes the "deliberately not fluid" control-height entry above.
  Pagination and blocks/Newsletter migrated to the same anatomy.
- **Glyph controls are em-based** on a `font-size: var(--fui-text-sm)`
  root, multipliers chosen so wide-container geometry equals the old `md`
  exactly; consumer font-size overrides rescale the whole glyph coherently.
- **Textarea**: min-height floor in `lh`; `field-sizing: content` as an
  `@supports` enhancement. **Checkbox**: invisible hit area floored at 24px
  (WCAG 2.5.8) with zero visual change.
- **Deliberate visual change**: box controls 40px → ~35–37px fluid (they
  now match Button exactly instead of coincidentally sitting 3px taller).
- **Density was considered and explicitly NOT built**: a declared
  `--fui-density` contradicts measured size-from-context. Revisit with Rich
  only if a real equal-width/different-density case materialises.

## Detection extensions (2026-08)

- **`:user-invalid` joins the field error detection** alongside
  ARIA/`:has()`: native constraint validation styles fields with zero JS and
  zero props. The platform is a context source like any other.
- **Icon-only buttons detect from the accessible name**
  (`[aria-label]:has(svg)`), not DOM shape — `svg:only-child` can't
  distinguish "icon + bare text node" from "icon alone" (text nodes aren't
  elements), and keying off aria-label means the compact look only appears
  when the button is correctly labelled: the a11y requirement and the visual
  contract are one mechanism.

## Open questions **[for Rich]**

- Headless vs styled: the notes describe a styled library (Web Awesome
  pillar, token theming for the CMS); confirm nothing from the call
  contradicts this.
