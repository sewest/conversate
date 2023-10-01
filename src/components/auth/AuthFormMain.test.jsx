import { vi, it, describe, expect } from "vitest";
import { render, screen, waitFor } from "../../../test-utils";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../router/routes";
import AuthFormMain from "./AuthFormMain";

const renderAuthForm = async (authType, headingName) => {
  const router = createMemoryRouter(routes, { initialEntries: [`/auth/${authType}`] });
  const handleRegister = vi.fn();
  render(
    <RouterProvider router={router}>
      <AuthFormMain handleLogin={vi.fn()} handleRecover={vi.fn()} handleRegister={handleRegister} />
    </RouterProvider>
  );
  await waitFor(() => expect(screen.getByRole("heading", { name: headingName })).toBeInTheDocument());
};

describe("AuthForm", () => {
  it("renders Register component when authType is 'register'", async () => {
    await renderAuthForm("register", "Register");
  });

  it("renders Login component when authType is 'login'", async () => {
    await renderAuthForm("login", "Login");
  });

  it("renders Recover component when authType is 'recover'", async () => {
    await renderAuthForm("recover", "Recover Password");
  });

  it("renders 404 Page when authType is 'unknown'", async () => {
    await renderAuthForm("unknown", "Uh Oh!");
  });
});
