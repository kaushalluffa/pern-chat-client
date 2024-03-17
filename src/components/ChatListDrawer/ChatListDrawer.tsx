import { Divider, Drawer, Grid, List } from "@mui/material";
import React from "react";
import { ChatListDrawerProps } from "@/utils/types";
import ChatListHeading from "../ChatListHeading/ChatListHeading";
import SearchChatListItem from "../SearchChatListItem/SearchChatListItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatListItems from "./ChatListItems";

const ChatListDrawer = ({
  conversations,
  currentConversation,
  loggedInUser,
  drawerWidth,
}: ChatListDrawerProps) => {
  return (
    <Grid
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <ChatListHeader />
        <Divider />
        <List>
          <SearchChatListItem />
          <Divider />
          <ChatListHeading />
          <ChatListItems
            conversations={conversations}
            loggedInUser={loggedInUser}
            currentConversation={currentConversation}
          />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
