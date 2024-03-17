import { Divider, Drawer, Grid, List } from "@mui/material";
import React from "react";
import { ChatListDrawerProps, Conversation } from "@/utils/types";
import ChatListItem from "../ChatListItem/ChatListItem";
import ChatListHeading from "../ChatListHeading/ChatListHeading";
import SearchChatListItem from "../SearchChatListItem/SearchChatListItem";
import ChatListHeader from "../ChatListHeader/ChatListHeader";

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
          {conversations?.map((conversation: Conversation) => {
            return (
              <ChatListItem
                key={conversation?.id}
                conversation={conversation}
                currentConversation={currentConversation}
                loggedInUser={loggedInUser}
              />
            );
          })}
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
