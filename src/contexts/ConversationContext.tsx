import React, {
  createContext,
  useCallback,
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
  ConversationType,
  Member,
  Message,
  User,
} from "@/utils/types";

import { useAuthContext } from "./AuthContext";
import { getMessages } from "@/api/messagesApiHandlers";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import {
  createConversation,
  deleteConversation,
  getConversation,
} from "@/api/conversationsApiHandlers";
import { getAllUsers } from "@/api/usersApiHandlers";
import toast from "react-hot-toast";

const ConversationContext = createContext<ConversationContextType | null>(null);

export default function ConversationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = useSocketContext()!;
  const { loggedInUser } = useAuthContext()!;
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [
    numberOfOnlineUsersInCurrentConversation,
    setNumberOfOnlineUsersInCurrentConversation,
  ] = useState<number>(0);
  const [newMessagesInConversations, setNewMessageInConversations] = useState<
    Message[]
  >([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [currentLoggedInMember, setCurrentLoggedInMember] =
    useState<Member | null>(null);
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [searchConversationValue, setSearchConversationValue] =
    useState<string>("");
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{ isOpen: boolean; type: ConversationType }>({
      isOpen: false,
      type: "DIRECT_MESSAGE",
    });
  const [selectedUserForConversation, setSelectedUserForConversation] =
    useState<User[]>(() =>
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const handleUpdateNewMessagesInConversation = useCallback(
    (conversationId: string) => {
      setNewMessageInConversations((prev) =>
        prev?.filter((message) => message?.conversationId !== conversationId)
      );
    },
    []
  );
  function handleGoToHome() {
    if (socket && currentConversation?.id) {
      socket.emit("leaveConversation", currentConversation?.id);
      navigate("/");
      handleUpdateNewMessagesInConversation(currentConversation?.id);
    }
  }
  async function handleCreateConversation() {
    try {
      await createConversation({
        members: [
          ...selectedUserForConversation,
          {
            email: loggedInUser?.user?.email as string,
            id: loggedInUser?.user?.id as string,
            imageUrl: loggedInUser?.user?.imageUrl as string,
            name: loggedInUser?.user?.name as string,
          },
        ],
        type: openCreateConversationModal?.type,
        ...(groupTitle ? { groupTitle, isGroup: !!groupTitle } : {}),
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ??
          "Failed to create the conversation please try again later",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
    setOpenCreateConversationModal({
      isOpen: false,
      type: "DIRECT_MESSAGE",
    });
    setAddChatAnchorEl(null);
    setSelectedUserForConversation([]);
    setGroupTitle("");
  }
  const handleGetUsers = useCallback(async (searchUserValue?: string) => {
    const users = await getAllUsers(searchUserValue);
    if (users && Array.isArray(users) && users?.length > 0) {
      setAllUsers(users);
    } else {
      setAllUsers([]);
    }
  }, []);
  function handleSearchUserChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchUserValue(event.target.value);
  }
  const handleGetConversation = useCallback(
    async (searchConversationValue?: string) => {
      try {
        const response = await getConversation(searchConversationValue);
        setConversations(response);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.toString() ??
            "Failed to fetch conversations please try again ",
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }
    },
    []
  );
  const debouncedSearchChat = useDebounce(handleGetConversation, 500);
  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser?.isAuthenticated &&
      loggedInUser?.user?.id
    ) {
      if (searchConversationValue) {
        debouncedSearchChat(searchConversationValue);
      } else {
        handleGetConversation();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchConversationValue, handleGetConversation, loggedInUser]);
  const debouncedSearchUser = useDebounce(handleGetUsers, 500);
  async function handleDeleteConversation() {
    try {
      const response = await deleteConversation(
        currentConversation?.id as string
      );
      if (response) {
        setChatMenuAnchorEl(null);
        handleGoToHome();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ?? "Failed to delete conversation please try again",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }
  useEffect(() => {
    if (openCreateConversationModal?.isOpen) {
      if (searchUserValue) {
        debouncedSearchUser(searchUserValue);
      } else {
        handleGetUsers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateConversationModal, searchUserValue, handleGetUsers]);
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
      socket.on("onlineUsersNumberForGroupChats", (data) => {
        return setNumberOfOnlineUsersInCurrentConversation(data);
      });
      socket.on("newMessage", (data) => {
        return setAllMessages((prev) => {
          if (prev?.find((message: Message) => message?.id === data?.id)) {
            return prev;
          } else {
            return [...prev, data];
          }
        });
      });
      socket.on("deletedMessage", (deletedMessageId) => {
        return setAllMessages((prev) => {
          const filteredMessages = prev?.filter(
            (message) => message?.id !== deletedMessageId
          );
          return filteredMessages ?? prev;
        });
      });
      socket.on("newConversation", (data) => {
        return setConversations((prev) => {
          return [data, ...prev];
        });
      });
      socket.on("deleteConversation", (deletedConversationId) => {
        return setConversations((prev) => {
          const filteredConversations = prev?.filter(
            (conversation) => conversation?.id !== deletedConversationId
          );
          return [...filteredConversations];
        });
      });
      socket.on("newMessageInConversation", (data) => {
        return setNewMessageInConversations((prev) => {
          const filterPrevMsgs = prev?.filter(
            (message) => message?.conversationId !== data?.conversationId
          );
          return [...filterPrevMsgs, data];
        });
      });
      return () => {
        socket.off("newMessage", () => {
          return setAllMessages([]);
        });
        socket.off("deletedMessage", () => {});
        socket.off("onlineUsersNumberForGroupChats", () => {});
        socket.off("newConversation", () => {});
        socket.off("newMessageInConversation", () => {
          setNewMessageInConversations([]);
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
        numberOfOnlineUsersInCurrentConversation,
        setNumberOfOnlineUsersInCurrentConversation,
        handleGoToHome,
        newMessagesInConversations,
        setNewMessageInConversations,
        handleUpdateNewMessagesInConversation,
        addChatAnchorEl,
        allUsers,
        conversations,
        groupTitle,
        openCreateConversationModal,
        searchUserValue,
        selectedUserForConversation,
        setAddChatAnchorEl,
        setAllUsers,
        setConversations,
        setGroupTitle,
        setOpenCreateConversationModal,
        setSearchUserValue,
        setSelectedUserForConversation,
        handleCreateConversation,
        handleSearchUserChange,
        handleGetConversation,
        chatMenuAnchorEl,
        setChatMenuAnchorEl,
        handleDeleteConversation,
        searchConversationValue,
        setSearchConversationValue,
        debouncedSearchChat,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
export const useConversationContext = () => {
  return useContext(ConversationContext);
};
