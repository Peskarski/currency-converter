import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AmountInput } from ".";

const renderAmountInput = (value = "") => {
  const onChange = vi.fn();
  render(<AmountInput value={value} onChange={onChange} />);
  return { onChange, input: screen.getByLabelText("Amount") };
};

const ControlledAmountInput = () => {
  const [value, setValue] = useState("");
  return <AmountInput value={value} onChange={setValue} />;
};

describe("AmountInput", () => {
  it("renders a text input with a decimal keyboard, labelled Amount", () => {
    const { input } = renderAmountInput();

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
  });

  it.each([
    { current: "", typed: "5", expected: "5" },
    { current: "12", typed: "3", expected: "123" },
    { current: "12", typed: ".", expected: "12." },
    { current: "12.", typed: "5", expected: "12.5" },
  ])("accepts '$typed' after '$current'", async ({ current, typed, expected }) => {
    const user = userEvent.setup();
    const { onChange, input } = renderAmountInput(current);

    await user.type(input, typed);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(expected);
  });

  it.each([
    { current: "", typed: "a" },
    { current: "12", typed: "x" },
    { current: "12", typed: "," },
  ])("rejects '$typed' after '$current'", async ({ current, typed }) => {
    const user = userEvent.setup();
    const { onChange, input } = renderAmountInput(current);

    await user.type(input, typed);

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue(current);
  });

  it("allows clearing the field", async () => {
    const user = userEvent.setup();
    const { onChange, input } = renderAmountInput("5");

    await user.clear(input);

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("keeps only the valid characters when typing a mixed sequence", async () => {
    const user = userEvent.setup();
    render(<ControlledAmountInput />);
    const input = screen.getByLabelText("Amount");

    await user.type(input, "1a2.b5.3");

    expect(input).toHaveValue("12.53");
  });

  it.each([
    { pasted: "100.25", expected: "100.25" },
    { pasted: "abc", expected: "" },
    { pasted: "1,000", expected: "" },
  ])("handles pasting '$pasted'", async ({ pasted, expected }) => {
    const user = userEvent.setup();
    render(<ControlledAmountInput />);
    const input = screen.getByLabelText("Amount");

    await user.click(input);
    await user.paste(pasted);

    expect(input).toHaveValue(expected);
  });
});
