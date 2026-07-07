# @farmui/blocks

Ready-made, data-driven page sections — hero, features, pricing, testimonials,
FAQ and more — built on [@farmui/core](https://www.npmjs.com/package/@farmui/core).
Part of [FarmUI](https://github.com/dangerfarms/farmui).

```bash
npm install @farmui/core @farmui/blocks
```

```tsx
import "@farmui/core/styles.css";
import "@farmui/blocks/styles.css";
import { Hero, FeatureGrid, PricingTable } from "@farmui/blocks";

export default function Landing() {
  return (
    <>
      <Hero
        title="Ship your landing page today"
        description="Composable, accessible sections built on modern CSS."
        actions={[{ label: "Get started", href: "/docs" }]}
      />
      <FeatureGrid
        features={[
          { title: "Fast", description: "Zero-runtime styling." },
          { title: "Accessible", description: "WCAG-compliant by default." },
        ]}
      />
    </>
  );
}
```

Every block is a **server-safe**, semantic section styled with the same
`--fui-*` tokens — theme them exactly like the rest of FarmUI.

Full documentation: **https://farmui.dev**

## License

[MIT](../../LICENSE) © Danger Farms
