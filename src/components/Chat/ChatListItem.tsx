import { useAuthContext } from "@/hooks/useAllContextHooks";
import stringAvatar from "@/utils/stringAvatar";
import { ChatListItemProps, Member } from "@/utils/types";
import {
  Avatar,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({
  conversation,
  currentConversation,
  newMessagesInConversations,
}: ChatListItemProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loggedInUser } = useAuthContext();
  const notCurrentMember = conversation?.members?.find(
    (member: Member) => member?.userId !== loggedInUser?.user?.id
  );
  const conversationTitle =
    conversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.name
      : conversation?.groupTitle;
  const conversationImageUrl =
    conversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.imageUrl
      : "";
  const newMessage =
    currentConversation?.id !== conversation?.id
      ? newMessagesInConversations?.find(
          (msg) => msg?.conversationId === conversation?.id
        )
      : null;

  return (
    <ListItem
      key={conversation?.id}
      disablePadding
      sx={{ bgcolor: theme.palette.divider, mt: 1 }}
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
            src={conversationImageUrl ?? ""}
            {...(conversationTitle && !conversationImageUrl?.trim()?.length
              ? stringAvatar(conversationTitle)
              : {})}
            sx={{ color: theme.palette.text.primary }}
          />
        </ListItemIcon>
        <Grid container flexDirection="column">
          <ListItemText
            primaryTypographyProps={{
              variant: "body1",
              color:
                currentConversation?.id === conversation?.id
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
          >
            {conversationTitle ?? ""}
          </ListItemText>
          {newMessage && (
            <Typography variant="body1" fontWeight="bold">
              {newMessage?.fileUrl ? "Photo" : newMessage?.body}
            </Typography>
          )}
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
