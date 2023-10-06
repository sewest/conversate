import { vi, it, describe, expect } from "vitest";
import { createMemoryRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { render, screen, userEvent, waitFor } from "../../../../test-utils";
import { onAuthStateChanged } from "firebase/auth";
import { routes } from "../../../router/routes";
import RouteGuard from "./RouteGuard";

// Mock the onAuthStateChanged function
vi.mock("firebase/auth", async () => {
  const actual = await import("@firebase/auth");
  return {
    ...actual,
    getAuth: vi.fn(),
    connectAuthEmulator: vi.fn(),
    onAuthStateChanged: vi.fn(),
    // other mocked methods
  };
});

//Mock the Spinner component
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

// Mock the Spinner component
vi.mock("../../spinner/Spinner", () => {
  return {
    __esModule: true,
    default: function MockSpinner() {
      return <div data-testid="spinner">Spinner</div>;
    },
  };
});

//Tests for the route guard
describe("RouteGuard", () => {
  it("renders the spinner when isLoading is true", () => {
    useLocation.mockReturnValue({ pathname: "/" });
    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("redirects the user to '/' when user is authenticated and location starts with '/auth'", async () => {
    const mockNavigate = vi.fn();

    useNavigate.mockImplementation(() => mockNavigate);
    useLocation.mockReturnValue({ pathname: "/auth" });
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ user: "testUser" });
    });

    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("redirects the user to '/auth/login' when user is not authenticated and the location does not start with '/auth'", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    useLocation.mockReturnValue({ pathname: "/" });
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
    });

    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
  });

  it("does not redirect the user if they are authenticated and they are navigating to a non '/auth' route", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    useLocation.mockReturnValue({ pathname: "/" });
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ user: "testUser" });
    });

    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not redirect the user if they are not authenticated and they are navigating to an '/auth' route", async () => {
    const mockNavigate = vi.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    useLocation.mockReturnValue({ pathname: "/auth" });
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
    });

    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
