import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ImageKitContext } from "../contexts/ImageKitContext";
import { ConversationContext } from "@/contexts/ConversationContext";
import { SocketContext } from "@/contexts/SocketContext";
import { ThemeContext } from "@/contexts/ThemeContextProvider";

export function useAuthContext() {
  return useContext(AuthContext);
}

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const useImageKitContext = () => {
  return useContext(ImageKitContext);
};

export function useSocketContext() {
  return useContext(SocketContext);
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
