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
export const getConversation = async () => {
  const response = await axios(`${VITE_SERVER_URL as string}/conversation`, {
    method: "GET",
    withCredentials: true,
  });

  return response?.data;
};