import { AuthLayout } from "@/components/ui/layouts";
import { routes } from "@/config/routes";
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
    path: routes.delivery.root,
    element: <DeliveryPage />,
  }
]