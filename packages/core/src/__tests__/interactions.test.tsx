import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
  Tooltip,
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

/*
 * jsdom implements <dialog> (show/showModal/close and the close event) but
 * not UA behaviors: Escape, closedby light dismiss, and focus-restore run in
 * a real browser only — they're covered by the Storybook play test.
 */
describe("Modal", () => {
  function ModalDemo() {
    return (
      <Modal.Root>
        <Modal.Trigger>Open</Modal.Trigger>
        <Modal.Popup>
          <Modal.Title>Hello</Modal.Title>
          <Modal.Description>Modal body</Modal.Description>
          <Modal.Close>Done</Modal.Close>
        </Modal.Popup>
      </Modal.Root>
    );
  }

  it("opens from its trigger and closes via the Close part", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    const trigger = screen.getByRole("button", { name: "Open" });
    const dialog = document.querySelector("dialog")!;
    expect(dialog.open).toBe(false);

    await user.click(trigger);
    expect(dialog.open).toBe(true);
    expect(trigger).toHaveAttribute("data-popup-open", "true");
    expect(dialog).toHaveAttribute("data-open");
    expect(dialog).toHaveAccessibleName("Hello");
    expect(dialog).toHaveAccessibleDescription("Modal body");

    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() => expect(dialog.open).toBe(false));
    expect(trigger).not.toHaveAttribute("data-popup-open");
  });

  it("syncs native close events back into state", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    const dialog = document.querySelector("dialog")!;
    expect(dialog.open).toBe(true);

    // A native close (Escape / light dismiss / method="dialog" all funnel
    // here) must update React state, reflected in the trigger's hook.
    dialog.close();
    await waitFor(() =>
      expect(trigger).not.toHaveAttribute("data-popup-open"),
    );
  });
});

/*
 * jsdom implements neither the popover API nor CSS anchor positioning, so
 * these suites exercise the components' fallback path (hidden attribute + JS
 * dismiss handling). The enhanced top-layer path is covered by the Storybook
 * play tests, which run in a real browser.
 */
describe("Popover", () => {
  function PopoverDemo() {
    return (
      <div>
        <Popover.Root>
          <Popover.Trigger>Toggle</Popover.Trigger>
          <Popover.Popup>Popover body</Popover.Popup>
        </Popover.Root>
        <button>outside</button>
      </div>
    );
  }

  it("opens on trigger click and closes on outside click", async () => {
    const user = userEvent.setup();
    render(<PopoverDemo />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(screen.getByText("Popover body")).not.toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(screen.getByText("Popover body")).toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // Shared styling hooks (the Base UI state-attribute vocabulary).
    expect(trigger).toHaveAttribute("data-popup-open", "true");
    expect(screen.getByText("Popover body")).toHaveAttribute("data-open");

    await user.click(screen.getByRole("button", { name: "outside" }));
    await waitFor(() =>
      expect(screen.getByText("Popover body")).not.toBeVisible(),
    );
    expect(trigger).not.toHaveAttribute("data-popup-open");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<PopoverDemo />);
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Popover body")).toBeVisible();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.getByText("Popover body")).not.toBeVisible(),
    );
  });

  it("opens via a render-composed trigger and keeps focus restoration", async () => {
    const user = userEvent.setup();
    render(
      <Popover.Root>
        <Popover.Trigger render={<Button>Menu</Button>} />
        <Popover.Popup>
          <Popover.Close>Done</Popover.Close>
        </Popover.Popup>
      </Popover.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveClass("fui-Button-root");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // Ref composition: closing from inside restores focus to the real Button.
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(trigger).toHaveFocus();
  });

  it("moves focus into the panel on open and restores it on close", async () => {
    const user = userEvent.setup();
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Popup>
          <Popover.Close>Done</Popover.Close>
        </Popover.Popup>
      </Popover.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    const popup = screen.getByRole("dialog");
    expect(popup).toHaveFocus();

    // Closing from inside returns focus to the trigger (WCAG 2.4.3).
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(popup).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });

  it("labels the popup from its Title and Description parts", async () => {
    const user = userEvent.setup();
    render(
      <Popover.Root>
        <Popover.Trigger>Open</Popover.Trigger>
        <Popover.Popup>
          <Popover.Title>Settings</Popover.Title>
          <Popover.Description>Preferences panel.</Popover.Description>
        </Popover.Popup>
      </Popover.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = screen.getByRole("dialog");
    expect(popup).toHaveAccessibleName("Settings");
    expect(popup).toHaveAccessibleDescription("Preferences panel.");
  });
});

describe("Tooltip", () => {
  function TooltipDemo({ delay }: { delay?: number }) {
    return (
      <Tooltip.Root delay={delay}>
        <Tooltip.Trigger>Save</Tooltip.Trigger>
        <Tooltip.Popup>Saves your changes</Tooltip.Popup>
      </Tooltip.Root>
    );
  }

  it("statically links the trigger via aria-describedby (render form)", () => {
    render(
      <Tooltip.Root>
        <Tooltip.Trigger render={<Button>Save</Button>} />
        <Tooltip.Popup>Saves your changes</Tooltip.Popup>
      </Tooltip.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Save" });
    const bubble = screen.getByText("Saves your changes");
    expect(trigger).toHaveAttribute("aria-describedby", bubble.id);
    expect(bubble).not.toBeVisible();
  });

  it("reveals immediately on keyboard focus and hides on blur", async () => {
    const user = userEvent.setup();
    render(<TooltipDemo />);
    const bubble = screen.getByText("Saves your changes");

    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    expect(bubble).toBeVisible();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "data-popup-open",
      "true",
    );
    expect(bubble).toHaveAttribute("data-open");

    await user.tab();
    expect(bubble).not.toBeVisible();
  });

  it("reveals on hover only after the delay", async () => {
    const user = userEvent.setup();
    render(<TooltipDemo delay={80} />);
    const bubble = screen.getByText("Saves your changes");

    await user.hover(screen.getByRole("button", { name: "Save" }));
    // Not shown synchronously — the open is delayed.
    expect(bubble).not.toBeVisible();
    await waitFor(() => expect(bubble).toBeVisible());
  });

  it("stays open for a focused trigger while a pointer passes over and away", async () => {
    const user = userEvent.setup();
    render(<TooltipDemo />);
    const trigger = screen.getByRole("button", { name: "Save" });
    const bubble = screen.getByText("Saves your changes");

    await user.tab();
    expect(bubble).toBeVisible();

    // A pointer sweeping across the trigger must not steal the bubble from
    // the still-focused keyboard user (WCAG 1.4.13 persistent).
    await user.hover(trigger);
    await user.unhover(trigger);
    await new Promise((r) => setTimeout(r, 400));
    expect(bubble).toBeVisible();
  });

  it("dismisses on Escape without moving focus (WCAG 1.4.13)", async () => {
    const user = userEvent.setup();
    render(<TooltipDemo />);
    const trigger = screen.getByRole("button", { name: "Save" });
    const bubble = screen.getByText("Saves your changes");

    await user.tab();
    expect(bubble).toBeVisible();

    await user.keyboard("{Escape}");
    expect(bubble).not.toBeVisible();
    expect(trigger).toHaveFocus();
    // The description link survives dismissal.
    expect(trigger).toHaveAttribute("aria-describedby", bubble.id);
  });
});
