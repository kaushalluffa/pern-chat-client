import {
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SettingIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { Home, Logout } from "@mui/icons-material";
import { useAuthContext } from "@/contexts/AuthContext";

const ChatListHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(
    null
  );
  return (
    <>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Hi, Kaushal</Typography>
          <Grid item display="flex" alignItems="center" gap={1}>
            <Link to="/">
              <IconButton
                sx={{
                  color: `#615EF0`,
                  bgcolor: "#EFEFFD",
                }}
              >
                <Home />
              </IconButton>
            </Link>
            <IconButton
              sx={{
                color: `#615EF0`,
                bgcolor: "#EFEFFD",
              }}
              onClick={(e) => setSettingsAnchorEl(e.currentTarget)}
            >
              <SettingIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      {Boolean(settingsAnchorEl) && (
        <Popover
          open={Boolean(settingsAnchorEl)}
          anchorEl={settingsAnchorEl}
          onClose={() => {
            setSettingsAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <SettingIcon />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </Popover>
      )}
    </>
  );
};

export default ChatListHeader;
