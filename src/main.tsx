import React from "react";

import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ConversationContextProvider from "./contexts/ConversationContext";
import ModalsContextProvider from "./contexts/ModalsContext";
import AllRoutes from "./components/RoutesCollection/AllRoutes";
const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <SocketContextProvider>
            <ConversationContextProvider>
              <CssBaseline />
              <ModalsContextProvider>
                <AllRoutes />
              </ModalsContextProvider>
            </ConversationContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
