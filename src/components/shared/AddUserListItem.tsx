import { AddUserListItemProps, User } from "@/utils/types";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddUserListItem = ({
  setSelectedUsers,
  user,
  selectedUsers,
}: AddUserListItemProps) => {
  return (
    <ListItem
      disablePadding
      onClick={() => {
        setSelectedUsers((prev: User[]) => {
          const isUserExist = prev?.find(
            (prevUser: User) => prevUser?.id === user?.id
          );
          if (isUserExist) {
            return prev?.filter((prevUser: User) => user?.id !== prevUser?.id);
          }
          return [...prev, user];
        });
      }}
      sx={{
        color: selectedUsers?.find((u) => u?.id === user?.id)
          ? "#fff"
          : "#615EF0",
        p: 1,
        bgcolor: selectedUsers?.find((u) => u?.id === user?.id)
          ? "#615EF0"
          : "#EFEFFD",
        borderRadius: 4,
      }}
    >
      <ListItemButton
        selected={!!selectedUsers?.find((s) => s?.id === user?.id)}
        sx={{ borderRadius: 4 }}
      >
        <ListItemIcon>
          <Avatar src={user?.imageUrl ?? ""} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "h6" }}>
          {user?.name}
        </ListItemText>
        <ListItemIcon
          sx={{
            color: selectedUsers?.find((u: User) => u?.id === user?.id)
              ? "#fff"
              : "#615EF0",
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
