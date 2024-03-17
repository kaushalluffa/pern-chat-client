import { User } from "@/utils/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import AddUserListItem from "../AddUserListItem/AddUserListItem";
import NoDataAvailable from "../NoDataAvailable/NoDataAvailable";
import CustomButton from "../CustomButton/CustomButton";
import useConversation from "@/hooks/useConversation";

const StartConversationModal = () => {
  const theme = useTheme();
  const {
    createConversationModal,
    handleSearchUserChange,
    handleClose,
    handleCreateConversation,
    allUsers,
    searchUserValue,
    selectedUsers,
    setSelectedUsers,
  } = useConversation();
  const renderUsers = (usersList: User[]) => {
    return usersList?.map((user: User) => (
      <AddUserListItem
        key={user?.id}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        user={user}
      />
    ));
  };
  return (
    <Dialog
      open={createConversationModal?.open}
      onClose={handleClose}
      maxWidth="lg"
    >
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a converstation
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          flexDirection="column"
          gap={2}
          sx={{ width: { xs: "320px", sm: "600px" } }}
        >
          <TextField
            value={searchUserValue}
            size="small"
            placeholder="Search users to start conversation"
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "transparent",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                color: theme.palette.text.secondary,
                bgcolor: theme.palette.action.hover,
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            onChange={handleSearchUserChange}
            variant="outlined"
          />
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            maxHeight="300px"
            sx={{ overflowY: "scroll" }}
          >
            {allUsers && Array.isArray(allUsers) && allUsers?.length > 0 ? (
              renderUsers(allUsers)
            ) : (
              <NoDataAvailable message="No users found" />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton
          sx={{
            color: theme.palette.text.secondary,
          }}
          variant="text"
          onClick={handleClose}
        >
          Close
        </CustomButton>
        <CustomButton
          variant="contained"
          sx={{ bgcolor: theme.palette.primary.main }}
          onClick={() => {
            handleCreateConversation();
          }}
          disableRipple
        >
          Create
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;
