import type { ComponentContent } from "@/renderer/types";
import {
  ToastActionDemo,
  ToastDemo,
  ToastPersistentDemo,
  ToastPriorityDemo,
} from "./toast.client";

const doc: ComponentContent = {
  slug: "toast",
  lead: "Transient notifications announced by native live regions and rendered in the browser's top layer.",
  importLine: `import { Button, Toast, Toasts, useToast } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Mount Toast.Provider once near the app root with the ready-made <Toasts /> viewport, then fire toasts from anywhere below with the useToast hook. The viewport renders with popover=\"manual\" — the browser's top layer, above every dialog, with no z-index management.",
      code: `function SaveButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({ title: "Saved", description: "Your changes are live." })
      }
    >
      Save changes
    </Button>
  );
}

// once, near the app root
<Toast.Provider>
  <SaveButton />
  <Toasts />
</Toast.Provider>`,
      render: () => <ToastDemo />,
    },
    {
      title: "With an action",
      description:
        "An optional action renders as a button inside the toast — the classic Undo. Activating it runs the handler and dismisses the toast. Keep it to one action; anything more deserves a place in the page.",
      code: `function ArchiveButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Message archived",
          action: {
            label: "Undo",
            onClick: () => toast.add({ title: "Message restored" }),
          },
        })
      }
    >
      Archive
    </Button>
  );
}`,
      render: () => <ToastActionDemo />,
    },
    {
      title: "High priority",
      description:
        "priority: \"high\" renders role=\"alert\" and announces assertively, interrupting what the screen reader is saying. Reserve it for urgent, time-sensitive messages; the default role=\"status\" waits its turn.",
      code: `toast.add({
  title: "Connection lost",
  description: "Trying to reconnect…",
  priority: "high",
});`,
      render: () => <ToastPriorityDemo />,
    },
    {
      title: "Persistent",
      description:
        "timeout: 0 keeps a toast on screen until the user dismisses it — for messages that must not slip by, like a finished export waiting to be downloaded.",
      code: `toast.add({
  title: "Export ready",
  description: "Stays until you dismiss it.",
  timeout: 0,
});`,
      render: () => <ToastPersistentDemo />,
    },
  ],
  whenToUse: [
    "To confirm the outcome of an action the user just took — saved, sent, archived — without interrupting their flow.",
    "For background events that complete while the user is elsewhere — an export finishing, a sync completing.",
  ],
  whenNotToUse: [
    "For errors the user must fix — show the error where the problem is (Field errors, or an Alert in place); a message that disappears cannot be acted on.",
    "As the only record of something important — toasts vanish, so anything the user may need later must also exist in the page (GOV.UK: don't rely on transient messages).",
    "For messages that require a decision — use Modal, which holds focus until the user answers.",
  ],
  accessibility: [
    "Each toast is a native live region: role=\"status\" announces politely on insertion, and priority: \"high\" renders role=\"alert\", which interrupts — reserved for urgent messages.",
    "F6 moves keyboard focus into the notifications region (role=\"region\", labelled \"Notifications\"), so a toast's action or dismiss button is reachable from anywhere; the viewport never traps focus.",
    "Auto-dismiss timers pause while the pointer or keyboard focus is inside the viewport and resume with the remaining time — WCAG 2.2.1 Timing Adjustable.",
    "The viewport renders with popover=\"manual\": the browser's top layer places it above every dialog and popover with no z-index war, and nothing can light-dismiss it.",
    "The default dismiss button carries an explicit aria-label (\"Dismiss notification\").",
  ],
  props: [
    {
      name: "Provider",
      type: "timeout?: number · limit?: number",
      description:
        "Owns the toast queue; mount once near the app root. timeout is the default auto-dismiss delay in ms (5000); limit caps how many toasts show at once (3) — the oldest closes first.",
    },
    {
      name: "useToast()",
      type: "() => { toasts, add, close }",
      description:
        "Fire and dismiss toasts from anywhere under the Provider. add(options) returns the toast's id — adding again with the same id updates in place; close(id?) dismisses one toast, or all when omitted.",
    },
    {
      name: "add() options",
      type: "title?, description?, action?, priority?, timeout?, id?",
      description:
        "The toast's content: action is { label, onClick }; priority is \"normal\" | \"high\"; timeout overrides the Provider default (0 keeps the toast until dismissed).",
    },
    {
      name: "Toasts",
      type: "—",
      description:
        "The ready-made viewport: renders every active toast with title, description, action and a dismiss button. Compose the parts yourself only when this layout doesn't fit.",
    },
    {
      name: "Viewport / Root / Title / Description",
      type: "div props · Root: toast: ToastData",
      description:
        "Parts for composing your own viewport: Viewport is the top-layer notifications region; Root renders one toast (its live-region role comes from the toast's priority).",
    },
    {
      name: "Action",
      type: "toastId · onAction? · render?",
      description:
        "A FarmUI Button inside a toast; activating it runs onAction and dismisses that toast. Substitute your own element via render.",
    },
    {
      name: "Close",
      type: "toastId · button props",
      description:
        "A labelled dismiss button (\"Dismiss notification\") with a default × icon.",
    },
  ],
};

export default doc;
