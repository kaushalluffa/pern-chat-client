import { Divider, Drawer, Grid, List } from "@mui/material";
import React from "react";
import { ChatListDrawerProps } from "@/utils/types";
import ChatListHeading from "./ChatListHeading";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeader from "./ChatListHeader";
import ChatListItems from "./ChatListItems";

const ChatListDrawer = ({
  conversations,
  currentConversation,
  loggedInUser,
  drawerWidth,
  newMessagesInConversations,
  handleGoToHome,
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
        <ChatListHeader handleGoToHome={handleGoToHome} />
        <Divider />
        <List>
          <SearchChatListItem />
          <Divider />
          <ChatListHeading />
          <ChatListItems
            conversations={conversations}
            loggedInUser={loggedInUser}
            currentConversation={currentConversation}
            newMessagesInConversations={newMessagesInConversations}
          />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
