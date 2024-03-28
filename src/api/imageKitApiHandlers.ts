import { SERVER_ENDPOINTS } from "@/utils/constants";

import authFetchHandler from "./authFetchHandler";
export const deleteImageKitFile = async (fileId: string) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.IMG_KIT.DELETE,
    method: "DELETE",
    data: { fileId },
  });
  return response?.data;
};
