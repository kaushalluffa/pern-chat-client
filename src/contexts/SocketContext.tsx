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

const SocketContext = createContext<SocketContextType | null>(null);
const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cookies] = useCookies(["token"]);
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
      // socket.on("newMessage", (data) => {
      //   return setAllMessages((prev) => {
      //     if (prev?.find((message: any) => message?.id === data?.id)) {
      //       return prev;
      //     } else {
      //       return [...prev, data];
      //     }
      //   });
      // });
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        //   socket.off("newMessage", () => {
        //     setAllMessages([]);
        //   });
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
