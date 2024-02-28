import { ChatListHeadingProps } from "@/utils/types";
import { Add } from "@mui/icons-material";
import { IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const ChatListHeading = ({ setOpenNewChatModal }: ChatListHeadingProps) => {
  return (
    <ListItem>
      <ListItemText primaryTypographyProps={{ variant: "h5" }}>
        Chats
      </ListItemText>
      <ListItemIcon>
        <IconButton
          sx={{
            bgcolor: `#615EF0`,
            color: "#EFEFFD",
          }}
          disableRipple
          onClick={() => {
            setOpenNewChatModal(true);
          }}
        >
          <Add />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default ChatListHeading;
