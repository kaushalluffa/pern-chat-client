import { getLoggedInUser } from "@/api/users";
import { AuthContextType, LoggedInUser } from "@/utils/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
export const AuthContext = createContext<AuthContextType>({
  loggedInUser: { isAuthenticated: false, user: null },
  setLoggedInUser: null,
});
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    isAuthenticated: false,
    user: null,
  });
  const handleGetLoggedInUser = useCallback(async () => {
    const response = await getLoggedInUser();
    if (response) {
      setLoggedInUser(response);
    }
  }, []);
  useEffect(() => {
    if (!loggedInUser || !loggedInUser?.isAuthenticated) {
      handleGetLoggedInUser();
    }
  }, [loggedInUser, handleGetLoggedInUser]);
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
