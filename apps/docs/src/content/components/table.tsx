import { Table } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const rows = [
  { invoice: "INV-1024", status: "Paid", amount: "$1,240.00" },
  { invoice: "INV-1025", status: "Pending", amount: "$820.00" },
  { invoice: "INV-1026", status: "Paid", amount: "$2,010.00" },
  { invoice: "INV-1027", status: "Overdue", amount: "$640.00" },
];

const doc: ComponentDoc = {
  slug: "table",
  name: "Table",
  category: "Data display",
  description:
    "A styled data table composed from native thead/tbody/tr/th/td markup.",
  importLine: `import { Table } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      code: `<Table>
  <thead>
    <tr><th>Invoice</th><th>Status</th><th>Amount</th></tr>
  </thead>
  <tbody>
    <tr><td>INV-1024</td><td>Paid</td><td>$1,240.00</td></tr>
    <tr><td>INV-1025</td><td>Pending</td><td>$820.00</td></tr>
    <tr><td>INV-1026</td><td>Paid</td><td>$2,010.00</td></tr>
  </tbody>
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Striped",
      description: "Shade alternating body rows and add column borders.",
      code: `<Table striped withColumnBorders>
  {/* thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table striped withColumnBorders>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      title: "Highlight on hover",
      description:
        "Rows highlight under the pointer; a caption labels the table.",
      code: `<Table highlightOnHover captionSide="bottom">
  <caption>Recent invoices by status</caption>
  {/* thead / tbody */}
</Table>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "32rem" }}>
          <Table highlightOnHover captionSide="bottom">
            <caption>Recent invoices by status</caption>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.invoice}>
                  <td>{r.invoice}</td>
                  <td>{r.status}</td>
                  <td>{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "striped",
      type: "boolean",
      description: "Shade alternating body rows.",
    },
    {
      name: "highlightOnHover",
      type: "boolean",
      description: "Highlight the row under the pointer.",
    },
    {
      name: "withColumnBorders",
      type: "boolean",
      description: "Draw vertical borders between columns.",
    },
    {
      name: "captionSide",
      type: `"top" | "bottom"`,
      default: `"top"`,
      description: "Which side to place a <caption>.",
    },
    {
      name: "...others",
      type: "TableHTMLAttributes",
      description: "All native <table> props are forwarded.",
    },
  ],
};

export default doc;
