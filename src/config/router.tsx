import { Navigate, RouteObject } from "react-router-dom";
import { routes } from "@/config/routes";

export const reactRouter: RouteObject[] = [
  {
    path: routes.login,
    element: <div>Login Page's</div>,
  },
  {
    path: routes.root,
    element: <Navigate to={routes.delivery.root} />
  },

  {

  }
]