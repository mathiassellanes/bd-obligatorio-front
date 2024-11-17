import {
  createBrowserRouter,
} from "react-router-dom";

import Login from "../routes/Login";
import Sidebar from "../components/Layout/Sidebar";
import Classes from "../routes/Classes";
import Alumns from "../routes/Alumns";
import Instructors from "../routes/Instructors";
import Activities from "../routes/Activities";
import Turns from "../routes/Turns";
import ClassesDetails from "../routes/ClassesDetails";

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
        element: <Classes />,
        path: "/",
      },
      {
        element: <ClassesDetails />,
        path: "/:id",
      },
      {
        element: <Alumns />,
        path: "/alumns",
      },
      {
        element: <Instructors />,
        path: "/instructors",
      },
      {
        element: <Activities />,
        path: "/activities",
      },
      {
        element: <Turns />,
        path: "/turns",
      }
    ],
  }
]);
