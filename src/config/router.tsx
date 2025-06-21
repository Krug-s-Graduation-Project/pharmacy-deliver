import { routes } from "@/config/routes";
import { AuthLayout, DeliveryLayout } from "@/layouts";
import { DeliveryPage, LoginPage } from "@/page";
import { Navigate, RouteObject } from "react-router-dom";

export const reactRouter: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.auth.login,
        element: <LoginPage />,
      }
    ]
  },
  {
    path: routes.root,
    element: <Navigate to={routes.delivery.root} />
  },
  {
    element: <DeliveryLayout />,
    children: [
      {
        path: routes.delivery.root,
        element: <DeliveryPage />,
      }
    ]
  }
] 