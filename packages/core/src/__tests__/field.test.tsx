import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Field } from "../index";

afterEach(cleanup);

describe("Field composition wiring", () => {
  it("links the label to the control and gathers describedby ids", () => {
    render(
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Description>We'll never share it.</Field.Description>
        <Field.Control render={<input type="email" />} />
        <Field.Error>Enter a valid email.</Field.Error>
      </Field.Root>,
    );

    const input = screen.getByLabelText("Email");
    const description = screen.getByText("We'll never share it.");
    const error = screen.getByRole("alert");

    // Label htmlFor matches the control id.
    expect(input).toHaveAttribute("id");
    // aria-describedby references both the description and the error.
    const describedBy =
      input.getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(describedBy).toContain(description.id);
    expect(describedBy).toContain(error.id);
    // Error presence flips the invalid state.
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(error).toHaveAttribute("role", "alert");
  });

  it("omits error wiring when there is no error content", () => {
    render(
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Control render={<input />} />
        <Field.Error>{null}</Field.Error>
      </Field.Root>,
    );

    const input = screen.getByLabelText("Name");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input.getAttribute("aria-describedby")).toBeNull();
  });

  it("renders an optional hint in the label instead of an asterisk", () => {
    render(
      <Field.Root>
        <Field.Label optional>Company</Field.Label>
        <Field.Control render={<input />} />
      </Field.Root>,
    );

    expect(screen.getByText(/\(optional\)/)).toBeInTheDocument();
    // No required asterisk convention.
    expect(screen.queryByText("*")).toBeNull();
  });

  it("supports a function render for the control", () => {
    render(
      <Field.Root>
        <Field.Label>Bio</Field.Label>
        <Field.Control
          render={(props) => <textarea {...props} data-custom="yes" />}
        />
      </Field.Root>,
    );

    const control = screen.getByLabelText("Bio");
    expect(control.tagName).toBe("TEXTAREA");
    expect(control).toHaveAttribute("data-custom", "yes");
  });
});
