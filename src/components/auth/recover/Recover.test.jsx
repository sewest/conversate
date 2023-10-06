import { it, describe, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { screen, render, fireEvent } from "../../../../test-utils";
import Recover from "./Recover";

describe("Recover", () => {
  //Verify proper behavior
  it("calls the handleRecover function when the form is submitted", () => {
    const mockHandleRecover = vi.fn();

    render(
      <BrowserRouter>
        <Recover handleRecover={mockHandleRecover} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const recoverButton = screen.getByRole("button", { name: "Recover password" });
    fireEvent.click(recoverButton);

    expect(mockHandleRecover).toHaveBeenCalled();
  });

  //Behavior with empty values
  it("does not call the handleRecover function when the form is submitted with an empty email", () => {
    const mockHandleRecover = vi.fn();

    render(
      <BrowserRouter>
        <Recover handleRecover={mockHandleRecover} />
      </BrowserRouter>
    );

    const recoverButton = screen.getByRole("button", { name: "Recover password" });
    fireEvent.click(recoverButton);

    expect(mockHandleRecover).not.toHaveBeenCalled();
  });

  it("displays an error message when the form is submitted with an empty email", () => {
    const mockHandleRecover = vi.fn();

    render(
      <BrowserRouter>
        <Recover handleRecover={mockHandleRecover} />
      </BrowserRouter>
    );

    const recoverButton = screen.getByRole("button", { name: "Recover password" });
    fireEvent.click(recoverButton);

    const emailErrorMessage = screen.getByText("Invalid email");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  //Invalid values
  it("does not call the handleRecover function when the form is submitted with an invalid email", () => {
    const mockHandleRecover = vi.fn();

    render(
      <BrowserRouter>
        <Recover handleRecover={mockHandleRecover} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });

    const recoverButton = screen.getByRole("button", { name: "Recover password" });
    fireEvent.click(recoverButton);

    expect(mockHandleRecover).not.toHaveBeenCalled();
  });

  it("displays and error message when the form is submitted with an invalid email", () => {
    const mockHandleRecover = vi.fn();

    render(
      <BrowserRouter>
        <Recover handleRecover={mockHandleRecover} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });

    const recoverButton = screen.getByRole("button", { name: "Recover password" });
    fireEvent.click(recoverButton);

    const emailErrorMessage = screen.getByText("Invalid email");

    expect(emailErrorMessage).toBeInTheDocument();
  });
});
