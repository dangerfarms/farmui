import { Loader } from "@farmui/core";
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
      title: "Colors",
      code: `<Loader color="primary" />
<Loader color="info" />
<Loader color="success" />
<Loader color="warning" />
<Loader color="danger" />`,
      render: () => (
        <>
          <Loader color="primary" />
          <Loader color="info" />
          <Loader color="success" />
          <Loader color="warning" />
          <Loader color="danger" />
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
      name: "color",
      type: `"primary" | "info" | "success" | "warning" | "danger"`,
      default: `"primary"`,
      description: "Semantic color.",
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
      description: "All native <span> props are forwarded.",
    },
  ],
};

export default doc;
