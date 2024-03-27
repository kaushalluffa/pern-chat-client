import { VITE_SERVER_URL } from "@/utils/constants";
import { Message } from "@/utils/types";
import axios from "axios";

export const getMessages = async (conversationId: string) => {
  const response = await axios(`${VITE_SERVER_URL}/message`, {
    withCredentials: true,
    method: "POST",
    data: { conversationId },
  });
  return response?.data ?? [];
};
export const sendMessage = async ({
  conversationId,
  messageBody,
  senderId,
}: {
  conversationId: string;
  messageBody: {
    body: string;
    fileId?: string | null;
    fileUrl?: string | null;
  };
  senderId: string;
}) => {
  const response = await axios(`${VITE_SERVER_URL}/message/create`, {
    withCredentials: true,
    method: "POST",
    data: { conversationId, senderId, messageBody },
  });
  return response?.data ?? [];
};
export const deleteMessage = async ({ message }: { message: Message }) => {
  const response = await axios(`${VITE_SERVER_URL}/message/delete`, {
    withCredentials: true,
    method: "DELETE",
    data: { message },
  });
  return response?.data ?? [];
};
