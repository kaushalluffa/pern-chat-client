import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
import { CreateConversationData } from "@/utils/types";
export const getConversation = async () => {
  const response = await axios(`${VITE_SERVER_URL as string}/conversation`, {
    method: "GET",
    withCredentials: true,
  });

  return response?.data;
};

export const createConversation = async (data: {
  members: CreateConversationData[];
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
