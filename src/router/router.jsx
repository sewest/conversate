import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import RouteGuard from "../components/auth/RouteGuard";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <RouteGuard>
        <RootLayout />
      </RouteGuard>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "auth/:authType",
        element: <AuthPage />,
      },
    ],
  },
]);
