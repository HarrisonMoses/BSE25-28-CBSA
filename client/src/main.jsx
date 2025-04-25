import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./store/configureAppStore.jsx";
import { Provider } from "react-redux";
import { UserProvider } from "./context/context.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/NotFound.jsx";
import DeviceManagement from "./pages/DeviceMangement.jsx";
import FarmDetails from "./pages/FarmDetails.jsx";
import RegisterDevice from "./pages/RegisterDevice.jsx";
import AIAdvisor from "./pages/AIAdvisor.jsx";
import Notifications from "./pages/Notifications.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthRedirect from "./components/authRedirect.jsx";
import AuthInitializer from "./hooks/AuthInitializer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "register",
    element: (
      <AuthRedirect>
        <Register />
      </AuthRedirect>
    ),
  },
  {
    path: "devices",
    element: (
      <ProtectedRoute>
        <DeviceManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "devices/:deviceId",
    element: (
      <ProtectedRoute>
        <DeviceManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "register-device",
    element: (
      <ProtectedRoute>
        <RegisterDevice />
      </ProtectedRoute>
    ),
  },
  {
    path: "farms/:farm_id",
    element: (
      <ProtectedRoute>
        <FarmDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "advisor",
    element: (
      <ProtectedRoute>
        <AIAdvisor />
      </ProtectedRoute>
    ),
  },
  {
    path: "notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </UserProvider>
  </Provider>
);
