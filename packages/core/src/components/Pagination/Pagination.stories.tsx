import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Pagination } from "../../index";
import type { PaginationProps } from "../../index";

/**
 * Pagination is fully controlled (`total`/`value`/`onChange` are all required),
 * so every story drives it through a small `useState` wrapper to stay
 * interactive.
 */
function PaginationDemo({
  total = 10,
  initialPage = 1,
  ...props
}: Partial<PaginationProps> & { initialPage?: number }) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination {...props} total={total} value={page} onChange={setPage} />
  );
}

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    total: 10,
    value: 1,
    siblings: 1,
    withEdges: false,
    // `value`/`onChange` are driven by the stateful wrapper below; this no-op
    // just satisfies the required-prop type at the meta level.
    onChange: () => {},
  },
  argTypes: {
    total: { control: { type: "number", min: 1 } },
    siblings: { control: { type: "number", min: 0, max: 3 } },
    withEdges: { control: "boolean" },
    // Controlled by the wrapper's local state, not the Controls panel.
    value: { control: false },
    onChange: { control: false },
  },
  render: ({ total, siblings, withEdges }) => (
    <PaginationDemo total={total} siblings={siblings} withEdges={withEdges} />
  ),
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — tweak total/siblings/edges in the Controls panel. */
export const Playground: Story = {};

/** First/last edge buttons enabled via `withEdges`. */
export const WithEdges: Story = {
  args: { withEdges: true },
};

/** A large page count collapses the middle into ellipsis gaps. */
export const ManyPages: Story = {
  render: () => <PaginationDemo total={25} initialPage={12} withEdges />,
};

/** More sibling pages shown either side of the active page. */
export const MoreSiblings: Story = {
  render: () => <PaginationDemo total={25} initialPage={12} siblings={2} />,
};

/**
 * Interaction test: clicking Next and a numbered page moves the active page.
 * The active control carries `aria-current="page"`.
 */
export const NavigatesPages: Story = {
  render: () => <PaginationDemo total={10} initialPage={1} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Page 1 starts active.
    const page1 = canvas.getByRole("button", { name: "Page 1" });
    await expect(page1).toHaveAttribute("aria-current", "page");

    // Click "Next page" → page 2 becomes active.
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    const page2 = canvas.getByRole("button", { name: "Page 2" });
    await expect(page2).toHaveAttribute("aria-current", "page");
    await expect(page1).not.toHaveAttribute("aria-current");

    // Jump directly to page 4 by clicking its number.
    await userEvent.click(canvas.getByRole("button", { name: "Page 4" }));
    const page4 = canvas.getByRole("button", { name: "Page 4" });
    await expect(page4).toHaveAttribute("aria-current", "page");
    await expect(page2).not.toHaveAttribute("aria-current");
  },
};
