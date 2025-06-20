const baseRoutes = {
  // AUTHENTICATION ROUTES
  auth: {
    login: "/login",
  },

  // MAIN ROUTES
  root: "/",
  
  delivery: {
    root: "/delivery",
  },

  // ERROR ROUTES
  generalError: "/500",
  notfoundError: "/404",
  maintenanceError: "/503",
  unauthorizedError: "/401",
};

export const routeNames = {
  // MAIN NAME ROUTES
  [baseRoutes.delivery.root]: "Giao hàng",

  // AUTHENTICATION NAME ROUTES
};

export const routes = {
  ...baseRoutes,
};
