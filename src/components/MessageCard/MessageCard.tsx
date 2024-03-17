import { MessageCardProps } from "@/utils/types";
import { Avatar, Grid, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import stringAvatar from "../../utils/stringAvatar";

const MessageCard = ({
  message,
  loggedInUser,
  passRef,
  messagesEndRef,
}: MessageCardProps) => {
  const theme = useTheme();
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
      <Avatar
        {...(message?.sender?.user?.imageUrl
          ? {}
          : { ...stringAvatar(message?.sender?.user?.name) })}
      />

      <Grid
        item
        display="flex"
        flexDirection="column"
        gap={1}
        p={1}
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: 4,
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
                    <Typography color={theme.palette.text.primary}>
                      {message?.body}
                    </Typography>
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
          <Typography variant="caption" color={theme.palette.text.primary}>
            {new Date().toUTCString()}
          </Typography>
          <DoneAllIcon sx={{ width: 16, height: 16 }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageCard;
