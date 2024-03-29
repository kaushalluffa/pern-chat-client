import {
  Divider,
  Grid,
  IconButton,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiData } from "@/utils/types";
import OutboundIcon from "@mui/icons-material/Outbound";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useMessages from "@/hooks/useMessages";
import ViewAttachedFileModal from "./ViewAttachedFileModal";
import CustomTextField from "../Custom/CustomTextField";

const SendMessageContainer = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const {
    handleSendMessage,
    messageBody,
    setMessageBody,
    ikUploadRef,
    setOpenEmojiPicker,
    uploadImgLoading,
    openEmojiPicker,
    openViewAttachedMediaModal,
    handleDeleteImageKitFile,
    handleCloseViewAttachedFilesModal,
  } = useMessages();

  return (
    <>
      <Divider />
      <Grid
        item
        px={isTablet ? 1 : 5}
        py={1}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <CustomTextField
          value={messageBody?.body}
          placeholder="Send message"
          size="small"
          fullWidth
          multiline
          maxRows={2}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setMessageBody({ body: event?.target?.value });
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (
              event.key === "Enter" &&
              (messageBody?.body?.length > 0 || messageBody?.fileId)
            ) {
              event.stopPropagation();
              handleSendMessage();
            }
          }}
          InputProps={{
            startAdornment: (
              <IconButton
                disabled={uploadImgLoading}
                sx={{ color: theme.palette.success.main }}
                onClick={() => {
                  ikUploadRef &&
                    ikUploadRef?.current &&
                    ikUploadRef?.current?.click();
                }}
              >
                <AttachFileIcon />
              </IconButton>
            ),
            endAdornment: (
              <Grid item display="flex" alignItems="center" gap={1}>
                <IconButton
                  sx={{ color: theme.palette.warning.main }}
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    setOpenEmojiPicker(event?.currentTarget);
                  }}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton
                  disabled={uploadImgLoading}
                  sx={{ color: theme.palette.success.light }}
                  onClick={handleSendMessage}
                >
                  <OutboundIcon />
                </IconButton>
              </Grid>
            ),
          }}
        />

        {Boolean(openEmojiPicker) && (
          <Popover
            anchorEl={openEmojiPicker}
            open={Boolean(openEmojiPicker)}
            onClose={() => setOpenEmojiPicker(null)}
          >
            <EmojiPicker
              data={data}
              onEmojiSelect={(emojiData: EmojiData) => {
                setMessageBody((prev) => ({
                  ...prev,
                  body: `${prev} ${emojiData?.native}`,
                }));
              }}
            />
          </Popover>
        )}
      </Grid>
      {openViewAttachedMediaModal && (
        <ViewAttachedFileModal
          open={openViewAttachedMediaModal}
          onClose={handleCloseViewAttachedFilesModal}
          messageBody={messageBody}
          handleDeleteImageKitFile={handleDeleteImageKitFile}
          handleSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};

export default SendMessageContainer;
