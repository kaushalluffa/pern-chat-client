import { Grid, Toolbar } from "@mui/material";
import React from "react";
import CustomAppBar from "../shared/CustomAppBar";
import { ConversationContainerProps } from "@/utils/types";
import MessagesList from "../MessagesList/MessagesList";
import SendMessageContainer from "../SendMessageContainer/SendMessageContainer";

const ConversationContainer = ({
  allMessages,
  currentLoggedInMember,
  drawerWidth,
  loggedInUser,
  messagesEndRef,
  currentConversation,
}: ConversationContainerProps) => {
  return (
    <Grid
      sx={{
        ml: { sm: `${drawerWidth}px` },
      }}
      container
      flexDirection="column"
    >
      <CustomAppBar
        currentLoggedInMember={currentLoggedInMember}
        drawerWidth={drawerWidth}
      />
      <Toolbar />
      <MessagesList
        allMessages={allMessages}
        messagesEndRef={messagesEndRef}
        loggedInUser={loggedInUser}
      />
      <SendMessageContainer
        currentConversation={currentConversation}
        loggedInUser={loggedInUser}
      />
    </Grid>
  );
};

export default ConversationContainer;
