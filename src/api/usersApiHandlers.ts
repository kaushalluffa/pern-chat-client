import { SERVER_ENDPOINTS } from "@/utils/constants";

import authFetchHandler from "./authFetchHandler";

export const getAllUsers = async (searchUserValue?: string) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.USERS.GET,
    method: "POST",
    data: {
      search: searchUserValue,
    },
  });
  return response?.data ?? [];
};
