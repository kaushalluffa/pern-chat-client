import { Divider, Drawer, Grid, List, useMediaQuery } from "@mui/material";
import React from "react";
import { ChatListDrawerProps } from "@/utils/types";
import ChatListHeading from "./ChatListHeading";
import SearchChatListItem from "./SearchChatListItem";
import ChatListHeader from "./ChatListHeader";
import ChatListItems from "./ChatListItems";

const ChatListDrawer = ({ drawerWidth }: ChatListDrawerProps) => {
  const isTablet = useMediaQuery("(max-width: 768px)");

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
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isTablet ? "100%" : drawerWidth,
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
          <ChatListItems />
        </List>
      </Drawer>
    </Grid>
  );
};

export default ChatListDrawer;
