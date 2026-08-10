import { describe, it, expect, afterEach, vi } from "vitest";
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
  Menu,
  Modal,
  Popover,
  Toast,
  Toasts,
  useToast,
  Tooltip,
  Button,
} from "../index";
import type { ToastOptions } from "../index";

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

describe("Menu", () => {
  function renderMenu(onDelete = () => {}) {
    return render(
      <Menu.Root>
        <Menu.Trigger>Options</Menu.Trigger>
        <Menu.Popup>
          <Menu.Item>Rename</Menu.Item>
          <Menu.Item>Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item onClick={onDelete}>Delete</Menu.Item>
        </Menu.Popup>
      </Menu.Root>,
    );
  }

  it("opens on click, focuses the first item, and closes on item activation", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderMenu(onDelete);

    await user.click(screen.getByRole("button", { name: "Options" }));
    const menu = screen.getByRole("menu");
    expect(menu).toBeVisible();
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus(),
    );

    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Options" })).toHaveFocus();
  });

  it("roves focus with arrow keys, loops, and supports Home/End", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Options" }));
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus(),
    );

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}"); // loops
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
    await user.keyboard("{ArrowUp}"); // loops back
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
  });

  it("jumps to items by typing (typeahead)", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Options" }));
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus(),
    );
    await user.keyboard("d");
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Options" }));
    expect(screen.getByRole("menu")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Options" })).toHaveFocus();
  });

  it("opens from the trigger with ArrowUp focusing the last item", async () => {
    const user = userEvent.setup();
    renderMenu();
    screen.getByRole("button", { name: "Options" }).focus();
    await user.keyboard("{ArrowUp}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus(),
    );
  });

  it("skips disabled items when roving", async () => {
    const user = userEvent.setup();
    render(
      <Menu.Root>
        <Menu.Trigger>Options</Menu.Trigger>
        <Menu.Popup>
          <Menu.Item>One</Menu.Item>
          <Menu.Item disabled>Two</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu.Popup>
      </Menu.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Options" }));
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: "One" })).toHaveFocus(),
    );
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Three" })).toHaveFocus();
  });
});

describe("Toast", () => {
  function FireButton(props: { options?: Partial<ToastOptions> }) {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast.add({ title: "Saved", description: "Done.", ...props.options })
        }
      >
        Fire
      </Button>
    );
  }

  it("announces via role=status and dismisses from the close button", async () => {
    const user = userEvent.setup();
    render(
      <Toast.Provider>
        <FireButton />
        <Toasts />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole("button", { name: "Fire" }));
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Saved");
    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("uses role=alert for high priority", async () => {
    const user = userEvent.setup();
    render(
      <Toast.Provider>
        <FireButton options={{ priority: "high" }} />
        <Toasts />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole("button", { name: "Fire" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("auto-dismisses after its timeout", async () => {
    const user = userEvent.setup();
    render(
      <Toast.Provider timeout={40}>
        <FireButton />
        <Toasts />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole("button", { name: "Fire" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument(),
    );
  });

  it("keeps a persistent toast (timeout: 0) until dismissed", async () => {
    const user = userEvent.setup();
    render(
      <Toast.Provider timeout={30}>
        <FireButton options={{ timeout: 0 }} />
        <Toasts />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole("button", { name: "Fire" }));
    await new Promise((r) => setTimeout(r, 80));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("drops the oldest toast past the limit", async () => {
    const user = userEvent.setup();
    function FireMany() {
      const toast = useToast();
      return (
        <Button onClick={() => toast.add({ description: "another" })}>
          Fire
        </Button>
      );
    }
    render(
      <Toast.Provider limit={2} timeout={0}>
        <FireMany />
        <Toasts />
      </Toast.Provider>,
    );
    const fire = screen.getByRole("button", { name: "Fire" });
    await user.click(fire);
    await user.click(fire);
    await user.click(fire);
    expect(screen.getAllByRole("status")).toHaveLength(2);
  });

  it("runs the action and dismisses", async () => {
    const user = userEvent.setup();
    const undo = vi.fn();
    function FireAction() {
      const toast = useToast();
      return (
        <Button
          onClick={() =>
            toast.add({
              description: "Deleted",
              timeout: 0,
              action: { label: "Undo", onClick: undo },
            })
          }
        >
          Fire
        </Button>
      );
    }
    render(
      <Toast.Provider>
        <FireAction />
        <Toasts />
      </Toast.Provider>,
    );
    await user.click(screen.getByRole("button", { name: "Fire" }));
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(undo).toHaveBeenCalledOnce();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("Modal (invoker commands)", () => {
  it("renders declarative commandfor/command wiring when the API exists", async () => {
    // jsdom has no Invoker Commands API — simulate the probe the component
    // uses ('commandForElement' in HTMLButtonElement.prototype).
    Object.defineProperty(HTMLButtonElement.prototype, "commandForElement", {
      configurable: true,
      value: null,
    });
    try {
      render(
        <Modal.Root>
          <Modal.Trigger>Open</Modal.Trigger>
          <Modal.Popup>
            <Modal.Title>Hi</Modal.Title>
            <Modal.Close>Done</Modal.Close>
          </Modal.Popup>
        </Modal.Root>,
      );
      const trigger = screen.getByRole("button", { name: "Open" });
      await waitFor(() =>
        expect(trigger).toHaveAttribute("command", "show-modal"),
      );
      const dialogId = trigger.getAttribute("commandfor");
      expect(dialogId).toBeTruthy();
      // The Close lives inside the (closed, hence aria-hidden) dialog.
      const done = screen.getByRole("button", { name: "Done", hidden: true });
      expect(done).toHaveAttribute("command", "close");
      expect(done).toHaveAttribute("commandfor", dialogId as string);
    } finally {
      delete (HTMLButtonElement.prototype as { commandForElement?: unknown })
        .commandForElement;
    }
  });

  it("falls back to onClick wiring without the API", async () => {
    const user = userEvent.setup();
    render(
      <Modal.Root>
        <Modal.Trigger>Open</Modal.Trigger>
        <Modal.Popup>
          <Modal.Title>Hi</Modal.Title>
          <Modal.Close>Done</Modal.Close>
        </Modal.Popup>
      </Modal.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).not.toHaveAttribute("command");
    await user.click(trigger);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Done" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});

describe("Modal (alert variant)", () => {
  it("renders role=alertdialog with closerequest dismissal", async () => {
    const user = userEvent.setup();
    render(
      <Modal.Root>
        <Modal.Trigger>Delete file</Modal.Trigger>
        <Modal.Popup alert>
          <Modal.Title>Delete this file?</Modal.Title>
          <Modal.Description>This cannot be undone.</Modal.Description>
          <Modal.Close autoFocus>Cancel</Modal.Close>
          <Modal.Close>Delete</Modal.Close>
        </Modal.Popup>
      </Modal.Root>,
    );
    await user.click(screen.getByRole("button", { name: "Delete file" }));
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toHaveAttribute("closedby", "closerequest");
    // Initial focus on the autoFocus (least-destructive) action is native
    // showModal behaviour — real browsers do it; the jsdom shim doesn't, so
    // it is covered by the Storybook interaction suite instead.
  });
});

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
