import { vi, it, describe } from "vitest";
import { render, screen, waitFor } from "../../../../test-utils";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../../router/routes";
import RouteGuard from "./RouteGuard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

vi.mock("firebase/auth");
vi.mock("../../../firebase/firebase");

describe("RouteGuard", () => {
  it("renders a spinner but not the child content when isLoading is true", () => {
    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );
    //We should see the spinner and not the child content
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("renders the child content and not the spinner when isLoading is false", async () => {
    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );
    //Once onAuthStateChanged has resolved, we'll see the child content
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });
});
