import { useAuthContext } from "@/contexts/AuthContext";
import { Conversation, ConversationType, User } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

import { getAllUsers } from "@/api/usersApiHandlers";
import {
  createConversation,
  getConversation,
} from "@/api/conversationsApiHandlers";
import { useSocketContext } from "@/contexts/SocketContext";
export default function useConversation() {
  const { loggedInUser } = useAuthContext();
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { socket } = useSocketContext()!;
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{ isOpen: boolean; type: ConversationType }>({
      isOpen: false,
      type: ConversationType.DIRECT_MESSAGE,
    });
  const [selectedUserForConversation, setSelectedUserForConversation] =
    useState<User[]>(() =>
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
  async function handleCreateConversation() {
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
    setOpenCreateConversationModal({ isOpen: false, type: ConversationType.DIRECT_MESSAGE });
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
  const handleGetConversation = useCallback(async () => {
    const response = await getConversation();
    setConversations(response);
  }, []);
  const debouncedSearchUser = useDebounce(handleGetUsers, 500);
  useEffect(() => {
    if (searchUserValue) {
      debouncedSearchUser(searchUserValue);
    } else {
      handleGetUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUserValue, handleGetUsers]);

  useEffect(() => {
    if (socket) {
      socket.on("newConversation", (data) => {
        return setConversations((prev) => {
          return [data, ...prev];
        });
      });
      //  socket.on("deletedMessage", (deletedMessageId) => {
      //    console.log(deletedMessageId, "a");
      //    return setAllMessages((prev) => {
      //      const filteredMessages = prev?.filter(
      //        (message) => message?.id !== deletedMessageId
      //      );
      //      return filteredMessages ?? prev;
      //    });
      //  });
      return () => {
        socket.off("newConversation", () => {});
        // socket.off("deletedMessage", () => {});
      };
    }
  }, [socket]);
  return {
    handleSearchUserChange,
    handleCreateConversation,
    allUsers,
    searchUserValue,
    conversations,
    setConversations,
    handleGetConversation,
    loggedInUser,
    selectedUserForConversation,
    setSelectedUserForConversation,
    groupTitle,
    setGroupTitle,
    addChatAnchorEl,
    setAddChatAnchorEl,
    openCreateConversationModal,
    setOpenCreateConversationModal,
  };
}
