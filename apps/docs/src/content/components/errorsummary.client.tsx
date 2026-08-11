"use client";

import { useState } from "react";
import { Button, ErrorSummary, Input } from "@farmui/core";

export function ErrorSummaryDemo() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      style={{ display: "grid", gap: "1rem", inlineSize: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <ErrorSummary.Root>
          <ErrorSummary.Title />
          <ErrorSummary.List>
            <ErrorSummary.Item href="#demo-email">
              Enter your email address
            </ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary.Root>
      )}
      <Input
        id="demo-email"
        label="Email address"
        error={submitted ? "Enter your email address" : undefined}
      />
      <div>
        <Button type="submit">Save and continue</Button>
      </div>
    </form>
  );
}
