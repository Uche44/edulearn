import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RegisterClass from "./pages/classreg";
import Classroom from "./pages/classroom";
import Dashboardindex from "./pages/dashboardindex";
import { UserProfileProvider } from "./context/userprofile";
// import NotFound from "./components/NotFound";

const RegisterAndLogOut: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/register", { replace: true });
  }, [navigate]);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Dashboardindex />,
      },
      {
        path: "register-class",
        element: <RegisterClass />,
      },
      {
        path: "classroom",
        element: <Classroom />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-logout",
    element: <RegisterAndLogOut />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

const App: React.FC = () => {
  return (
    <UserProfileProvider>
      <RouterProvider router={router} />
    </UserProfileProvider>
  );
};

export default App;
