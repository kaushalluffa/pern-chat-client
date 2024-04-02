import { AddUserListItemProps, User } from "@/utils/types";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import stringAvatar from "@/utils/stringAvatar";

const AddUserListItem = ({
  setSelectedUsers,
  user,
  selectedUsers,
  type,
}: AddUserListItemProps) => {
  const theme = useTheme();
  const isCurrentUserSelected = selectedUsers?.find((u) => u?.id === user?.id);
  function handleSelectUser() {
    if (type === "DIRECT_MESSAGE") {
      setSelectedUsers([user]);
    }
    if (type === "GROUP") {
      setSelectedUsers((prevUsers) => {
        if (isCurrentUserSelected) {
          return prevUsers?.filter((u) => u?.id !== user?.id);
        }
        return [...prevUsers, user];
      });
    }
  }
  return (
    <ListItem
      disablePadding
      sx={{
        color: "#fff",
        bgcolor: selectedUsers?.find((u) => u?.id === user?.id)
          ? theme.palette.primary.main
          : theme.palette.divider,
        borderRadius: 4,
      }}
    >
      <ListItemButton
        selected={!!selectedUsers?.find((s) => s?.id === user?.id)}
        sx={{ borderRadius: 4 }}
        onClick={handleSelectUser}
      >
        <ListItemIcon>
          <Avatar
            sx={{ color: theme.palette.text.primary }}
            src={user?.imageUrl ?? ""}
            {...(user?.imageUrl ? null : { ...stringAvatar(user?.name) })}
          />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            variant: "h6",
            color: theme.palette.text.secondary,
          }}
        >
          {user?.name}
        </ListItemText>
        <ListItemIcon
          sx={{
            color: selectedUsers?.find((u: User) => u?.id === user?.id)
              ? "#fff"
              : theme.palette.primary.main,
          }}
        >
          {selectedUsers?.find((u: User) => u?.id === user?.id) ? (
            <CheckCircleIcon />
          ) : (
            <AddCircleIcon />
          )}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default AddUserListItem;
