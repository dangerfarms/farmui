### Context and Purpose

- Session with Rich: a design systems and CSS expert with decades of component library experience
- Goal: define what makes a best-in-class component library, then apply that vision to Farm UI and the white-label CMS project
- Lewis has given Rich broader context on the Payload CMS setup; this session focused on the component library vision

### White-Label CMS: Current State

- Multi-tenant Payload CMS with two tenants provisioned, each with distinct themes
- Themes driven by CSS token overrides in the tenant config design tab
- Custom blocks built for the CMS (stats ring, etc.), all backed by code
- Farm UI primitives not yet integrated: current blocks are bespoke, not built on top of Farm UI
- Goal: rebuild blocks on top of Farm UI primitives, properly themed and accessible

### The Four Pillars of a Best-in-Class Component Library

Rich’s framework: pull together the best-in-class thinking from four distinct strands, which no other library is currently doing together.

1. **Chrome Modern Web Guidance**: the Google Chrome team’s web platform skill/guidelines, covering modern APIs (popover API, anchor positioning, container queries, etc.)
2. **React Component Architecture**: Base UI’s composition model, reflecting a decade of learning that HTML’s compositional approach was right all along
3. **Cascade vs. Encapsulation Judgment**: Web Awesome’s approach, striking the balance between monolithic stylesheets and fully isolated components
4. **UX and Accessibility Best Practice**: distilled from Polaris (Shopify) and the GOV.UK Design System

### What Makes This Differentiated

- Not innovating in any one strand: taking the best of each and combining them
- The human judgment and taste in that curation is what AI cannot replicate
- Deterministic guardrails (linting, tooling) enforce quality regardless of whether a human or agent writes the code
- Farm UI currently has none of this: no guardrails, duplicated CSS, outdated APIs, no usage guidance
- Open source is secondary: primary value is internal use and client-facing credibility

### Composition Model: Base UI as the Reference

- Farm UI currently passes label, description, error as props into a single input component
- The modern approach: small primitives (Label, Description, Error, Input) composed together via a Field root component
  - Field auto-wires accessibility (label ID matched to control ID)
  - Consumers can reorder or swap components freely
- Farm UI’s button is over-engineered: before/after slots, size variants, state variants
  - Strip it back to just a button that takes children
  - Variants and sizing handled via modes and tokens, not props

### Cascade, Modes, and Contextualism

- Web Awesome’s judgment call: set shared styles (font family, base element styles) once in a base CSS file; let the cascade do the work
  - Farm UI currently sets font in every single component: duplicated and unnecessary
- Variants replaced by modes and contextualized tokens
  - A “danger” button: wrap in a danger-mode container; the button reads the context and adapts
  - Full-width button: the button detects its container size via container queries and spans it contextually
- Overarching philosophy: **progressive enhancement over degradation**
  - Components opt in to motion, dark mode, size adaptation
  - Farm UI’s current reduced-motion implementation is inverted (degrading rather than enhancing)
- CSS Day 2026 talk on “contextualism” is the reference for this thinking

### Linting and Guardrails

- Recommended toolchain (minimal overlap, best coverage):
  - **Oxlint**: JavaScript linting
  - **Oxformat**: formatting for JS, CSS, and Markdown (prettier-compatible)
  - **Stylelint**: CSS linting, with three shared configs:
    - Rich’s standard config
    - Modern CSS config
    - Ordered properties config
  - Stylelint’s token-validation feature: checks that all CSS variables used actually exist in the definitions file
- Biome noted as an alternative but has overlapping coverage and gaps; not recommended here
- These three pieces together provide “80% of the way there” vs. Farm UI’s current zero guardrails

### Documentation and UX Guidance Philosophy

- Every component needs more than a name and a code example:
  - When to use it vs. when not to
  - Accessibility rationale (e.g. GOV.UK: use “optional” in text rather than asterisks)
  - UX best practice peppered in, even if just one or two sentences per component
