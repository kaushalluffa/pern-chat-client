import stringAvatar from "@/utils/stringAvatar";
import { ChatListItemProps, Member } from "@/utils/types";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({
  conversation,
  loggedInUser,
  currentConversation,
}: ChatListItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const conversationTitle =
    conversation?.type === "DIRECT_MESSAGE"
      ? conversation?.members?.find(
          (member: Member) => member?.userId !== loggedInUser?.user?.id
        )?.user?.name
      : conversation?.groupTitle;
  return (
    <ListItem
      key={conversation?.id}
      disablePadding
      sx={{ bgcolor: theme.palette.divider }}
    >
      <ListItemButton
        onClick={() => {
          navigate(`/chat/${conversation?.id}`, {
            state: conversation,
          });
        }}
        selected={currentConversation?.id === conversation?.id}
        sx={{
          "&.Mui-selected": {
            bgcolor: theme.palette.primary.main,
            color: "#fff",
          },
        }}
        disableRipple
        disableTouchRipple
        focusRipple={false}
      >
        <ListItemIcon>
          <Avatar
            src={""}
            {...stringAvatar(conversationTitle as string)}
            sx={{ color: theme.palette.text.primary }}
          />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            variant: "h6",
            color:
              currentConversation?.id === conversation?.id
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
          }}
        >
          {conversationTitle ?? ""}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
