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
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SettingIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { Contrast, Home, Logout } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useAuth from "@/hooks/useAuth";
import { useThemeContext } from "@/contexts/ThemeContextProvider";

const ChatListHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode, handleSetTheme } = useThemeContext();
  const { logout } = useAuth();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(
    null
  );
  return (
    <>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color={theme.palette.text.secondary}>
            Hi, Kaushal
          </Typography>
          <Grid item display="flex" alignItems="center" gap={1}>
            <Link to="/">
              <IconButton
                disableRipple
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                }}
              >
                <Home />
              </IconButton>
            </Link>
            <IconButton
              disableRipple
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
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
            <ListItemButton
              onClick={() => {
                handleSetTheme(mode === "light" ? "dark" : "light");
              }}
            >
              <ListItemIcon>
                {mode === "light" ? <DarkModeIcon /> : <Contrast />}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                Switch to {mode === "light" ? "dark" : "light"} mode
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/settings");
              }}
            >
              <ListItemIcon>
                <SettingIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                Settings
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                logout();
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ color: theme.palette.text.secondary }}
              >
                Logout
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </Popover>
      )}
    </>
  );
};

export default ChatListHeader;
