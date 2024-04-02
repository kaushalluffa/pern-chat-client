import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomAppBarProps, Member } from "@/utils/types";
import { ArrowBack, Close, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import stringAvatar from "@/utils/stringAvatar";
import {
  useAuthContext,
  useConversationContext,
} from "@/hooks/useAllContextHooks";

const CustomAppBar = ({ drawerWidth }: CustomAppBarProps) => {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const {
    currentConversation,
    setCurrentConversation,
    numberOfOnlineUsersInCurrentConversation,
    chatMenuAnchorEl,
    setChatMenuAnchorEl,
    handleDeleteConversation,
    handleGoToHome,
  } = useConversationContext()!;
  const { loggedInUser } = useAuthContext();
  const notCurrentMember = currentConversation?.members?.find(
    (member: Member) => member?.userId !== loggedInUser?.user?.id
  );
  const conversationTitle =
    currentConversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.name
      : currentConversation?.groupTitle;
  const conversationImageUrl =
    currentConversation?.type === "DIRECT_MESSAGE"
      ? notCurrentMember?.user?.imageUrl
      : "";
  const showOnlineGroup =
    currentConversation?.isGroup &&
    !!numberOfOnlineUsersInCurrentConversation &&
    numberOfOnlineUsersInCurrentConversation - 1 >= 1
      ? `${numberOfOnlineUsersInCurrentConversation - 1} Online`
      : null;
  const showOnlineChat =
    !currentConversation?.isGroup &&
    !!numberOfOnlineUsersInCurrentConversation &&
    numberOfOnlineUsersInCurrentConversation - 1 === 1
      ? "Online"
      : null;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: isTablet ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: { sm: `${drawerWidth}px` },
        }}
        color="transparent"
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item display="flex" gap={1} alignItems="center">
              {isTablet && (
                <IconButton onClick={handleGoToHome}>
                  <ArrowBack />
                </IconButton>
              )}
              <Avatar
                src={conversationImageUrl ?? ""}
                {...(conversationTitle && !conversationImageUrl?.trim()?.length
                  ? stringAvatar(conversationTitle)
                  : {})}
                sx={{ color: theme.palette.text.primary }}
              />
              <Grid item>
                <Typography color={theme.palette.text.secondary}>
                  {conversationTitle}
                </Typography>
                {(showOnlineChat || showOnlineGroup) && (
                  <Typography
                    color={theme.palette.text.secondary}
                    variant="caption"
                  >
                    {showOnlineGroup
                      ? showOnlineGroup
                      : showOnlineChat
                      ? showOnlineChat
                      : null}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <IconButton
              sx={{ color: theme.palette.text.secondary }}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                setChatMenuAnchorEl(event.currentTarget);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      {Boolean(chatMenuAnchorEl) && (
        <Popover
          open={Boolean(chatMenuAnchorEl)}
          anchorEl={chatMenuAnchorEl}
          onClose={() => {
            setChatMenuAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MenuItem
            onClick={() => {
              setCurrentConversation && setCurrentConversation(null);
              setChatMenuAnchorEl(null);
              navigate("/");
            }}
          >
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
                <Close />
              </IconButton>
              <Typography color={theme.palette.text.secondary}>
                Close
              </Typography>
            </Grid>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setChatMenuAnchorEl(null);
              handleDeleteConversation();
            }}
          >
            <Grid item display="flex" alignItems="center" gap={1}>
              <IconButton>
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

export default CustomAppBar;
