import { it, describe, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { screen, render, fireEvent } from "../../../../test-utils";
import Register from "./Register";

describe("Register", () => {
  //Verify proper behavior
  it("calls the handleRegister function when the form is submitted", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).toHaveBeenCalled();
  });

  //Behavior with empty values
  it("does not call the handleRegister function when the form is submitted without values", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("does not call the handleRegister function when the form is submitted with an empty email", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("does not call the handleRegister function when the form is submitted with an empty password ", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("displays error messages when the form is submitted without an email and without a password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);
    const emailErrorMessage = screen.getByText("Invalid email");
    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an empty email", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });
    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    const emailErrorMessage = screen.getByText("Invalid email");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an empty password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  //Invalid values
  it("does not call the submit function when the form is submitted with an invalid email", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("does not call the submit function when the form is submitted with an invalid password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("does not call the submit function when the form is submitted with an invalid email and an invalid password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    expect(mockHandleRegister).not.toHaveBeenCalled();
  });

  it("displays an error message when the form is submitted with an invalid email and a invalid password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    const emailErrorMessage = screen.getByText("Invalid email");
    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it("displays and error message when the form is submitted with an invalid email", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    const emailErrorMessage = screen.getByText("Invalid email");

    expect(emailErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an invalid password", () => {
    const mockHandleRegister = vi.fn();

    render(
      <BrowserRouter>
        <Register handleRegister={mockHandleRegister} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
