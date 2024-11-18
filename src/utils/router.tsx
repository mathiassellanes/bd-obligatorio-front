import {
  createBrowserRouter,
} from "react-router-dom";

import Login from "../routes/Login";
import Sidebar from "../components/Layout/Sidebar";
import Classes from "../routes/Classes";
import Alumns from "../routes/Students";
import Instructors from "../routes/Instructors";
import Activities from "../routes/Activities";
import Turns from "../routes/Turns";
import ClassesDetails from "../routes/ClassesDetails";
import StudentDetails from "../routes/StudentDetails";
import InstructorDetails from "../routes/InstructorDetails";
import ActivitiesDetails from "../routes/ActivitiesDetails";
import TurnsDetails from "../routes/TurnsDetails";
import Overview from "../routes/Overview";

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
        element: <Overview/>,
        path: '/',
      },
      {
        element: <Classes />,
        path: "/classes",
      },
      {
        element: <ClassesDetails />,
        path: "/classes/:id",
      },
      {
        element: <Alumns />,
        path: "/students",
      },
      {
        element: <StudentDetails />,
        path: "/students/:ci",
      },
      {
        element: <Instructors />,
        path: "/instructors",
      },
      {
        element: <InstructorDetails />,
        path: "/instructors/:ci",
      },
      {
        element: <ActivitiesDetails />,
        path: "/activities/:id",
      },
      {
        element: <Activities />,
        path: "/activities",
      },
      {
        element: <Turns />,
        path: "/turns",
      },
      {
        element: <TurnsDetails />,
        path: "/turns/:id",
      }
    ],
  }
]);
