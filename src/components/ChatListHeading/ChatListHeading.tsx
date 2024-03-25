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
import StartConversationModal from "../StartConversationModal/StartConversationModal";
import useConversation from "@/hooks/useConversation";
import { ConversationType } from "@/utils/types";

const ChatListHeading = () => {
  const theme = useTheme();
  const {
    addChatAnchorEl,
    setAddChatAnchorEl,
    openCreateConversationModal,
    setOpenCreateConversationModal,
    handleSearchUserChange,
    handleCreateConversation,
    allUsers,
    searchUserValue,
    loggedInUser,
    selectedUserForConversation,
    setSelectedUserForConversation,
    groupTitle,
    setGroupTitle,
  } = useConversation();
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
                  type: ConversationType.DIRECT_MESSAGE,
                });
              }}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText>New Chat</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenCreateConversationModal({
                  isOpen: true,
                  type: ConversationType.GROUP,
                });
              }}
            >
              <ListItemIcon>
                <GroupAdd />
              </ListItemIcon>
              <ListItemText>New Group</ListItemText>
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
              type: ConversationType.DIRECT_MESSAGE,
            });
          }}
          type={openCreateConversationModal?.type}
          handleSearchUserChange={handleSearchUserChange}
          handleCreateConversation={handleCreateConversation}
          allUsers={allUsers}
          searchUserValue={searchUserValue}
          loggedInUser={loggedInUser}
          selectedUserForConversation={selectedUserForConversation}
          setSelectedUserForConversation={setSelectedUserForConversation}
          groupTitle={groupTitle}
          setGroupTitle={setGroupTitle}
        />
      )}
    </>
  );
};

export default ChatListHeading;
