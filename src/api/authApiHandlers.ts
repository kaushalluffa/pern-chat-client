import { VITE_SERVER_URL } from "@/utils/constants";
import { SignupData } from "@/utils/types";
import axios from "axios";

export const userSignup = async (signupData: SignupData) => {
  const response = await axios(`${VITE_SERVER_URL}/auth/signup`, {
    method: "POST",
    data: {
      email: signupData?.email,
      name: signupData?.fullName,
      password: signupData?.password,
      imageUrl: signupData?.imageUrl,
    },
    withCredentials: true,
  });
  return response;
};
export const userLogin = async (loginData: {
  email: string;
  password: string;
  showP: boolean;
}) => {
  const response = await axios(`${VITE_SERVER_URL}/auth/login`, {
    method: "POST",
    data: {
      email: loginData?.email,
      password: loginData?.password,
    },
    withCredentials: true,
  });
  return response;
};