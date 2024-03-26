import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import ViewAttachedMedia from "../shared/ViewAttachedMedia";
import CustomButton from "../Custom/CustomButton";
import { MessageBody } from "@/utils/types";

const ViewAttachedFileModal = ({
  open,
  onClose,
  messageBody,
  handleDeleteImageKitFile,
  handleSendMessage,
}: {
  open: boolean;
  onClose: () => void;
  messageBody: MessageBody;
  handleDeleteImageKitFile: (fileId: string) => void;
  handleSendMessage: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <ViewAttachedMedia src={messageBody?.fileUrl as string} />
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="outlined"
          onClick={() => {
            handleDeleteImageKitFile(messageBody?.fileId as string);
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton variant="contained" onClick={handleSendMessage}>
          Send
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAttachedFileModal;
