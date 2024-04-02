import axios from "axios";
import { VITE_SERVER_URL } from "./constants";

export const authenticator = async () => {
  try {
    const response = await axios.get(`${VITE_SERVER_URL}/img-kit/auth`);
    if (response?.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const { signature, expire, token } = response?.data as {
      signature: string;
      expire: string;
      token: string;
    };
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: `);
  }
};
