import { useModalsContext } from "@/contexts/ModalsContext";
import { Add } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const ChatListHeading = () => {
  const { setCreateConversationModal } = useModalsContext();
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
            setCreateConversationModal({
              open: true,
            });
          }}
        >
          <Add />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default ChatListHeading;
