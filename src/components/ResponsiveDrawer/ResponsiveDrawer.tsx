import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { createConversation, getConversation } from "@/api/conversations";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/api/users";
import { useAuthContext } from "@/contexts/AuthContext";
import { useConversationContext } from "@/contexts/ConversationContext";
import { User } from "@/utils/types";
import StartConversationModal from "../StartConversationModal/StartConversationModal";
import ChatListDrawer from "../shared/ChatListDrawer";
import ConversationContainer from "../ConversationContainer/ConversationContainer";
import NoChatOpen from "../shared/NoChatOpen";
const drawerWidth = 320;
export default function ResponsiveDrawer() {
  const { state } = useLocation();
  const [allUsers, setAllUsers] = useState([]);
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { loggedInUser } = useAuthContext();
  const [conversations, setConversations] = useState([]);

  const {
    allMessages,
    setCurrentConversation,
    currentConversation,
    messagesEndRef,
    currentLoggedInMember,
  } = useConversationContext()!;
  useEffect(() => {
    if (openNewChatModal) {
      getAllUsers().then((res) => setAllUsers(res));
    }
  }, [openNewChatModal]);
  useEffect(() => {
    getConversation().then((res) => setConversations(res));
  }, []);

  async function handleCreateConversation() {
    await createConversation({
      members: selectedUsers,
    });
  }

  useEffect(() => {
    if (state && state?.type) {
      setCurrentConversation && setCurrentConversation(state);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation]);

  return (
    <>
      <Grid container>
        <ChatListDrawer
          conversations={conversations}
          currentConversation={currentConversation}
          loggedInUser={loggedInUser}
          setOpenNewChatModal={setOpenNewChatModal}
          drawerWidth={drawerWidth}
        />
        {currentConversation && currentConversation?.id ? (
          <ConversationContainer
            allMessages={allMessages}
            currentLoggedInMember={currentLoggedInMember}
            drawerWidth={drawerWidth}
            loggedInUser={loggedInUser}
            messagesEndRef={messagesEndRef}
            currentConversation={currentConversation}
          />
        ) : (
          <NoChatOpen drawerWidth={drawerWidth} />
        )}
      </Grid>
      {openNewChatModal && (
        <StartConversationModal
          openNewChatModal={openNewChatModal}
          allUsers={allUsers}
          handleCreateConversation={handleCreateConversation}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          setOpenNewChatModal={setOpenNewChatModal}
        />
      )}
    </>
  );
}
