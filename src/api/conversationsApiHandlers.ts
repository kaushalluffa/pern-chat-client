import { SERVER_ENDPOINTS } from "@/utils/constants";
import { ConversationType, CreateConversationData } from "@/utils/types";
import authFetchHandler from "./authFetchHandler";

export const createConversation = async (data: {
  members: CreateConversationData[];
  type: ConversationType;
  groupTitle?: string;
  isGroup?: boolean;
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.CONVERSATION.CREATE,
    method: "POST",
    data,
  });
  return response?.data;
};
export const getConversation = async (searchValue?: string) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.CONVERSATION.GET,
    method: "POST",
    data: { searchValue },
  });
  return response?.data;
};
export const deleteConversation = async (conversationId: string) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.CONVERSATION.DELETE,
    method: "DELETE",
    data: { conversationId },
  });
  return response?.data;
};
