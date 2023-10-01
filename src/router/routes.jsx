import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import RouteGuard from "../components/auth/routeGuard/RouteGuard";

export const routes = [
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
        path: "/",
        element: <HomePage />,
      },
      {
        path: "auth/:authType",
        element: <AuthPage />,
      },
    ],
  },
];
