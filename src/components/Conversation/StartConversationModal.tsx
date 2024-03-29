import { StartConversationModalProps, User } from "@/utils/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AddUserListItem from "../shared/AddUserListItem";
import NoDataAvailable from "../shared/NoDataAvailable";
import CustomButton from "../Custom/CustomButton";
import CustomTextField from "../Custom/CustomTextField";

const StartConversationModal = ({
  open,
  type,
  onClose,
  handleSearchUserChange,
  handleCreateConversation,
  allUsers,
  searchUserValue,
  loggedInUser,
  selectedUserForConversation,
  setSelectedUserForConversation,
  groupTitle,
  setGroupTitle,
}: StartConversationModalProps) => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const renderUsers = (usersList: User[]) => {
    return usersList?.map((user: User) => (
      <AddUserListItem
        key={user?.id}
        selectedUsers={selectedUserForConversation}
        setSelectedUsers={setSelectedUserForConversation}
        user={user}
        type={type}
      />
    ));
  };
  function handleClose() {
    setSelectedUserForConversation(
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
    setGroupTitle("");
    onClose();
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullScreen={isTablet}
    >
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a conversation
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          flexDirection="column"
          gap={2}
          sx={{ width: isTablet ? "100%" : "600px" }}
        >
          <CustomTextField
            value={searchUserValue}
            size="small"
            placeholder="Search users to start conversation"
            onChange={handleSearchUserChange}
            variant="outlined"
          />
          {type === "GROUP" && (
            <CustomTextField
              label="Group Title"
              required={type === "GROUP"}
              value={groupTitle}
              size="small"
              placeholder="Please enter a group title"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setGroupTitle(event.target.value);
              }}
              variant="outlined"
            />
          )}
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
          disabled={
            type === "GROUP"
              ? !groupTitle ||
                !groupTitle?.trim()?.length ||
                !selectedUserForConversation?.length
              : !selectedUserForConversation?.length
          }
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
