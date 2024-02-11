import { LoginReqPayload } from "@/utils/types";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
export const getServers = async () => {
  const response = await axios(`${VITE_SERVER_URL as string}/server`, {
    method: "GET",
    withCredentials: true,
  });

  return response?.data;
};
