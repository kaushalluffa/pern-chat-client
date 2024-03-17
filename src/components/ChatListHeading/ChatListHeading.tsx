import { useModalsContext } from "@/contexts/ModalsContext";
import { Add } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";

const ChatListHeading = () => {
  const theme = useTheme();
  const { setCreateConversationModal } = useModalsContext();
  return (
    <ListItem>
      <ListItemText
        primaryTypographyProps={{
          variant: "h5",
          color: theme.palette.text.secondary,
        }}
      >
        Chats
      </ListItemText>
      <ListItemIcon>
        <IconButton
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
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
