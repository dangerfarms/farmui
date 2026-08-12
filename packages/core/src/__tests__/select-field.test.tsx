import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Field, SelectControl, Select } from "../index";

afterEach(cleanup);

describe("Select ↔ Field wiring", () => {
  it("SelectControl composed via Field.Control gets id/describedby/invalid", () => {
    render(
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Field.Description>Where you live.</Field.Description>
        <Field.Control
          render={
            <SelectControl>
              <option>UK</option>
            </SelectControl>
          }
        />
        <Field.Error>Select a country</Field.Error>
      </Field.Root>,
    );
    const select = screen.getByLabelText("Country");
    expect(select.tagName).toBe("SELECT");
    expect(select).toHaveAccessibleDescription(/Where you live/);
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("the convenience form wires error the same way", () => {
    render(
      <Select label="Country" error="Select a country">
        <option>UK</option>
      </Select>,
    );
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Select a country");
  });
});
