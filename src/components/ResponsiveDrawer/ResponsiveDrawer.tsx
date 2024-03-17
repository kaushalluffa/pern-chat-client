import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getConversation } from "@/api/conversations";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useConversationContext } from "@/contexts/ConversationContext";
import ChatListDrawer from "../ChatListDrawer/ChatListDrawer";
import ConversationContainer from "../ConversationContainer/ConversationContainer";
import NoChatOpen from "../NoChatOpen/NoChatOpen";
const drawerWidth = 320;
export default function ResponsiveDrawer() {
  const { state } = useLocation();
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
    getConversation().then((res) => setConversations(res));
  }, []);

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
          currentConversation={currentConversation}
        />
      ) : (
        <NoChatOpen drawerWidth={drawerWidth} />
      )}
    </Grid>
  );
}
