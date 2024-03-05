import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import myntraStore from "./store/index.ts";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Login from "./pages/Login/Login.tsx";
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
    element: <Login type="login" />,
  },
  {
    path: "/logout",
    element: <Login type="logout" />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "training",
        children: [
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "phases/:productId",
            element: <Phases />,
          },
          {
            path: "module/:productId/:phasesId",
            element: <Module />,
          },
        ],
      },
      {
        path: "client",
        element: <Client />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
