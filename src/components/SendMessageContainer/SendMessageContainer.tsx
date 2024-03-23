import {
  Divider,
  Grid,
  IconButton,
  Popover,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { sendMessage } from "@/api/messages";
import { Member, SendMessageContainerProps } from "@/utils/types";
import OutboundIcon from "@mui/icons-material/Outbound";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useImageKitContext } from "@/contexts/ImageKitContext";

const SendMessageContainer = ({
  currentConversation,
  loggedInUser,
}: SendMessageContainerProps) => {
  const theme = useTheme();
  const { ikUploadRef, uploadImgLoading, fileUrl, setFileUrl } =
    useImageKitContext();
  const [openEmojiPicker, setOpenEmojiPicker] = useState<HTMLElement | null>(
    null
  );
  const [messageBody, setMessageBody] = useState<string>("");
  useEffect(() => {
    if (fileUrl) {
      setMessageBody(fileUrl);
    }
  }, [fileUrl]);
  return (
    <>
      <Divider />
      <Grid item px={5} py={1} display="flex" alignItems="center" gap={2}>
        <TextField
          value={messageBody}
          placeholder="Send message"
          size="small"
          fullWidth
          multiline
          maxRows={2}
          sx={{
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.divider,
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.text.secondary,
              borderRadius: 4,
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.divider,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.divider,
              },
            },
          }}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setMessageBody(event?.target?.value);
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
                  onClick={() => {
                    sendMessage({
                      conversationId: currentConversation?.id as string,
                      messageBody,
                      senderId: currentConversation?.members?.find(
                        (member: Member) =>
                          member?.userId === loggedInUser?.user?.id
                      )?.id as string,
                    }).then(() => {
                      setFileUrl(null);
                      return setMessageBody("");
                    });
                  }}
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
            <EmojiPicker data={data} onEmojiSelect={console.log} />
          </Popover>
        )}
      </Grid>
    </>
  );
};

export default SendMessageContainer;
