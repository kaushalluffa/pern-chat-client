import { VITE_SERVER_URL } from "@/utils/constants";
import { ConversationType, CreateConversationData } from "@/utils/types";
import axios from "axios";

export const createConversation = async (data: {
  members: CreateConversationData[];
  type: ConversationType;
  groupTitle?: string;
  isGroup?: boolean;
}) => {
  const response = await axios(
    `${VITE_SERVER_URL as string}/conversation/create`,
    {
      method: "POST",
      data,
      withCredentials: true,
    }
  );

  return response?.data;
};
export const getConversation = async (searchValue?: string) => {
  const response = await axios(`${VITE_SERVER_URL as string}/conversation`, {
    method: "POST",
    data: { searchValue },
    withCredentials: true,
  });

  return response?.data;
};
export const deleteConversation = async (conversationId: string) => {
  const response = await axios(
    `${VITE_SERVER_URL as string}/conversation/delete`,
    {
      method: "DELETE",
      data: { conversationId },
      withCredentials: true,
    }
  );

  return response?.data;
};
