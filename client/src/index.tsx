import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/Main.page";
import MemePage from "./pages/Meme.page";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <MemePage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
