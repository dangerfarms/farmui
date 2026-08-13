import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Field, Select } from "../index";

afterEach(cleanup);

describe("Select ↔ Field wiring", () => {
  it("Select inside a Field gets id/describedby/invalid from context", () => {
    render(
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Field.Description>Where you live.</Field.Description>
        <Select>
          <option>UK</option>
        </Select>
        <Field.Error>Select a country</Field.Error>
      </Field.Root>,
    );
    const select = screen.getByLabelText("Country");
    expect(select.tagName).toBe("SELECT");
    expect(select).toHaveAccessibleDescription(/Where you live/);
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("Field.Error puts the composed select in an invalid state", () => {
    render(
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Select>
          <option>UK</option>
        </Select>
        <Field.Error>Select a country</Field.Error>
      </Field.Root>,
    );
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Select a country");
  });
});
