import { ReactElement } from "react";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import { useRoutes } from "react-router-dom";

function AppRoutes(): ReactElement | null {
  
  const routes = [
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: '/signin',
      element: <Signin />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ];

  return useRoutes(routes);
}

export default AppRoutes;