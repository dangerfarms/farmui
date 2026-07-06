import type { Preview, Decorator } from "@storybook/react-vite";
import { useEffect } from "react";

// FarmUI's tokens/reset + every component's static CSS (the classes the
// components reference live in per-component .css files).
import "../src/styles.css";
import.meta.glob("../src/components/**/*.css", { eager: true });

const withTheme: Decorator = (Story, ctx) => {
  const theme = (ctx.globals.theme as string) ?? "light";
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <div
      style={{
        background: "var(--fui-bg)",
        color: "var(--fui-text)",
        fontFamily: "var(--fui-font)",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    // Fail stories (and the test run) on axe violations.
    a11y: { test: "error" },
  },
};

export default preview;
