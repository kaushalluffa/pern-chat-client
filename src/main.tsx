import React from "react";
import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AuthContextProvider from "./contexts/AuthContext";
import SocketContextProvider from "./contexts/SocketContext";
import ConversationContextProvider from "./contexts/ConversationContext";
import AllRoutes from "./components/shared/AllRoutes";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import { IKContext } from "imagekitio-react";
import {
  VITE_IMAGE_KIT_PUBLIC_KEY,
  VITE_IMAGE_KIT_URL_ENDPOINT,
} from "./utils/constants";
import { authenticator } from "./utils/imageKitAuthenticatorHelper";
import ImageKitContextProvider from "./contexts/ImageKitContext";
import { Toaster } from "react-hot-toast";
const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <IKContext
          urlEndpoint={VITE_IMAGE_KIT_URL_ENDPOINT}
          publicKey={VITE_IMAGE_KIT_PUBLIC_KEY}
          authenticator={authenticator}
        >
          <ImageKitContextProvider>
            <AuthContextProvider>
              <SocketContextProvider>
                <ConversationContextProvider>
                  <CssBaseline />
                  <AllRoutes />
                  <Toaster position="top-right" reverseOrder={false} />
                </ConversationContextProvider>
              </SocketContextProvider>
            </AuthContextProvider>
          </ImageKitContextProvider>
        </IKContext>
      </BrowserRouter>
    </ThemeContextProvider>
  </React.StrictMode>
);
