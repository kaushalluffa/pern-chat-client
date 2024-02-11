import { SignupReqPayload } from "@/utils/types";
import axios from "axios";
import { VITE_SERVER_URL } from "../utils/constants";
export const signupFn = async ({ email, password, name }: SignupReqPayload) => {
  const requestBody = { email, password, name };
  const response = await axios(`${VITE_SERVER_URL as string}/auth/signup`, {
    method: "POST",
    data: requestBody,
    withCredentials: true,
  });

  return response?.data;
};
