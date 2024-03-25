import { VITE_SERVER_URL } from "@/utils/constants";
import { SocketContextType } from "@/utils/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { Socket, io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext<SocketContextType | null>(null);
const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cookies] = useCookies(["token"]);
  const { loggedInUser } = useAuthContext()!;
  const memoizedCookies = useMemo(() => {
    return cookies;
  }, [cookies]);
  useEffect(() => {
    if (memoizedCookies?.token) {
      const socketInstance = io(VITE_SERVER_URL, {
        auth: { token: memoizedCookies?.token },
      });
      if (socketInstance) {
        setSocket(socketInstance);
      }
    }
  }, [memoizedCookies]);
  useMemo(() => {
    if (loggedInUser?.isAuthenticated && loggedInUser?.user?.id && socket) {
      return socket.emit("connectedUser", loggedInUser?.user?.id);
    }
  }, [loggedInUser, socket]);
  function onConnect() {
    console.log("connected to socket");
  }

  function onDisconnect() {
    console.log("disconnected socket");
  }
  useEffect(() => {
    if (socket) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export function useSocketContext() {
  return useContext(SocketContext);
}
export default SocketContextProvider;
