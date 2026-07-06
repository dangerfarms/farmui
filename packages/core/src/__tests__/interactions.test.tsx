import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import {
  Switch,
  Checkbox,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Accordion,
  AccordionItem,
  Modal,
  Popover,
  Button,
} from "../index";

afterEach(cleanup);

describe("Switch", () => {
  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch label="Notifications" />);
    const sw = screen.getByRole("switch") as HTMLInputElement;
    expect(sw.checked).toBe(false);
    await user.click(sw);
    expect(sw.checked).toBe(true);
  });
});

describe("Checkbox", () => {
  it("reflects the indeterminate prop on the DOM node", () => {
    render(<Checkbox label="Select all" indeterminate />);
    const cb = screen.getByRole("checkbox") as HTMLInputElement;
    expect(cb.indeterminate).toBe(true);
  });
});

describe("Tabs", () => {
  it("switches panels on click and supports arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTab value="a">Account</TabsTab>
          <TabsTab value="b">Security</TabsTab>
        </TabsList>
        <TabsPanel value="a">Account panel</TabsPanel>
        <TabsPanel value="b">Security panel</TabsPanel>
      </Tabs>,
    );
    // Inactive panels stay mounted but hidden (preserves state).
    expect(screen.getByText("Account panel")).toBeVisible();
    expect(screen.getByText("Security panel")).not.toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Security" }));
    expect(screen.getByText("Security panel")).toBeVisible();

    // roving keyboard nav
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

describe("Accordion", () => {
  it("expands an item on summary click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem label="Question">Answer text</AccordionItem>
      </Accordion>,
    );
    const details = screen.getByText("Question").closest("details")!;
    expect(details.open).toBe(false);
    await user.click(screen.getByText("Question"));
    expect(details.open).toBe(true);
  });
});

describe("Modal", () => {
  it("opens from a trigger and closes on Escape", async () => {
    const user = userEvent.setup();
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Modal opened={open} onClose={() => setOpen(false)} title="Hello">
            Modal body
          </Modal>
        </>
      );
    }
    render(<Demo />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});

describe("Popover", () => {
  it("opens on trigger click and closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover trigger={<Button>Toggle</Button>}>Popover body</Popover>
        <button>outside</button>
      </div>,
    );
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "outside" }));
    await waitFor(() =>
      expect(screen.queryByText("Popover body")).not.toBeInTheDocument(),
    );
  });
});
