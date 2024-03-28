import { SERVER_ENDPOINTS } from "@/utils/constants";
import { SignupData } from "@/utils/types";
import authFetchHandler from "./authFetchHandler";

export const userSignup = async (signupData: SignupData) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.AUTH.SIGNUP,
    method: "POST",
    data: {
      email: signupData?.email,
      name: signupData?.fullName,
      password: signupData?.password,
      imageUrl: signupData?.imageUrl,
    },
  });
  return response;
};
export const userLogin = async (loginData: {
  email: string;
  password: string;
  showP: boolean;
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    data: loginData,
  });
  return response;
};
