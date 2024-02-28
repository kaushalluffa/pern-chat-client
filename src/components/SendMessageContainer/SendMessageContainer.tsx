import { Grid, IconButton, Popover, TextField } from "@mui/material";
import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { sendMessage } from "@/api/messages";
import { Member, SendMessageContainerProps } from "@/utils/types";
import OutboundIcon from "@mui/icons-material/Outbound";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const SendMessageContainer = ({
  currentConversation,
  loggedInUser,
}: SendMessageContainerProps) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState<HTMLElement | null>(
    null
  );
  const [messageBody, setMessageBody] = useState<string>("");
  return (
    <Grid
      item
      px={5}
      py={1}
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ bgcolor: "#EFEFFD" }}
    >
      <TextField
        value={messageBody}
        placeholder="Send message"
        size="small"
        fullWidth
        multiline
        maxRows={2}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
          },
        }}
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setMessageBody(event?.target?.value);
        }}
        InputProps={{
          startAdornment: (
            <IconButton sx={{ bgcolor: "#EFEFFD", color: "#615EF0" }}>
              <AttachFileIcon />
            </IconButton>
          ),
          endAdornment: (
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  setOpenEmojiPicker(event?.currentTarget);
                }}
              >
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton
                sx={{ bgcolor: "#EFEFFD", color: "#615EF0" }}
                onClick={() => {
                  sendMessage({
                    conversationId: currentConversation?.id,
                    messageBody,
                    senderId: currentConversation?.members?.find(
                      (member: Member) =>
                        member?.userId === loggedInUser?.user?.id
                    )?.id,
                  }).then(() => {
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
  );
};

export default SendMessageContainer;
