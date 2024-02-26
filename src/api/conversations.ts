import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
export const getConversation = async () => {
  const response = await axios(`${VITE_SERVER_URL as string}/conversation`, {
    method: "GET",
    withCredentials: true,
  });

  return response?.data;
};

export const createConversation = async (data: any) => {
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
export const getOneConversation = async (conversationId: any) => {
  const response = await axios(`${VITE_SERVER_URL}/conversation`, {
    withCredentials: true,
    method: "POST",
    data: conversationId,
  });
  return response?.data ?? null;
};
