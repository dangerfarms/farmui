import { Loader } from "@farmui/core";
import type { CSSProperties } from "react";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "loader",
  name: "Loader",
  category: "Feedback",
  description: "An animated indicator for pending, indeterminate work.",
  importLine: `import { Loader } from "@farmui/core";`,
  demos: [
    {
      title: "Variants",
      description: "Spinner, dots, or bars.",
      code: `<Loader variant="spinner" />
<Loader variant="dots" />
<Loader variant="bars" />`,
      render: () => (
        <>
          <Loader variant="spinner" />
          <Loader variant="dots" />
          <Loader variant="bars" />
        </>
      ),
    },
    {
      title: "Sizes",
      description: "Use a token or pass a pixel number.",
      code: `<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />
<Loader size={48} />`,
      render: () => (
        <>
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
          <Loader size={48} />
        </>
      ),
    },
    {
      title: "Contexts",
      description:
        "There is no color prop. Declare --fui-context on a one-element wrapper region (a style query is answered by ancestors, never by the declaring element itself), or let it inherit from the region whose work it reports — a loader in a warning panel is already warning-coloured. See the Contextualism guide.",
      code: `<Loader />
<span style={{ "--fui-context": "primary" }}><Loader /></span>
<span style={{ "--fui-context": "success" }}><Loader /></span>
<span style={{ "--fui-context": "warning" }}><Loader /></span>
<span style={{ "--fui-context": "danger" }}><Loader /></span>
<span style={{ "--fui-context": "info" }}><Loader /></span>`,
      render: () => (
        <>
          <Loader />
          <span style={{ "--fui-context": "primary" } as CSSProperties}>
            <Loader />
          </span>
          <span style={{ "--fui-context": "success" } as CSSProperties}>
            <Loader />
          </span>
          <span style={{ "--fui-context": "warning" } as CSSProperties}>
            <Loader />
          </span>
          <span style={{ "--fui-context": "danger" } as CSSProperties}>
            <Loader />
          </span>
          <span style={{ "--fui-context": "info" } as CSSProperties}>
            <Loader />
          </span>
        </>
      ),
    },
  ],
  props: [
    {
      name: "size",
      type: `"sm" | "md" | "lg" | number`,
      default: `"md"`,
      description: "Overall size — a token or an explicit pixel number.",
    },
    {
      name: "variant",
      type: `"spinner" | "dots" | "bars"`,
      default: `"spinner"`,
      description: "Animation style.",
    },
    {
      name: "label",
      type: "string",
      default: `"Loading"`,
      description: "Accessible label announced to assistive tech.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLSpanElement>",
      description:
        "All native <span> props are forwarded, including style for the custom property below.",
    },
    {
      name: "--fui-context",
      type: `"primary" | "danger" | "success" | "warning" | "info"`,
      description:
        "The loader's status colour. Declare it on an ancestor — a one-element span wrapper for a single loader, or any region — because a style query is answered by ancestors, not by the declaring element; the property inherits.",
    },
  ],
};

export default doc;
