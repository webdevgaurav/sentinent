import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Setting from "./pages/Setting/Setting.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Training from "./pages/Training/Training.jsx";
import Tasks from "./pages/Tasks/Tasks.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import Product from "./pages/Training/Product/Product.jsx";
import Phases from "./pages/Training/Phases/Phases.jsx";
import Module from "./pages/Training/Module/Module.jsx";
import Client from "./pages/Coaching/Client/Client.jsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login type={"login"} />,
  },
  {
    path: "/logout",
    element: <Login type={"logout"} />,
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
        element: <Training />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
