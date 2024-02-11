import { LoginReqPayload } from "@/utils/types";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
export const createServer = async ({
  serverName,
  serverDesc,
}: {
  serverName: string;
  serverDesc?: string;
}) => {
  const requestBody = { name: serverName };
  const response = await axios(`${VITE_SERVER_URL as string}/server/create`, {
    method: "POST",
    data: requestBody,
    withCredentials: true,
  });

  return response?.data;
};
