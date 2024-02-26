import { VITE_SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const getMessages = async (conversationId: any) => {
  const response = await axios(`${VITE_SERVER_URL}/message`, {
    withCredentials: true,
    method: "POST",
    data: conversationId,
  });
  return response?.data ?? [];
};
export const sendMessage = async ({
  conversationId,
  messageBody,
  senderId,
}: any) => {
  const response = await axios(`${VITE_SERVER_URL}/message/create`, {
    withCredentials: true,
    method: "POST",
    data: { conversationId, senderId, messageBody },
  });
  return response?.data ?? [];
};