- Reference sources per concern:
  - Color tokens: Polaris color theory
  - Input components: GOV.UK Design System + Polaris
  - Modern API usage: Chrome web guidance repo
- Documentation should be human-readable and LLM-consumable (plain Markdown is sufficient for now)
- This documentation is the marketing differentiator: not just “it’s accessible” but “here’s the specific judgment call we made and why”

### Next Steps

- **Review the Chrome Modern Web Guidance repo in depth**
- **Point the Chrome web guidance skill at the Farm UI codebase**
- **Study Base UI's Field and composition model as the architectural reference**
- **Review CSS Day 2026 contextualism talk**
- **Attempt to apply the vision to Farm UI before the afternoon session with Rich and Lewis**

### Why Build a Custom Component Library

- Unique value: combines modern web thinking with timeless UX best practices
  - Modern pillars: Modern Web Guidance, Base UI composition model, base/default styles approach
  - Timeless pillars: Polaris (Shopify), GOV.UK Design System (proven UX and accessibility)
- No existing library does this combination yet
- Tailwind and similar tools are locked into paradigms from 5-10 years ago
- Scope justification: Dangerfarms only needs ~20 components for its client types
  - A lean, focused library beats a bloated off-the-shelf one maintained across too many use cases
  - AI-generated output (e.g. current FarmUI via skill) produces “slop” without human judgment constraining it

### Modern CSS Gaps in Current FarmUI

- CSS @scope: not used; currently relies on BEM class naming conventions
  - Modern approach: scope styles to a component, use element selectors inside, no global pollution
  - This is the web platform’s native answer to CSS Modules (baseline in all browsers since last year)
- Nesting: not implemented; now natively supported across all browsers
- Additive CSS (no overrides): not followed
  - Current code sets a property then overrides it conditionally, making cascade hard to reason about
  - Correct approach: mutually exclusive conditions, each setting a property for the first time
  - Only permitted override: between the elements layer and the components layer
- Contextual/proportional sizing: font size and spacing not relative to container size
  - FarmUI sets font-size ~70 times across components; should be set once
- Progressive enhancement (not degradation): FarmUI uses the degradation anti-pattern
  - Wrong: set animation, then disable for prefers-reduced-motion
  - Right: opt in only if the user is okay with motion (@media (prefers-reduced-motion: no-preference))

### CSS Architecture Principles

- Layer structure: elements layer first, components layer on top
  - Overrides only permitted between these two layers, nowhere else
- Global CSS file: one file for base/default styles (no need to split into multiple files initially)
  - ~500 lines of modern CSS can replace thousands of lines of component-level overrides
  - Sets font sizing, line height, color tokens, dark mode, smooth scrolling, link states, hyphenation, etc.
- Grid vs. Flex guidance from Richard:
  - Grid: two-dimensional layouts, larger components; prefer sub-grid for modern layouts
  - Flex: one-dimensional, micro-components (e.g. fixed + flexible side-by-side field)
- Composable components over monolithic ones
  - Example: a button accepting children beats a button with a text prop and icon variants
  - Avoids prop explosion and enables per-client configuration without duplication

### Component Library Scope and Strategy

- Start small: get the foundation right before adding components
  - Priority: base CSS defaults, then core primitives (form, button, text field, error/description)
  - Do not try to refactor everything currently in FarmUI
- Promote to shared library cautiously: if a component needs overriding per project, it probably shouldn’t be in the core
  - “Recipes” (e.g. hero components) belong at the project level, not the primitive level
  - Hero components reuse 6-7 primitives arranged differently per client
- Accordion is a UX anti-pattern: rarely the right solution
  - Better alternatives: scrollable content, disclosure (<details>) for secondary info, table of contents + headings for FAQs
  - FAQ pages themselves are often a symptom of poor information architecture
- Base UI: useful as a reference for compositional model and larger complex components
  - Some Base UI implementations are backwards-looking on CSS (e.g. checkbox in hundreds of lines)
  - May borrow selectively rather than adopt wholesale

