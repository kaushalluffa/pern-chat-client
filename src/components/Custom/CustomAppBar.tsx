import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomAppBarProps } from "@/utils/types";
import { Close, Delete } from "@mui/icons-material";
import { useConversationContext } from "@/contexts/ConversationContext";
import { useNavigate } from "react-router-dom";

const CustomAppBar = ({
  drawerWidth,
  currentLoggedInMember,
}: CustomAppBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    currentConversation,
    setCurrentConversation,
    numberOfOnlineUsersInCurrentConversation,
    chatMenuAnchorEl,
    setChatMenuAnchorEl,
    handleDeleteConversation,
  } = useConversationContext()!;

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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="transparent"
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item display="flex" gap={1} alignItems="center">
              <Avatar sx={{ color: theme.palette.text.primary }} src={""} />
              <Grid item>
                <Typography color={theme.palette.text.secondary}>
                  {currentLoggedInMember?.user?.name}
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
