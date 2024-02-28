import { ChatListItemProps, Member } from "@/utils/types";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({
  conversation,
  loggedInUser,
  currentConversation,
}: ChatListItemProps) => {
  const navigate = useNavigate();
  const conversationTitle =
    conversation?.type === "DIRECT_MESSAGE"
      ? conversation?.members?.find(
          (member: Member) => member?.userId !== loggedInUser?.user?.id
        )?.user?.name
      : conversation?.groupTitle;
  return (
    <ListItem key={conversation?.id} disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(`/chat/${conversation?.id}`, {
            state: conversation,
          });
        }}
        selected={currentConversation?.id === conversation?.id}
        sx={{
          "&.Mui-selected": {
            bgcolor: "#615EF0",
            color: "#fff",
          },
        }}
        disableRipple
        disableTouchRipple
        focusRipple={false}
      >
        <ListItemIcon>
          <Avatar src={""} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "h6" }}>
          {conversationTitle ?? ""}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