### CMS Theme Overrides

- Token-level theming is fine: overriding design tokens per client is the intended pattern
- Overriding spacing, layout, or structural properties is a smell
  - Indicates the component may be too specific for the shared library
  - Solution: keep primitives in the library, build project-specific compositions outside it
- No clients yet, so no immediate pressure; composable primitives give flexibility when clients do arrive

### Documentation as a Marketing Tool and Next Steps

- Richard to frame the library to Lewis around three things: judgment, taste, and a place to hold understanding
  - Judgment: choosing best-in-class modern and timeless references
  - Taste: combining them into a coherent, principled system
  - Understanding: documented, enforceable standards for both humans and AI agents
- Documentation should explain the _why_ behind decisions, not just the what
  - Modelled on GOV.UK Design System’s approach to justifying patterns
  - Positions the library as a marketing asset for the white-label offering
- Richard to send a summary doc with vision, links to reference materials, and guidance on base CSS

### Next Steps

- **Read through the Modern Web Guidance repo and Polaris design system** (Daniel)
  - Richard will link both; key references for the foundational CSS and timeless UX pillars.
- **Start FarmUI rebuild with foundation first: base CSS then core form primitives** (Daniel)
  - Button, text field, error/description states. Do not refactor existing components; start fresh and small.
- **Send summary doc with vision, reference links, and base CSS guidance** (Richard)
  - To include the five pillars framing and pointers to Modern Web Guidance, Polaris, and GOV.UK Design System.
- **Pitch the library framing to Lewis** (Richard)
  - Lead with judgment, taste, and understanding; position documentation as a marketing asset, not overhead.
- **Check in with Richard once foundation and a couple of components are in place** (Daniel)

### Context and Direction

- Richard shared a demo on contextual CSS (contextualism) as the direction for the component library
- Trend is established, not niche: browser support only landed in the last year, making it fully viable now
- Adopting now puts Dangerfarms ahead of the curve by roughly 2 years

### Contextualism: Core Paradigm

- Default is contextualism, identity (variants) only as a last resort
- Context drives button appearance: size, padding, full-width, danger state, light/dark mode
- ~5 contexts cover most button needs:
  - Size of space
  - Inside text or not
  - Full-width or not
  - Danger mode
  - Reduced motion / light/dark
- No size prop needed: container size sets context, button adapts automatically
- When context isn’t enough (e.g. two buttons in a modal), introduce identity sparingly

### Button and Variant Strategy

- One default button component, styled to look and feel like a button
- Danger variant: wrap in a danger context, not a button prop
- Outline/ghost buttons discouraged: low affordance, accessibility concerns
- Primary button as an identity exception: the one case where a named variant makes sense
- Wrapped component pattern for specialization (e.g. a SecondaryButton wrapping the base)

### Form Fields: Next Implementation Step

- Field component should be contextually aware, not prop-driven
- Error state via :has(): field detects an error message inside it and adds red sidebar
- Input also listens upward: detects error above it and styles its border accordingly
- No isError prop on field or input; both respond to context
- fieldset = group of fields; local field = single input + label + error message
- AI-generated fieldset needs revisiting; use the error-mode example as the model

### Plain CSS and Scoping

- No need for CSS modules or styled-components libraries
- Plain .css file per component, starting with @scope at the top
- @scope provides full encapsulation: tag selectors like input are safe within scope

### Next Steps

- Get button and form field contextualism working, then reach out to Richard for an early review
- Better to check foundations early than after rolling out more components
- Documentation priority: explaining the contextualism paradigm to developers will matter more than the implementation itself
- Richard is available Wednesdays; aim to reconnect next week

- **Revisit and rebuild the fieldset/field component**
  - Use the contextual error-detection pattern (:has()) rather than an isError prop; AI output needs rework.
- **Reach out to Richard for an early review once button and field contextualism are in place**
  - Target next Wednesday; better to validate foundations before rolling out further primitives.
