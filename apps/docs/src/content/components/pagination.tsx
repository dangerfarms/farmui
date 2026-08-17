import type { ComponentContent } from "@/renderer/types";
import { PaginationDemo, PaginationEdgesDemo, PaginationManyDemo } from "./pagination.client";

const doc: ComponentContent = {
  slug: "pagination",
  lead: "Navigate through pages of content with a controlled page picker.",
  importLine: `import { Pagination } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description: "Controlled: hold the current page in state.",
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
  whenToUse: [
    "For long result sets (search results, tables, archives) where users need to know where they are in the set and jump to a position.",
    "When users may want to return to a specific point: numbered pages give every position a stable address, which continuous scrolling cannot.",
  ],
  whenNotToUse: [
    "For short lists: if everything fits on one or two pages, show it all; a pager over a handful of items adds clicks without adding orientation.",
    "For feeds built for continuous browsing where position never matters: a 'load more' control fits that reading pattern better than page numbers nobody will cite.",
  ],
  howItWorks: [
    {
      title: "Show more per page before adding more pages",
      body: "Deep pagination is a poor way to find anything: nobody browses to page 37 of 120. Before reaching for a longer pager, raise the page size or improve search and filtering so users land near what they want. Pagination is for orienting within a set, not a substitute for findability.",
    },
    {
      title: "Previous and Next stay put",
      body: "Sequential movement is what pagination is for, so Previous and Next always render — at the first and last page they are disabled, not removed. Removing them would shift every control sideways and make the pager's layout depend on which page you're on; a disabled edge control tells users they've reached the end without moving the target they were clicking.",
    },
    {
      title: "The ends are always visible",
      body: "The page list always includes page 1 and the last page, with aria-hidden ellipses standing in for the gaps and sibling pages shown around the active one. Users can therefore read the size of the whole set and reach either end in one click from anywhere.",
    },
    {
      title: "Mirror the page in the URL",
      body: "The component is controlled: you hold the page in state and pass value/onChange. Reflect that value in the query string so page 4 of your results is linkable, survives a reload, and works with the back button; a pager whose position lives only in memory strands users at page 1 every visit.",
    },
  ],
  accessibility: [
    'The pager is a <nav aria-label="Pagination"> (the label is overridable) wrapping a list, so assistive technology exposes it as a navigation landmark with a known number of items.',
    'The active page carries aria-current="page", and it is also styled via data-active; the position is announced, and colour is not the only visual signal.',
    'Every control is a real <button type="button"> with an explicit aria-label ("Previous page", "Page 7", "Last page"), so the icon-only controls and bare numbers all have unambiguous accessible names.',
    "Ellipsis separators are aria-hidden: they are visual shorthand for the gap, not stops in the reading order.",
    "Edge controls disable rather than disappear at the ends, and onChange fires only when the page actually changes; activating the current page or a disabled control announces nothing and reloads nothing.",
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
      description: "The active page (1-based).",
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
      description: "Number of sibling pages shown on each side of the active page.",
    },
    {
      name: "withEdges",
      type: "boolean",
      default: "false",
      description: "Show first/last page buttons at the edges.",
    },
    {
      name: "aria-label",
      type: "string",
      default: `"Pagination"`,
      description: "The navigation landmark's accessible name.",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <nav> props are forwarded.",
    },
  ],
};

export default doc;
