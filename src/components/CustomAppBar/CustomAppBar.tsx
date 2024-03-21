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
import React, { useState } from "react";
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
  const { setCurrentConversation } = useConversationContext()!;
  const [chatMenuAnchorEl, setChatmenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
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
                <Typography
                  color={theme.palette.text.secondary}
                  variant="caption"
                >
                  Online
                </Typography>
              </Grid>
            </Grid>
            <IconButton
              sx={{ color: theme.palette.text.secondary }}
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                setChatmenuAnchorEl(event.currentTarget);
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
            setChatmenuAnchorEl(null);
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
              setChatmenuAnchorEl(null);
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
