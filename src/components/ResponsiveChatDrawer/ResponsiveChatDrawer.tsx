import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useConversationContext } from "@/contexts/ConversationContext";
import ChatListDrawer from "../ChatListDrawer/ChatListDrawer";
import ConversationContainer from "../ConversationContainer/ConversationContainer";
import NoChatOpen from "../NoChatOpen/NoChatOpen";
import useConversation from "@/hooks/useConversation";
const drawerWidth = 320;
export default function ResponsiveChatDrawer() {
  const { state } = useLocation();
  const { loggedInUser } = useAuthContext();
  const { conversations, handleGetConversation } = useConversation()!;
  const {
    allMessages,
    setCurrentConversation,
    currentConversation,
    messagesEndRef,
    currentLoggedInMember,
  } = useConversationContext()!;

  useEffect(() => {
    handleGetConversation();
  }, [handleGetConversation]);

  useEffect(() => {
    if (state && state?.type) {
      setCurrentConversation && setCurrentConversation(state);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation]);

  return (
    <Grid container>
      <ChatListDrawer
        conversations={conversations}
        currentConversation={currentConversation}
        loggedInUser={loggedInUser}
        drawerWidth={drawerWidth}
      />
      {currentConversation && currentConversation?.id ? (
        <ConversationContainer
          allMessages={allMessages}
          currentLoggedInMember={currentLoggedInMember}
          drawerWidth={drawerWidth}
          loggedInUser={loggedInUser}
          messagesEndRef={messagesEndRef}
        />
      ) : (
        <NoChatOpen drawerWidth={drawerWidth} />
      )}
    </Grid>
  );
}
