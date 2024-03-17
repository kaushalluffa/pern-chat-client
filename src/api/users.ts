import { VITE_SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const getAllUsers = async (searchUserValue?: string) => {
  try {
    const allUsers = await axios(`${VITE_SERVER_URL}/users/all`, {
      withCredentials: true,
      data: {
        search: searchUserValue,
      },
      method: "POST",
    });

    return allUsers?.data ?? [];
  } catch (error) {
    console.log(error);
  }
};
