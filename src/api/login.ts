import { LoginReqPayload } from "@/utils/types";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
export const loginFn = async ({ email, password }: LoginReqPayload) => {
  const requestBody = { email, password };
  const response = await axios(`${VITE_SERVER_URL as string}/auth/login`, {
    method: "POST",
    data: requestBody,
    withCredentials: true,
  });

  return response?.data;
};
