import { StartConversationModalProps, User } from "@/utils/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import AddUserListItem from "../shared/AddUserListItem";

const StartConversationModal = ({
  openNewChatModal,
  setOpenNewChatModal,
  allUsers,
  selectedUsers,
  setSelectedUsers,
  handleCreateConversation,
}: StartConversationModalProps) => {
  return (
    <Dialog
      open={openNewChatModal}
      onClose={() => setOpenNewChatModal(false)}
      maxWidth="lg"
    >
      <DialogTitle>Select users to start a converstation</DialogTitle>
      <DialogContent>
        <Grid
          container
          flexDirection="column"
          gap={2}
          sx={{ width: { xs: "320px", sm: "600px" } }}
        >
          <TextField
            size="small"
            placeholder="Search users to start conversation"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          />
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            maxHeight="300px"
            sx={{ overflowY: "scroll" }}
          >
            {allUsers?.map((user: User) => (
              <AddUserListItem
                key={user?.id}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                user={user}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: "#615EF0", border: 1, borderColor: "#615EF0" }}
          variant="outlined"
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#615EF0" }}
          onClick={() => {
            handleCreateConversation();
          }}
          disableRipple
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;
