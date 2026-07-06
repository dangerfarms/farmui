import type { ReactNode } from "react";

/** A single live example on a component page. */
export interface Demo {
  title: string;
  description?: string;
  /** Source shown in the Code tab (exact string, already formatted). */
  code: string;
  /** Rendered output for the Preview tab. */
  render: () => ReactNode;
}

/** One row in a component's props table. */
export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/** The full documentation entry for one component. */
export interface ComponentDoc {
  slug: string;
  name: string;
  category: Category;
  /** One-line summary shown under the title and in search. */
  description: string;
  /** Import statement shown at the top of the page. */
  importLine: string;
  demos: Demo[];
  props: PropRow[];
}

export type Category =
  "Inputs" | "Data display" | "Feedback" | "Overlays" | "Navigation" | "Layout";

/** Sidebar ordering for categories. */
export const CATEGORY_ORDER: Category[] = [
  "Inputs",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
  "Layout",
];
