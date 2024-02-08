import React from "react";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./global.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/auth/SignupPage";

const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "auth/signup", element: <SignupPage /> },
      { path: "auth/login", element: <SignupPage /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
