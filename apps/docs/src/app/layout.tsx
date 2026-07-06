import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/site/Header";
import { Footer } from "@/site/Footer";

export const metadata: Metadata = {
  title: {
    default: "FarmUI — Accessible, high-performance React components",
    template: "%s · FarmUI",
  },
  description:
    "FarmUI is a fully-featured React component library focused on accessibility and performance. Zero-runtime styling, WCAG-compliant components, tiny bundles, native light-dark(), container queries, and CSS-variable theming.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
