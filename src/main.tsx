import React from "react";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./global.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Auth from "./components/auth/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ConversationContextProvider from "./contexts/ConversationContext";
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
    element: <Auth />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <ThemeProvider theme={theme}>
          <ConversationContextProvider>
            <CssBaseline />
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
          </ConversationContextProvider>
        </ThemeProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
