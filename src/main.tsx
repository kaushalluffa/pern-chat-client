import React from "react";
import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AuthContextProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ConversationContextProvider from "./contexts/ConversationContext";
import ModalsContextProvider from "./contexts/ModalsContext";
import AllRoutes from "./components/RoutesCollection/AllRoutes";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
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
    </ThemeContextProvider>
  </React.StrictMode>
);
