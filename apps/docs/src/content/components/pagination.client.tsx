"use client";

import { useState } from "react";
import { Pagination } from "@farmui/core";

/** Basic controlled pagination with 10 pages. */
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination total={10} value={page} onChange={setPage} />;
}

/** Pagination with first/last edge buttons. */
export function PaginationEdgesDemo() {
  const [page, setPage] = useState(5);
  return <Pagination total={10} value={page} onChange={setPage} withEdges />;
}

/** Many pages — ellipsis gaps keep the control compact. */
export function PaginationManyDemo() {
  const [page, setPage] = useState(10);
  return <Pagination total={20} value={page} onChange={setPage} withEdges />;
}
