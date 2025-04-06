import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/NotFound.jsx";
import DeviceManagement from "./pages/DeviceMangement.jsx";
import FarmDetails from "./pages/FarmDetails.jsx";
import RegisterDevice from "./pages/RegisterDevice.jsx";
import AIAdvisor from "./pages/AIAdvisor.jsx";
import Notifications from "./pages/Notifications.jsx";
import { UserProvider } from "./context/context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "devices",
    element: <DeviceManagement />,
  },
  {
    path: "devices/:deviceId",
    element: <DeviceManagement />,
  },
  {
    path: "register-device",
    element: <RegisterDevice />,
  },
  {
    path: "farms/:farmId",
    element: <FarmDetails />,
  },
  {
    path: "advisor",
    element: <AIAdvisor />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
]);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
