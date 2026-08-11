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

/** A titled passage of usage judgment, optionally with its own example. */
export interface HowItWorksEntry {
  title: string;
  /** Prose stating the prescription and its reason. */
  body: string;
  /** Optional live example illustrating the prescription. */
  code?: string;
  render?: () => ReactNode;
}

/** An error-message template for one situation (GOV.UK-style). */
export interface ErrorTemplate {
  situation: string;
  message: string;
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
  /** When this component is the right choice. */
  whenToUse?: string[];
  /** When to reach for something else instead. */
  whenNotToUse?: string[];
  /** Accessibility notes and the reasoning behind them. */
  accessibility?: string[];
  /** Per-situation usage judgment — the "How it works" section. */
  howItWorks?: HowItWorksEntry[];
  /** Error-message templates for form components. */
  errors?: ErrorTemplate[];
  /** Which package the component ships in (used by the CSS tab). @default "core" */
  pkg?: "core";
}

export type Category =
  | "Inputs"
  | "Data display"
  | "Feedback"
  | "Overlays"
  | "Navigation";

/** Sidebar ordering for categories. */
export const CATEGORY_ORDER: Category[] = [
  "Inputs",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
];
