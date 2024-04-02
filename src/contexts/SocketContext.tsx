import { VITE_SERVER_URL } from "@/utils/constants";
import { SocketContextType } from "@/utils/types";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { Socket, io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAllContextHooks";

export const SocketContext = createContext<SocketContextType | null>(null);
const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cookies] = useCookies(["token"]);
  const { loggedInUser } = useAuthContext()!;
  const memoizedCookies = useMemo(() => {
    return cookies;
  }, [cookies]);
  useEffect(() => {
    if (memoizedCookies?.token) {
      try {
        const socketInstance = io(VITE_SERVER_URL, {
          auth: { token: memoizedCookies?.token },
        });
        if (socketInstance) {
          setSocket(socketInstance);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error?.toString() ?? "Error establishing websocket connection",
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
        navigate("/auth");
      }
    }
  }, [memoizedCookies, navigate]);

  useEffect(() => {
    if (
      socket &&
      loggedInUser &&
      loggedInUser?.isAuthenticated &&
      loggedInUser?.user
    ) {
      socket.on("connect", () => {
        return socket.emit("connectedUser", loggedInUser?.user?.id);
      });
      socket.on("disconnect", () => {
        return socket.emit("disconnectedUser", loggedInUser?.user?.id);
      });
      return () => {
        socket.off("connect", () => {});
        socket.off("disconnect", () => {});
      };
    }
  }, [socket, loggedInUser]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
