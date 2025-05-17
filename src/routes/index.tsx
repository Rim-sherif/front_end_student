import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Announcements from "../pages/Announcements";
import Courses from "../pages/Courses";
import Dashboard from "../pages/Dashboard";
import Gradebook from "../pages/Gradebook";
import Home from "../pages/Home";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import Quizzes from "../pages/Quizzes";
import Schedule from "../pages/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <Main /> },
          { path: "quizzes", element: <Quizzes /> },
          { path: "announcements", element: <Announcements /> },
          { path: "courses", element: <Courses /> },
          { path: "schedule", element: <Schedule /> },
          { path: "gradebook", element: <Gradebook /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default router;
