import { Add, GroupAdd } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import React from "react";
import StartConversationModal from "../Conversation/StartConversationModal";
import { useConversationContext } from "@/hooks/useAllContextHooks";

const ChatListHeading = () => {
  const theme = useTheme();
  const {
    addChatAnchorEl,
    setAddChatAnchorEl,
    openCreateConversationModal,
    setOpenCreateConversationModal,
  } = useConversationContext()!;
  return (
    <>
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
            onClick={(e) => {
              setAddChatAnchorEl(e.currentTarget);
            }}
          >
            <Add />
          </IconButton>
        </ListItemIcon>
      </ListItem>
      {Boolean(addChatAnchorEl) && (
        <Popover
          open={Boolean(addChatAnchorEl)}
          onClose={() => {
            setAddChatAnchorEl(null);
          }}
          anchorEl={addChatAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenCreateConversationModal({
                  isOpen: true,
                  type: "DIRECT_MESSAGE",
                });
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                New Chat
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenCreateConversationModal({
                  isOpen: true,
                  type: "GROUP",
                });
              }}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                New Group
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Popover>
      )}
      {openCreateConversationModal && (
        <StartConversationModal
          open={openCreateConversationModal?.isOpen}
          onClose={() => {
            setOpenCreateConversationModal({
              isOpen: false,
              type: "DIRECT_MESSAGE",
            });
          }}
          type={openCreateConversationModal?.type}
        />
      )}
    </>
  );
};

export default ChatListHeading;
