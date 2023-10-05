import { vi, it, describe, expect } from "vitest";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router-dom";
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

describe("RouteGuard", () => {
  it("renders the spinner when isLoading is true", () => {
    useLocation.mockReturnValue({ pathname: "/" });
    render(
      <RouterProvider router={createMemoryRouter(routes)}>
        <RouteGuard></RouteGuard>
      </RouterProvider>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    // expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  // it("renders children when loading is false", () => {

  // })
});

///////////////////// GPT Suggested Tests ////////////////////////
// import { render, screen } from 'vitest';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { auth } from '../../../firebase/firebase';
// import RouteGuard from './RouteGuard';

// // Mock Firebase authentication
// jest.mock('firebase/auth', () => {
//   return {
//     onAuthStateChanged: jest.fn(),
//   };
// });

// // Mock the Spinner component
// jest.mock('../../spinner/Spinner', () => {
//   return function MockSpinner() {
//     return <div data-testid="spinner">Spinner</div>;
//   };
// });

// // Mock useNavigate and useLocation
// jest.mock('react-router-dom', () => {
//   return {
//     useNavigate: jest.fn(),
//     useLocation: jest.fn(),
//   };
// });

// describe('RouteGuard', () => {
//   it('renders Spinner when isLoading is true', () => {
//     useLocation.mockReturnValue({ pathname: '/some-path' });
//     const { unmount } = render(<RouteGuard />);
//     expect(screen.getByTestId('spinner')).toBeInTheDocument();
//     unmount();
//   });

//   it('renders children when isLoading is false', () => {
//     useLocation.mockReturnValue({ pathname: '/some-path' });
//     const { unmount } = render(<RouteGuard>Child Content</RouteGuard>);
//     expect(screen.queryByTestId('spinner')).toBeNull();
//     expect(screen.getByText('Child Content')).toBeInTheDocument();
//     unmount();
//   });

//   it('navigates to /auth/login when user is not authenticated and location does not start with /auth', () => {
//     useNavigate.mockImplementation(() => jest.fn());
//     useLocation.mockReturnValue({ pathname: '/some-path' });
//     onAuthStateChanged.mockImplementation((auth, callback) => {
//       callback(null); // Simulate no authenticated user
//     });
//     render(<RouteGuard />);
//     expect(useNavigate).toHaveBeenCalledWith('/auth/login');
//   });

//   it('navigates to / when user is authenticated and location starts with /auth', () => {
//     useNavigate.mockImplementation(() => jest.fn());
//     useLocation.mockReturnValue({ pathname: '/auth/profile' });
//     onAuthStateChanged.mockImplementation((auth, callback) => {
//       callback({}); // Simulate an authenticated user
//     });
//     render(<RouteGuard />);
//     expect(useNavigate).toHaveBeenCalledWith('/');
//   });
// });
