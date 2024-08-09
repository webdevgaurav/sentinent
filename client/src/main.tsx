import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";

// Styles
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Routes
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Stores
import { Provider } from "react-redux";
import myntraStore from "./store/index.ts";
import { ProtectedRoute } from "./utils/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

// Pages
import SignUp from "./pages/SignUp/SignUp.tsx";
import Login from "./pages/Login/Login.tsx";
import Logout from "./pages/Logout/Logout.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Setting from "./pages/Setting/Setting.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Tasks from "./pages/Tasks/Tasks.tsx";
import Notes from "./pages/Notes/Notes.tsx";
import Product from "./pages/Training/Product/Product.tsx";
import Phases from "./pages/Training/Phases/Phases.tsx";
import Module from "./pages/Training/Module/Module.tsx";
import Client from "./pages/Coaching/Client/Client.tsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "training",
        children: [
          {
            path: "product",
            element: <ProtectedRoute element={<Product />} />,
          },
          {
            path: "phases/:productId",
            element: <ProtectedRoute element={<Phases />} />,
          },
          {
            path: "module/:productId/:phasesId",
            element: <ProtectedRoute element={<Module />} />,
          },
        ],
      },
      {
        path: "client",
        element: <ProtectedRoute element={<Client />} />,
      },
      {
        path: "tasks",
        element: <ProtectedRoute element={<Tasks />} />,
      },
      {
        path: "notes",
        element: <ProtectedRoute element={<Notes />} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "setting",
        element: <ProtectedRoute element={<Setting />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
