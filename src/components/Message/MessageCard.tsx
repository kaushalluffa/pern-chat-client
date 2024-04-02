import { MessageCardProps } from "@/utils/types";
import {
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import stringAvatar from "../../utils/stringAvatar";
import { Delete } from "@mui/icons-material";
import { checkIfMessageIsFileUrl } from "@/utils/helpers";
import ViewAttachedMedia from "../shared/ViewAttachedMedia";
import useMessages from "@/hooks/useMessages";
import dayjs from "dayjs";
import { useAuthContext } from "@/hooks/useAllContextHooks";

const MessageCard = ({
  message,
  passRef,
  messagesEndRef,
}: MessageCardProps) => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const { loggedInUser } = useAuthContext();
  const { handleDeleteMessage } = useMessages();
  const [messageCardAnchorEl, setMessageCardAnchorEl] =
    useState<HTMLElement | null>(null);
  const isFileUrl = checkIfMessageIsFileUrl(message?.fileUrl as string);
  const avatarImgUrl = message?.sender?.user?.imageUrl ?? "";
  return (
    <>
      <Grid
        ref={passRef ? messagesEndRef : null}
        key={message?.id}
        p={1}
        item
        display="flex"
        alignItems="center"
        gap={2}
        maxWidth={isTablet ? "90%" : "35%"}
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
        {!isTablet && (
          <Avatar
            src={avatarImgUrl}
            {...(message?.sender?.user?.imageUrl
              ? {}
              : message?.sender?.user?.name
              ? { ...stringAvatar(message?.sender?.user?.name) }
              : {})}
          />
        )}

        <Grid
          item
          display="flex"
          flexDirection="column"
          gap={1}
          p={1}
          sx={{
            bgcolor:
              message?.sender?.userId === loggedInUser?.user?.id
                ? theme.palette.primary.main
                : theme.palette.grey[900],
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
                      {isFileUrl ? (
                        <ViewAttachedMedia src={message?.fileUrl as string} />
                      ) : (
                        <Typography color={theme.palette.text.primary}>
                          {message?.body}
                        </Typography>
                      )}
                    </Grid>
                    {message?.sender?.userId === loggedInUser?.user?.id && (
                      <Grid item alignSelf="flex-start">
                        <IconButton
                          sx={{ color: "#FFF" }}
                          onClick={(
                            event: React.MouseEvent<
                              HTMLButtonElement,
                              MouseEvent
                            >
                          ) => {
                            setMessageCardAnchorEl(event.currentTarget);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    )}
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
              {dayjs(message?.createdAt).format("MMM DD, YYYY h:mm A")}
            </Typography>
            <DoneAllIcon
              sx={{ width: 16, height: 16, color: theme.palette.text.primary }}
            />
          </Grid>
        </Grid>
      </Grid>
      {Boolean(messageCardAnchorEl) && (
        <Popover
          open={Boolean(messageCardAnchorEl)}
          anchorEl={messageCardAnchorEl}
          onClose={() => {
            setMessageCardAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>
            <Grid
              item
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => {
                handleDeleteMessage(message);
              }}
            >
              <IconButton disableRipple>
                <Delete color="error" />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Delete
              </Typography>
            </Grid>
          </MenuItem>
        </Popover>
      )}
    </>
  );
};

export default MessageCard;
