import React from "react";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./global.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/auth/SignupPage";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LoginPage from "./components/auth/LoginPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./tanstack-query/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Setup from "./components/setup/Setup";

const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/server/:serverId",
    element: <App />,
  },
  {
    path: "/server/:serverId/channel/:channelId",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/setup",
    element: <Setup />,
  },
]);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
