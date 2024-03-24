import { VITE_SERVER_URL } from "@/utils/constants";
import axios from "axios";
export const deleteImageKitFile = async (fileId: string) => {
  const response = await axios(`${VITE_SERVER_URL}/img-kit/delete`, {
    method: "DELETE",
    data: { fileId },
  });
  return response.data;
};
