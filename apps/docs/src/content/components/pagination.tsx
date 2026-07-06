import type { ComponentDoc } from "@/docs/types";
import {
  PaginationDemo,
  PaginationEdgesDemo,
  PaginationManyDemo,
} from "./pagination.client";

const doc: ComponentDoc = {
  slug: "pagination",
  name: "Pagination",
  category: "Navigation",
  description:
    "Navigate through pages of content with a controlled page picker.",
  importLine: `import { Pagination } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description: "Controlled — hold the current page in state.",
      code: `function Demo() {
  const [page, setPage] = useState(1);
  return <Pagination total={10} value={page} onChange={setPage} />;
}`,
      render: () => <PaginationDemo />,
    },
    {
      title: "With edges",
      description: "Add first/last buttons with withEdges.",
      code: `function Demo() {
  const [page, setPage] = useState(5);
  return (
    <Pagination total={10} value={page} onChange={setPage} withEdges />
  );
}`,
      render: () => <PaginationEdgesDemo />,
    },
    {
      title: "Many pages",
      description: "Ellipsis gaps keep the control compact across 20 pages.",
      code: `function Demo() {
  const [page, setPage] = useState(10);
  return <Pagination total={20} value={page} onChange={setPage} withEdges />;
}`,
      render: () => <PaginationManyDemo />,
    },
  ],
  props: [
    {
      name: "total",
      type: "number",
      description: "Total number of pages.",
    },
    {
      name: "value",
      type: "number",
      description: "Currently active page (1-based).",
    },
    {
      name: "onChange",
      type: "(page: number) => void",
      description: "Called with the new page when a control is activated.",
    },
    {
      name: "siblings",
      type: "number",
      default: "1",
      description:
        "Number of sibling pages shown on each side of the active page.",
    },
    {
      name: "withEdges",
      type: "boolean",
      default: "false",
      description: "Show first/last page buttons at the edges.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <nav> props are forwarded.",
    },
  ],
};

export default doc;
