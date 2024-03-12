import { Divider, Drawer, Grid, List } from "@mui/material";
import React from "react";
import { ChatListDrawerProps, Conversation } from "@/utils/types";
import ChatListItem from "../ChatListItem/ChatListItem";
import ChatListHeading from "./ChatListHeading";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeader from "./ChatListHeader";

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
        bgcolor: "#EFEFFD",
        backgroundImage: `radial-gradient(#615EF0 2px, #fff 2px)`,
        backgroundSize: "40px 40px",
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
          backgroundImage: `radial-gradient(#615EF0 2px, #fff 2px)`,
          backgroundSize: "40px 40px",
        }}
        open
      >
        <ChatListHeader />
        <Divider />
        <List>
          <SearchChatListItem />
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
