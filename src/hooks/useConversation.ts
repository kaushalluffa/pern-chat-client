import { createConversation } from "@/api/conversations";
import { getAllUsers } from "@/api/users";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useModalsContext } from "@/contexts/ModalsContext";

export default function useConversation() {
  const { loggedInUser } = useAuthContext();
  const { createConversationModal, setCreateConversationModal } =
    useModalsContext();
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(() =>
    loggedInUser?.isAuthenticated && loggedInUser?.user
      ? [loggedInUser?.user]
      : []
  );
  async function handleCreateConversation() {
    await createConversation({
      members: selectedUsers,
    });
  }
  const handleGetUsers = useCallback(async (searchUserValue?: string) => {
    const users = await getAllUsers(searchUserValue);
    if (users && Array.isArray(users) && users?.length > 0) {
      setAllUsers(users);
    } else {
      setAllUsers([]);
    }
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
  function handleClose() {
    setSelectedUsers(
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
    setCreateConversationModal({ open: false });
  }
  function handleSearchUserChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchUserValue(event.target.value);
  }
  return {
    createConversationModal,
    handleSearchUserChange,
    handleClose,
    handleCreateConversation,
    allUsers,
    searchUserValue,
    selectedUsers,
    setSelectedUsers,
  };
}
