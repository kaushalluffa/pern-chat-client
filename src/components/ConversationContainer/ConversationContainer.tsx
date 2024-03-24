import { Grid, Toolbar } from "@mui/material";
import React from "react";
import CustomAppBar from "../CustomAppBar/CustomAppBar";
import { ConversationContainerProps } from "@/utils/types";
import MessagesList from "../MessagesList/MessagesList";
import SendMessageContainer from "../SendMessageContainer/SendMessageContainer";

const ConversationContainer = ({
  allMessages,
  currentLoggedInMember,
  drawerWidth,
  loggedInUser,
  messagesEndRef,
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
      <SendMessageContainer />
    </Grid>
  );
};

export default ConversationContainer;
