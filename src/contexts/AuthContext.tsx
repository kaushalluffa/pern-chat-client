import { VITE_SERVER_URL } from "@/utils/constants";
import { AuthContextType, LoggedInUser } from "@/utils/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: () => {},
});
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });
  useEffect(() => {
    const authUser = async () => {
      const response = await axios.get(`${VITE_SERVER_URL}/auth/verifyUser`, {
        withCredentials: true,
      });
      if (response && response?.data) {
        setLoggedInUser(response?.data ?? null);
      }
    };
    if (cookies && cookies?.token && typeof cookies?.token === "string") {
      authUser();
    }
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthContextProvider;
