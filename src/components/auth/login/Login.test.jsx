import { it, describe, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { screen, render, fireEvent } from "../../../../test-utils";
import Login from "./Login";

describe("Login", () => {
  //Verify proper behavior
  //Redirection after login handled by the route guard component
  it("calls the handleLogin function when the form is submitted", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).toHaveBeenCalled();
  });

  //Behavior with empty values
  it("does not call the handleLogin function when the form is submitted without values", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("does not call the handleLogin function when the form is submitted with an empty email", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("does not call the handleLogin function when the form is submitted with an empty password ", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("displays error messages when the form is submitted without an email and without a password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    const emailErrorMessage = screen.getByText("Invalid email");
    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an empty email", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const emailErrorMessage = screen.getByText("Invalid email");
    expect(emailErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an empty password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  //Invalid values
  it("does not call the submit function when the form is submitted with an invalid email", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("does not call the submit function when the form is submitted with an invalid password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("does not call the submit function when the form is submitted with an invalid email and an invalid password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it("displays an error message when the form is submitted with an invalid email and an invalid password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const emailErrorMessage = screen.getByText("Invalid email");
    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it("displays and error message when the form is submitted with an invalid email", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "bad-email.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const emailErrorMessage = screen.getByText("Invalid email");

    expect(emailErrorMessage).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with an invalid password", () => {
    const mockHandleLogin = vi.fn();

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "tooshort" } });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    const passwordErrorMessage = screen.getByText("Password must be longer than 8 characters");

    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
