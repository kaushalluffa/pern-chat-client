import React from "react";
import App from "./App";
import "./global.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ConversationContextProvider from "./contexts/ConversationContext";
import ModalsContextProvider from "./contexts/ModalsContext";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat/:chatId",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <SocketContextProvider>
          <ConversationContextProvider>
            <CssBaseline />
            <ModalsContextProvider>
              <RouterProvider router={router} />
            </ModalsContextProvider>
          </ConversationContextProvider>
        </SocketContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
