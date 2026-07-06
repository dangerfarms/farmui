# @farmui/core

Beautiful React components, fast & accessible — zero-runtime, built on native
modern CSS. Part of [FarmUI](https://github.com/dangerfarms/farmui).

```bash
npm install @farmui/core
```

```tsx
import "@farmui/core/styles.css";
import { Button, Input } from "@farmui/core";

export function SignIn() {
  return (
    <form>
      <Input label="Email" placeholder="you@example.com" />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

- **Zero runtime** — styles are plain, static CSS in cascade layers.
- **Themeable** — override `--fui-*` CSS variables; no provider, no config.
- **Native dark mode** — `light-dark()`; flip `color-scheme` (or set
  `data-theme="dark"` / `"light"` on `<html>`).
- **Accessible & semantic** by default.

Full documentation and live examples: **https://farmui.dev**

## License

[MIT](../../LICENSE) © Danger Farms
