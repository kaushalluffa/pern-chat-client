import { Grid, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import ChatListDrawer from "../Chat/ChatListDrawer";
import ConversationContainer from "../Conversation/ConversationContainer";
import NoChatOpen from "./NoChatOpen";
import { useConversationContext } from "@/hooks/useAllContextHooks";
const drawerWidth = 320;
export default function ResponsiveChatDrawer() {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { state } = useLocation();
  const { currentConversation, setCurrentConversation } =
    useConversationContext()!;

  useEffect(() => {
    if (state && state?.type) {
      setCurrentConversation && setCurrentConversation(state);
    } else {
      setCurrentConversation && setCurrentConversation(null);
    }
  }, [state, setCurrentConversation]);

  return (
    <Grid container>
      {isTablet && currentConversation?.id ? null : (
        <ChatListDrawer drawerWidth={drawerWidth} />
      )}
      {currentConversation && currentConversation?.id ? (
        <ConversationContainer drawerWidth={drawerWidth} />
      ) : (
        !isTablet && <NoChatOpen drawerWidth={drawerWidth} />
      )}
    </Grid>
  );
}
