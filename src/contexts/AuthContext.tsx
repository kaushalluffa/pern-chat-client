import { VITE_SERVER_URL } from "@/utils/constants";
import { AuthContextType, LoggedInUser } from "@/utils/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: () => {},
  showLoading: true,
});
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    const authUser = async () => {
      setShowLoading(true);
      if (cookies && cookies?.token && typeof cookies?.token === "string") {
        const response = await axios.get(`${VITE_SERVER_URL}/auth/verifyUser`, {
          withCredentials: true,
        });
        if (response && response?.data) {
          setLoggedInUser(response?.data ?? null);
        }
      } else {
        navigate("/login");
      }
      setShowLoading(false);
    };
    authUser();
  }, [cookies, navigate]);

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, showLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthContextProvider;
