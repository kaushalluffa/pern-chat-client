import { Grid, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useConversationContext } from "@/contexts/ConversationContext";
import ChatListDrawer from "../Chat/ChatListDrawer";
import ConversationContainer from "../Conversation/ConversationContainer";
import NoChatOpen from "./NoChatOpen";
const drawerWidth = 320;
export default function ResponsiveChatDrawer() {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { state } = useLocation();
  const { loggedInUser } = useAuthContext();
  const {
    conversations,
    handleGetConversation,
    newMessagesInConversations,
    handleUpdateNewMessagesInConversation,
  } = useConversationContext()!;
  const {
    allMessages,
    setCurrentConversation,
    currentConversation,
    messagesEndRef,
    currentLoggedInMember,
    handleGoToHome,
  } = useConversationContext()!;

  useEffect(() => {
    handleGetConversation();
  }, [handleGetConversation]);

  useEffect(() => {
    if (state && state?.type) {
      setCurrentConversation && setCurrentConversation(state);
      handleUpdateNewMessagesInConversation(state?.id);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation, handleUpdateNewMessagesInConversation]);

  return (
    <Grid container>
      {isTablet && currentConversation?.id ? null : (
        <ChatListDrawer
          conversations={conversations}
          currentConversation={currentConversation}
          loggedInUser={loggedInUser}
          drawerWidth={drawerWidth}
          newMessagesInConversations={newMessagesInConversations}
          handleGoToHome={handleGoToHome}
        />
      )}
      {currentConversation && currentConversation?.id ? (
        <ConversationContainer
          allMessages={allMessages}
          currentLoggedInMember={currentLoggedInMember}
          drawerWidth={drawerWidth}
          loggedInUser={loggedInUser}
          messagesEndRef={messagesEndRef}
        />
      ) : (
        !isTablet && <NoChatOpen drawerWidth={drawerWidth} />
      )}
    </Grid>
  );
}
