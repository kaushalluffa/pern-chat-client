import { VITE_SERVER_URL } from "@/utils/constants";
import { AuthContextType, LoggedInUser, User } from "@/utils/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: null,
  logout: () => {},
});
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });
  useEffect(() => {
    if (cookies && cookies?.token && typeof cookies?.token === "string") {
      const decodedToken: User = jwtDecode(cookies?.token ?? "");
      if (decodedToken) {
        axios.get(`${VITE_SERVER_URL}/auth/verifyUser`, {
          withCredentials: true,
        });
      }
    }
  }, [cookies]);
  function logout() {
    removeCookie("token");
  }
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthContextProvider;
