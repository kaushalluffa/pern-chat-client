import { MessageCardProps } from "@/utils/types";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const MessageCard = ({
  message,
  loggedInUser,
  passRef,
  messagesEndRef,
}: MessageCardProps) => {
  return (
    <Grid
      ref={passRef ? messagesEndRef : null}
      key={message?.id}
      p={1}
      item
      display="flex"
      alignItems="center"
      gap={2}
      maxWidth="35%"
      alignSelf={
        message?.sender?.userId === loggedInUser?.user?.id
          ? "flex-end"
          : "flex-start"
      }
      flexDirection={
        message?.sender?.userId === loggedInUser?.user?.id
          ? "row-reverse"
          : "row"
      }
    >
      <Avatar />

      <Grid
        item
        display="flex"
        flexDirection="column"
        gap={1}
        p={1}
        sx={{
          bgcolor: "#615EF0",
          borderRadius: 4,
          color: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs zeroMinWidth>
            <Grid container spacing={2}>
              <Grid item zeroMinWidth width="100%">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs zeroMinWidth>
                    <Typography>{message?.body}</Typography>
                  </Grid>
                  <Grid item alignSelf="flex-start">
                    <IconButton sx={{ color: "#FFF" }}>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent={"flex-end"}
          alignItems="center"
          gap={1}
        >
          <Typography variant="caption">{new Date().toUTCString()}</Typography>
          <DoneAllIcon sx={{ width: 16, height: 16 }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageCard;
