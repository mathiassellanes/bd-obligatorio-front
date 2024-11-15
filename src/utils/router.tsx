import {
  createBrowserRouter,
} from "react-router-dom";

import Login from "../routes/Login";
import Sidebar from "../components/Layout/Sidebar";
import Home from "../routes/Home";

export const BrowserRouter = createBrowserRouter([
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Sidebar />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "*",
      },
    ],
  }
]);
