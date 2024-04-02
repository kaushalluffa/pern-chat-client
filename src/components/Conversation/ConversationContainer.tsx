import { Grid, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import CustomAppBar from "../Custom/CustomAppBar";
import { ConversationContainerProps } from "@/utils/types";
import MessagesList from "../Message/MessagesList";
import SendMessageContainer from "../Message/SendMessageContainer";

const ConversationContainer = ({ drawerWidth }: ConversationContainerProps) => {
  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <Grid
      sx={{
        ml: isTablet ? 0 : `${drawerWidth}px`,
      }}
      container
      flexDirection="column"
      width="100%"
    >
      <CustomAppBar drawerWidth={drawerWidth} />
      <Toolbar />
      <MessagesList />
      <SendMessageContainer />
    </Grid>
  );
};

export default ConversationContainer;
