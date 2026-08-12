import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/site/Header";
import { Footer } from "@/site/Footer";

export const metadata: Metadata = {
  title: {
    default: "FarmUI — Accessible, high-performance React components",
    template: "%s · FarmUI",
  },
  description:
    "FarmUI is a React component library focused on accessibility and performance. Zero-runtime styling, accessibility-audited components, tiny bundles, native light-dark(), container queries, and CSS-variable theming.",
};

// Renders <meta name="color-scheme" content="light dark"> — the UA needs the
// supported schemes before the stylesheet loads (correct default canvas,
// form controls and scrollbars pre-paint).
export const viewport: Viewport = {
  colorScheme: "light dark",
};

// Set the theme before paint to avoid a flash of the wrong color scheme.
const themeInit = `
(function () {
  try {
    var t = localStorage.getItem("farmui-theme");
    if (t === "light" || t === "dark") {
      document.documentElement.dataset.theme = t;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const base = process.env.BASE_PATH || "";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Served statically (not bundler-parsed) — see scripts/sync-css.mjs */}
        <link rel="stylesheet" href={`${base}/farmui-core.css`} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
