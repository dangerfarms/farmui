"use client";

import { useState } from "react";
import { Button, Modal } from "@farmui/core";

export function ModalDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open modal</Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Order confirmed"
      >
        <p style={{ marginBlockStart: 0 }}>
          Your order is on its way. You&apos;ll receive tracking details by
          email within 24 hours.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBlockStart: "1rem",
          }}
        >
          <Button onClick={() => setOpened(false)}>Got it</Button>
        </div>
      </Modal>
    </>
  );
}

export function ModalSizesDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | null>(null);
  return (
    <>
      <Button variant="light" onClick={() => setSize("sm")}>
        Small
      </Button>
      <Button variant="light" onClick={() => setSize("md")}>
        Medium
      </Button>
      <Button variant="light" onClick={() => setSize("lg")}>
        Large
      </Button>
      <Modal
        opened={size !== null}
        onClose={() => setSize(null)}
        title={`${size ?? ""} modal`}
        size={size ?? "md"}
      >
        <p style={{ margin: 0 }}>
          This panel is rendered at the <strong>{size}</strong> size.
        </p>
      </Modal>
    </>
  );
}
