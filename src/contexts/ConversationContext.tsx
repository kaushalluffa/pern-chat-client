import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSocketContext } from "./SocketContext";
import {
  Conversation,
  ConversationContextType,
  Member,
  Message,
} from "@/utils/types";

import { getMessages } from "@/api/messages";
import { useAuthContext } from "./AuthContext";

const ConversationContext = createContext<ConversationContextType | null>(null);

export default function ConversationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = useSocketContext()!;
  const { loggedInUser } = useAuthContext()!;
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [currentLoggedInMember, setCurrentLoggedInMember] =
    useState<Member | null>(null);
  useEffect(() => {
    if (!messagesEndRef.current || !allMessages) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, messagesEndRef]);
  useMemo(() => {
    if (currentConversation?.id && socket) {
      return socket.emit("joinConversation", currentConversation?.id);
    }
  }, [currentConversation?.id, socket]);

  useEffect(() => {
    if (currentConversation?.id) {
      getMessages(currentConversation?.id).then((res) => setAllMessages(res));
    }
  }, [currentConversation?.id]);
  useEffect(() => {
    if (currentConversation) {
      const currentMember = currentConversation?.members?.find(
        (member: Member) => member?.userId === loggedInUser?.user?.id
      );
      return setCurrentLoggedInMember(currentMember ?? null);
    }
  }, [currentConversation, loggedInUser]);
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (data) => {
        return setAllMessages((prev) => {
          if (prev?.find((message: Message) => message?.id === data?.id)) {
            return prev;
          } else {
            return [...prev, data];
          }
        });
      });
      return () => {
        socket.off("newMessage", () => {
          setAllMessages([]);
        });
      };
    }
  }, [socket]);
  return (
    <ConversationContext.Provider
      value={{
        setCurrentConversation,
        allMessages,
        messagesEndRef,
        currentConversation,
        currentLoggedInMember,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
export const useConversationContext = () => {
  return useContext(ConversationContext);
};
