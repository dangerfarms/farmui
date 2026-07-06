import { Grid, GridCol } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";
import type { ReactNode } from "react";

const Box = ({ children = "Box" }: { children?: ReactNode }) => (
  <div
    style={{
      background: "var(--fui-primary-soft)",
      color: "var(--fui-primary-hover)",
      padding: "1rem",
      borderRadius: "var(--fui-radius-md)",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const doc: ComponentDoc = {
  slug: "grid",
  name: "Grid",
  category: "Layout",
  description:
    "A responsive 12-column layout whose spans adapt to the Grid's own width.",
  importLine: `import { Grid, GridCol } from "@farmui/core";`,
  demos: [
    {
      title: "Basic columns",
      description: "Each GridCol spans a number of the 12 columns.",
      code: `<Grid>
  <GridCol span={4}><div>span 4</div></GridCol>
  <GridCol span={4}><div>span 4</div></GridCol>
  <GridCol span={4}><div>span 4</div></GridCol>
</Grid>`,
      render: () => (
        <Grid>
          <GridCol span={4}>
            <Box>span 4</Box>
          </GridCol>
          <GridCol span={4}>
            <Box>span 4</Box>
          </GridCol>
          <GridCol span={4}>
            <Box>span 4</Box>
          </GridCol>
        </Grid>
      ),
    },
    {
      title: "Responsive spans",
      description:
        "Columns adapt to the Grid's width via container queries — full width by default, half at md, a third at lg.",
      code: `<Grid>
  <GridCol span={12} md={6} lg={4}><div>1</div></GridCol>
  <GridCol span={12} md={6} lg={4}><div>2</div></GridCol>
  <GridCol span={12} md={6} lg={4}><div>3</div></GridCol>
</Grid>`,
      render: () => (
        <Grid>
          <GridCol span={12} md={6} lg={4}>
            <Box>span 12 · md 6 · lg 4</Box>
          </GridCol>
          <GridCol span={12} md={6} lg={4}>
            <Box>span 12 · md 6 · lg 4</Box>
          </GridCol>
          <GridCol span={12} md={6} lg={4}>
            <Box>span 12 · md 6 · lg 4</Box>
          </GridCol>
        </Grid>
      ),
    },
    {
      title: "Auto columns",
      description: `Use span="auto" to size a column to its content while siblings fill the rest.`,
      code: `<Grid>
  <GridCol span="auto"><div>auto</div></GridCol>
  <GridCol span={6}><div>span 6</div></GridCol>
  <GridCol span="auto"><div>auto</div></GridCol>
</Grid>`,
      render: () => (
        <Grid>
          <GridCol span="auto">
            <Box>auto</Box>
          </GridCol>
          <GridCol span={6}>
            <Box>span 6</Box>
          </GridCol>
          <GridCol span="auto">
            <Box>auto</Box>
          </GridCol>
        </Grid>
      ),
    },
    {
      title: "Gutter",
      description: "Control the gap between columns and rows.",
      code: `<Grid gutter="xl">
  <GridCol span={6}><div>span 6</div></GridCol>
  <GridCol span={6}><div>span 6</div></GridCol>
</Grid>`,
      render: () => (
        <Grid gutter="xl">
          <GridCol span={6}>
            <Box>span 6</Box>
          </GridCol>
          <GridCol span={6}>
            <Box>span 6</Box>
          </GridCol>
        </Grid>
      ),
    },
  ],
  props: [
    {
      name: "columns",
      type: "number",
      default: "12",
      description: "Total number of columns.",
    },
    {
      name: "gutter",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | number | string`,
      default: `"md"`,
      description: "Gap between columns and rows.",
    },
    {
      name: "align",
      type: `"start" | "center" | "end" | "stretch" | "baseline"`,
      description: "align-items for the grid rows.",
    },
    {
      name: "justify",
      type: `"start" | "center" | "end" | "between" | "around" | "evenly"`,
      description: "justify-content for the grid.",
    },
    {
      name: "...others",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All native <div> props are forwarded.",
    },
    {
      name: "GridCol span",
      type: `number | "auto"`,
      default: "full width",
      description: `Columns to span, or "auto" to size to content.`,
    },
    {
      name: "GridCol sm",
      type: "number",
      description: "Span once the Grid is ≥ 36rem wide (container query).",
    },
    {
      name: "GridCol md",
      type: "number",
      description: "Span once the Grid is ≥ 48rem wide.",
    },
    {
      name: "GridCol lg",
      type: "number",
      description: "Span once the Grid is ≥ 62rem wide.",
    },
    {
      name: "GridCol xl",
      type: "number",
      description: "Span once the Grid is ≥ 75rem wide.",
    },
  ],
};

export default doc;
