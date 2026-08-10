import type { ComponentDoc } from "@/docs/types";
import {
  ModalAlertDemo,
  ModalDemo,
  ModalHeaderCloseDemo,
  ModalSizesDemo,
} from "./modal.client";

const doc: ComponentDoc = {
  slug: "modal",
  name: "Modal",
  category: "Overlays",
  description:
    "A blocking dialog for must-complete tasks, built on the native <dialog> element and the browser's top layer.",
  importLine: `import { Modal } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Compose the dialog from parts. The Popup is a native <dialog> opened with showModal() — top layer, backdrop, focus containment, Escape and focus restore all come from the browser.",
      code: `<Modal.Root>
  <Modal.Trigger>Invite a teammate</Modal.Trigger>
  <Modal.Popup>
    <Modal.Title>Invite a teammate</Modal.Title>
    <Modal.Description>
      They'll receive an email invitation to join your workspace.
    </Modal.Description>
    <Group>
      <span style={{ "--fui-context": "primary" }}>
        <Modal.Close>Send invite</Modal.Close>
      </span>
      <Modal.Close>Cancel</Modal.Close>
    </Group>
  </Modal.Popup>
</Modal.Root>`,
      render: () => <ModalDemo />,
    },
    {
      title: "Alert dialog (confirmation)",
      description:
        "alert renders role=\"alertdialog\": the backdrop no longer light-dismisses (closedby=\"closerequest\" — Escape still works), and autoFocus belongs on the least-destructive action so it is the default answer. Use for destructive or irreversible confirmations only.",
      code: `<Modal.Popup alert size="sm">
  <Modal.Title>Delete this file?</Modal.Title>
  <Modal.Description>This cannot be undone.</Modal.Description>
  <Group>
    <Modal.Close autoFocus>Cancel</Modal.Close>
    <span style={{ "--fui-context": "danger" }}>
      <Modal.Close>Delete</Modal.Close>
    </span>
  </Group>
</Modal.Popup>`,
      render: () => <ModalAlertDemo />,
    },
    {
      title: "Sizes",
      description: "Panel widths via the Popup's size prop.",
      code: `<Modal.Popup size="sm">…</Modal.Popup>
<Modal.Popup size="md">…</Modal.Popup>
<Modal.Popup size="lg">…</Modal.Popup>`,
      render: () => <ModalSizesDemo />,
    },
    {
      title: "Header with a close button",
      description:
        "A header row with an × is a composition pattern, not configuration — compose Modal.Title and Modal.Close however your design needs.",
      code: `<Modal.Popup>
  <div className="header-row">
    <Modal.Title>Settings</Modal.Title>
    <Modal.Close aria-label="Close">×</Modal.Close>
  </div>
  <Modal.Description>Manage your workspace settings.</Modal.Description>
</Modal.Popup>`,
      render: () => <ModalHeaderCloseDemo />,
    },
  ],
  whenToUse: [
    "For blocking, must-complete tasks — confirmations of destructive actions, short focused forms — where the user should not interact with the page behind.",
    "When losing the in-progress state would be costly, and the dialog protects it.",
  ],
  whenNotToUse: [
    "For supplementary content or quick actions that don't need to block — use Popover.",
    "For anything long-form or multi-step — navigate to a page instead (GOV.UK: keep interactions in the page flow where possible).",
    "For non-essential announcements — use Alert in the page.",
  ],
  accessibility: [
    "Built on the native <dialog> opened with showModal(): the browser provides the top layer, ::backdrop, real focus containment, Escape handling, and restores focus to the trigger on close — none of it re-implemented in JavaScript.",
    "Modal.Title and Modal.Description automatically label and describe the dialog via aria-labelledby / aria-describedby.",
    "Light dismiss (clicking the backdrop) uses the closedby attribute where supported, with a small feature-detected coordinate-check fallback elsewhere — no polyfills, per the browser support policy.",
    "Body scroll is locked while open.",
  ],
  props: [
    {
      name: "Root",
      type: "open?, defaultOpen?, onOpenChange?",
      description:
        "Groups the parts and owns open state (controlled or uncontrolled). Renders no element of its own.",
    },
    {
      name: "Trigger",
      type: "button props · render?: element | (props) => node",
      description:
        "Renders a FarmUI Button that opens the dialog — style it directly, or substitute your own element via render.",
    },
    {
      name: "Popup",
      type: `size?: "sm" | "md" | "lg" · alert?: boolean`,
      description:
        "The native <dialog>. size sets the panel width (24/32/44rem); alert renders role=\"alertdialog\" with no light dismiss (Escape still closes) for destructive confirmations.",
    },
    {
      name: "Title / Description",
      type: "heading / paragraph props",
      description: "Label and describe the dialog for assistive technology.",
    },
    {
      name: "Close",
      type: "button props · render?",
      description:
        "A FarmUI Button that closes the dialog — compose as many as you need (confirm, cancel, ×).",
    },
  ],
};

export default doc;
