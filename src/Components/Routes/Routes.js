import { createBrowserRouter } from "react-router-dom";
import Task from "../Task/Task";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Task></Task>,
  },
]);
