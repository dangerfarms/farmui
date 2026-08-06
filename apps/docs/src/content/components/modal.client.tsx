"use client";

import { Group, Modal } from "@farmui/core";
import type { CSSProperties } from "react";

export function ModalDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>Invite a teammate</Modal.Trigger>
      <Modal.Popup>
        <Modal.Title>Invite a teammate</Modal.Title>
        <Modal.Description>
          They&apos;ll receive an email invitation to join your workspace.
        </Modal.Description>
        <Group>
          <Modal.Close style={{ "--fui-context": "primary" } as CSSProperties}>
            Send invite
          </Modal.Close>
          <Modal.Close>Cancel</Modal.Close>
        </Group>
      </Modal.Popup>
    </Modal.Root>
  );
}

export function ModalSizesDemo() {
  return (
    <Group>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Modal.Root key={size}>
          <Modal.Trigger>Open {size}</Modal.Trigger>
          <Modal.Popup size={size}>
            <Modal.Title>A {size} modal</Modal.Title>
            <Modal.Description>
              The panel width comes from the size prop.
            </Modal.Description>
            <Modal.Close>Close</Modal.Close>
          </Modal.Popup>
        </Modal.Root>
      ))}
    </Group>
  );
}

export function ModalHeaderCloseDemo() {
  return (
    <Modal.Root>
      <Modal.Trigger>Open settings</Modal.Trigger>
      <Modal.Popup>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBlockEnd: "var(--fui-space-sm)",
          }}
        >
          <Modal.Title style={{ margin: 0 }}>Settings</Modal.Title>
          <Modal.Close aria-label="Close">
            ×
          </Modal.Close>
        </div>
        <Modal.Description>Manage your workspace settings.</Modal.Description>
      </Modal.Popup>
    </Modal.Root>
  );
}
